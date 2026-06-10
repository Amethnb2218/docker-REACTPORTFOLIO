#!/bin/bash
# Script de deploiement Kubernetes - Portfolio React Express
# Usage: ./deploy.sh [up|down|status]

set -e

NAMESPACE="portfolio"

case "$1" in
  up)
    echo "=== Deploiement du portfolio sur Kubernetes ==="

    # 1. Common (namespace, config, secrets, network)
    echo "[1/5] Application des ressources communes..."
    kubectl apply -f common/

    # 2. Database (MongoDB)
    echo "[2/5] Deploiement de MongoDB..."
    kubectl apply -f database/

    # 3. Backend
    echo "[3/5] Deploiement du Backend..."
    kubectl apply -f backend/

    # 4. Frontend
    echo "[4/5] Deploiement du Frontend..."
    kubectl apply -f frontend/

    # 5. Attente
    echo "[5/5] Attente des pods..."
    kubectl wait --for=condition=ready pod -l app=frontend -n $NAMESPACE --timeout=120s
    kubectl wait --for=condition=ready pod -l app=backend -n $NAMESPACE --timeout=120s

    echo ""
    echo "=== Deploiement termine ==="
    kubectl get all -n $NAMESPACE
    echo ""
    echo "Acces : kubectl port-forward svc/frontend-service 4000:80 -n portfolio"
    echo "Puis ouvrir http://localhost:4000"
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
