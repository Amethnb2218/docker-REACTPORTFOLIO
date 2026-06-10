variable "kubeconfig_path" {
  description = "Chemin vers le fichier kubeconfig"
  type        = string
  default     = "/tmp/kubeconfig"
}

variable "namespace" {
  description = "Namespace Kubernetes pour le portfolio"
  type        = string
  default     = "portfolio"
}

variable "frontend_image" {
  description = "Image Docker du frontend"
  type        = string
  default     = "portfolio-frontend:latest"
}

variable "backend_image" {
  description = "Image Docker du backend"
  type        = string
  default     = "portfolio-backend:latest"
}

variable "frontend_replicas" {
  description = "Nombre de replicas pour le frontend"
  type        = number
  default     = 2
}

variable "backend_replicas" {
  description = "Nombre de replicas pour le backend"
  type        = number
  default     = 2
}
