#!/bin/bash

echo "Envoye du fichier docker-compose.yml en cours..."
scp -P 22666 /var/www/html/archi-ts-website/frontend/docker-compose.yml thomasb@85.31.238.192:/home/thomasb/archits-website
echo "Envoye du fichier docker-compose.yml effectué..."


echo "✅ Tous les envois ont été effectués !"


