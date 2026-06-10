output "cluster_name" {
  description = "Nom du cluster EKS"
  value       = aws_eks_cluster.main.name
}

output "cluster_endpoint" {
  description = "Endpoint du cluster EKS"
  value       = aws_eks_cluster.main.endpoint
}

output "cluster_version" {
  description = "Version Kubernetes du cluster"
  value       = aws_eks_cluster.main.version
}

output "vpc_id" {
  description = "ID du VPC EKS"
  value       = aws_vpc.eks.id
}

output "node_group_name" {
  description = "Nom du node group"
  value       = aws_eks_node_group.main.node_group_name
}

output "frontend_load_balancer" {
  description = "URL du LoadBalancer frontend"
  value       = "kubectl get svc frontend-service -n portfolio -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'"
}

output "kubeconfig_command" {
  description = "Commande pour configurer kubectl"
  value       = "aws eks update-kubeconfig --name ${var.cluster_name} --region ${var.aws_region}"
}
