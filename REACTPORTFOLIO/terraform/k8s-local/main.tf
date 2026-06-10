terraform {
  required_version = ">= 1.5.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
}

# Provider - connexion au cluster Kubernetes
provider "kubernetes" {
  config_path = var.kubeconfig_path
}

# --- NAMESPACE ---
resource "kubernetes_namespace" "portfolio" {
  metadata {
    name = var.namespace
    labels = {
      project = "portfolio"
      managed = "terraform"
    }
  }
}

# --- MONGODB ---
resource "kubernetes_stateful_set" "mongo" {
  metadata {
    name      = "mongo"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
  }
  spec {
    service_name = "mongo-service"
    replicas     = 1
    selector {
      match_labels = { app = "mongo" }
    }
    template {
      metadata {
        labels = { app = "mongo" }
      }
      spec {
        container {
          name  = "mongo"
          image = "mongo:4.4"
          port {
            container_port = 27017
          }
          volume_mount {
            name       = "mongo-data"
            mount_path = "/data/db"
          }
        }
      }
    }
    volume_claim_template {
      metadata {
        name = "mongo-data"
      }
      spec {
        access_modes = ["ReadWriteOnce"]
        resources {
          requests = {
            storage = "1Gi"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "mongo" {
  metadata {
    name      = "mongo-service"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
  }
  spec {
    cluster_ip = "None"
    selector   = { app = "mongo" }
    port {
      port        = 27017
      target_port = 27017
    }
  }
}

# --- BACKEND ---
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
    labels    = { app = "backend" }
  }
  spec {
    replicas = var.backend_replicas
    selector {
      match_labels = { app = "backend" }
    }
    template {
      metadata {
        labels = { app = "backend" }
      }
      spec {
        container {
          name              = "backend"
          image             = var.backend_image
          image_pull_policy = "Never"
          port {
            container_port = 5000
          }
          env {
            name  = "PORT"
            value = "5000"
          }
          env {
            name  = "MONGO_URI"
            value = "mongodb://mongo-service.${var.namespace}.svc.cluster.local:27017/portfolio"
          }
          env {
            name  = "USE_MEMORY_DB"
            value = "false"
          }
        }
      }
    }
  }
  depends_on = [kubernetes_stateful_set.mongo]
}

resource "kubernetes_service" "backend" {
  metadata {
    name      = "backend-service"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
  }
  spec {
    selector = { app = "backend" }
    port {
      port        = 5000
      target_port = 5000
    }
    type = "ClusterIP"
  }
}

# --- FRONTEND ---
resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "frontend"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
    labels    = { app = "frontend" }
  }
  spec {
    replicas = var.frontend_replicas
    selector {
      match_labels = { app = "frontend" }
    }
    template {
      metadata {
        labels = { app = "frontend" }
      }
      spec {
        container {
          name              = "frontend"
          image             = var.frontend_image
          image_pull_policy = "Never"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "frontend-service"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
  }
  spec {
    selector = { app = "frontend" }
    port {
      port        = 80
      target_port = 80
    }
    type = "LoadBalancer"
  }
}
