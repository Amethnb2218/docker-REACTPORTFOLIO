variable "aws_region" {
  description = "Region AWS"
  type        = string
  default     = "eu-west-3"
}

variable "cluster_name" {
  description = "Nom du cluster EKS"
  type        = string
  default     = "portfolio-eks"
}

variable "kubernetes_version" {
  description = "Version Kubernetes pour EKS"
  type        = string
  default     = "1.29"
}

variable "node_instance_type" {
  description = "Type d'instance pour les nodes EKS"
  type        = string
  default     = "t3.medium"
}

variable "node_desired_size" {
  description = "Nombre de nodes souhaite"
  type        = number
  default     = 2
}

variable "node_min_size" {
  description = "Nombre minimum de nodes"
  type        = number
  default     = 1
}

variable "node_max_size" {
  description = "Nombre maximum de nodes"
  type        = number
  default     = 3
}

variable "frontend_replicas" {
  description = "Nombre de replicas frontend"
  type        = number
  default     = 2
}

variable "backend_replicas" {
  description = "Nombre de replicas backend"
  type        = number
  default     = 2
}

variable "dockerhub_username" {
  description = "Username Docker Hub"
  type        = string
  default     = "amethnb2218"
}
