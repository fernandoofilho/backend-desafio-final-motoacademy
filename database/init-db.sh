#!/bin/bash

# Iniciar o MongoDB
mongod --fork --logpath /var/log/mongodb.log --bind_ip_all

# Esperar alguns segundos para garantir que o MongoDB inicie
sleep 5

# Criar a base e a coleção
mongo moto-academy --eval 'db.createCollection("motorola-phones")'

# Verificar se a coleção está vazia
EMPTY=$(mongo moto-academy --quiet --eval 'db["motorola-phones"].count()')

if [ "$EMPTY" -eq 0 ]; then
  # Importar o arquivo JSON se a coleção estiver vazia
  mongoimport --db moto-academy --collection motorola-phones --file /docker-entrypoint-initdb.d/motorola_phones_processed.json --jsonArray
else
  echo "A coleção já contém dados. Nenhuma importação necessária."
fi

# Continuar com a execução do MongoDB
mongod --bind_ip_all

# Esperar indefinidamente para manter o container ativo
sleep 5
tail -f /dev/null
