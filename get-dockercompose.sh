#!/bin/bash

echo "Reception du fichier docker-compose.yml en cours..."
scp -P 22666 thomasb@85.31.238.192:/home/thomasb/archits-website/docker-compose.yml /var/www/html/archi-ts-website/frontend/
echo "Reception du fichier docker-compose.yml effectué..."


echo "✅ Tous les download ont été effectués !"





