#!/bin/bash
# Generate a clean kubeconfig for minikube using container-friendly paths
MINIKUBE_IP="172.17.0.2"

cat > /root/.kube/config-minikube <<EOF
apiVersion: v1
clusters:
- cluster:
    certificate-authority: /root/.minikube/ca.crt
    server: https://${MINIKUBE_IP}:8443
  name: minikube
contexts:
- context:
    cluster: minikube
    user: minikube
  name: minikube
current-context: minikube
kind: Config
users:
- name: minikube
  user:
    client-certificate: /root/.minikube/profiles/minikube/client.crt
    client-key: /root/.minikube/profiles/minikube/client.key
EOF

export KUBECONFIG=/root/.kube/config-minikube

exec /usr/local/bin/jenkins.sh "$@"
