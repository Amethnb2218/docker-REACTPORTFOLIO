variable "aws_region" {
  description = "Region AWS"
  type        = string
  default     = "eu-west-3"
}

variable "project_name" {
  description = "Nom du projet"
  type        = string
  default     = "portfolio"
}

variable "ami_id" {
  description = "AMI Ubuntu 22.04 LTS (eu-west-3)"
  type        = string
  default     = "ami-01b32e912c60acdfa"
}

variable "instance_type" {
  description = "Type d'instance EC2"
  type        = string
  default     = "t2.micro"
}

variable "ssh_public_key" {
  description = "Cle publique SSH pour l'acces EC2"
  type        = string
}

variable "dockerhub_username" {
  description = "Username Docker Hub pour pull les images"
  type        = string
  default     = "amethnb2218"
}
