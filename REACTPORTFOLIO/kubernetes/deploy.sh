#!/bin/bash
# Script de deploiement Kubernetes - Portfolio React Express
# Usage: ./deploy.sh [up|down|status]

set -e

NAMESPACE="portfolio"

case "$1" in
  up)
    echo "=== Deploiement du portfolio sur Kubernetes ==="

    # 1. Creer le namespace
    echo "[1/7] Creation du namespace..."
    kubectl apply -f namespace.yaml

    # 2. Configmap et secrets
    echo "[2/7] Application des ConfigMaps et Secrets..."
    kubectl apply -f configmap.yaml
    kubectl apply -f secret.yaml

    # 3. Volumes et MongoDB (StatefulSet)
    echo "[3/7] Deploiement de MongoDB (StatefulSet)..."
    kubectl apply -f mongo-pv.yaml
    kubectl apply -f mongo-statefulset.yaml

    # 4. Backend
    echo "[4/7] Deploiement du Backend..."
    kubectl apply -f backend-deployment.yaml

    # 5. Frontend
    echo "[5/7] Deploiement du Frontend..."
    kubectl apply -f frontend-deployment.yaml

    # 6. Ingress
    echo "[6/7] Configuration de l'Ingress..."
    kubectl apply -f ingress.yaml

    # 7. HPA et Network Policies
    echo "[7/7] Application du HPA et des Network Policies..."
    kubectl apply -f hpa.yaml
    kubectl apply -f networkpolicy.yaml

    echo ""
    echo "=== Deploiement termine ==="
    echo "Attente des pods..."
    kubectl wait --for=condition=ready pod -l app=frontend -n $NAMESPACE --timeout=120s
    kubectl wait --for=condition=ready pod -l app=backend -n $NAMESPACE --timeout=120s
    echo ""
    kubectl get all -n $NAMESPACE
    echo ""
    echo "Ajoutez '127.0.0.1 portfolio.local' dans /etc/hosts"
    echo "Puis accedez a http://portfolio.local"
    ;;

  down)
    echo "=== Suppression du deploiement ==="
    kubectl delete namespace $NAMESPACE --ignore-not-found
    kubectl delete pv mongo-pv --ignore-not-found
    echo "Deploiement supprime."
    ;;

  status)
    echo "=== Statut du cluster ==="
    echo ""
    echo "--- Pods ---"
    kubectl get pods -n $NAMESPACE -o wide
    echo ""
    echo "--- Services ---"
    kubectl get svc -n $NAMESPACE
    echo ""
    echo "--- Deployments ---"
    kubectl get deployments -n $NAMESPACE
    echo ""
    echo "--- StatefulSets ---"
    kubectl get statefulsets -n $NAMESPACE
    echo ""
    echo "--- Ingress ---"
    kubectl get ingress -n $NAMESPACE
    echo ""
    echo "--- HPA ---"
    kubectl get hpa -n $NAMESPACE
    ;;

  *)
    echo "Usage: $0 {up|down|status}"
    exit 1
    ;;
esac
