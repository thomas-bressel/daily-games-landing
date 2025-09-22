#!/bin/bash

echo "Envoi du fichier .env en cours..."
scp -P 22666 /var/www/html/archi-ts-website/frontend/.env thomasb@85.31.238.192:/home/thomasb/archits-website
echo "Envoi du fichier .env effectué..."


echo "✅ Tous les envois ont été effectués !"