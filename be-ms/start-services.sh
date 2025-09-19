#!/bin/bash

echo "🚀 Starting microservices..."

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

if ! command -v concurrently &> /dev/null; then
    warning "concurrently not found. Installing concurrently..."
    npm install -g concurrently
fi

if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose not found. Please install Docker Compose."
    exit 1
fi

log "Starting databases and infrastructure..."
docker-compose up -d auth-db user-db order-db catalog-db product-db

log "Weiting for databases to start..."
sleep 30

log "Container status:"
docker-compose ps

log "Starting all services..."

concurrently \
  --names "GATEWAY,AUTH,USER,ORDER,CATALOG,PRODUCT" \
  --prefix-colors "blue,cyan,green,yellow,magenta,red" \
  --kill-others-on-fail \
  "cd services/gateway && npm run dev" \
  "cd services/user-service && npm run dev" \
  "cd services/catalog-service && npm run dev" \
  "cd services/product-service && npm run dev"

log "stop services"
docker-compose down