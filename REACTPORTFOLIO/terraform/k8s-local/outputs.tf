output "namespace" {
  description = "Namespace Kubernetes du portfolio"
  value       = kubernetes_namespace.portfolio.metadata[0].name
}

output "frontend_service" {
  description = "Nom du service frontend"
  value       = kubernetes_service.frontend.metadata[0].name
}

output "backend_service" {
  description = "Nom du service backend"
  value       = kubernetes_service.backend.metadata[0].name
}

output "frontend_replicas" {
  description = "Nombre de replicas frontend deployees"
  value       = kubernetes_deployment.frontend.spec[0].replicas
}

output "backend_replicas" {
  description = "Nombre de replicas backend deployees"
  value       = kubernetes_deployment.backend.spec[0].replicas
}
