#!/bin/bash

echo "🐳 Arrêts Docker Compose..."
sudo docker compose -f docker-compose.dev.yml down

echo "🐳 Suppression des volumes innutilisé..."
sudo docker volume prune -f

echo "🔧 Remise en état des services système..."
sudo systemctl start apache2 2>/dev/null || true
sudo systemctl start redis-server 2>/dev/null || true  
sudo systemctl start mysql 2>/dev/null || true
sudo systemctl start mongod 2>/dev/null || true


echo "✅ Services rétablits !"


