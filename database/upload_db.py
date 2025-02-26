import pymongo
import json
from pymongo import MongoClient, InsertOne
import os

uri = "mongodb+srv://developer:MotoAcademy2025@moto-device.gbmza.mongodb.net/?retryWrites=true&w=majority&appName=moto-device"
client = MongoClient(uri, server_api=pymongo.server_api.ServerApi("1"))

db = client["moto-device"]
collection = db["motodevice-data"]

requesting = []

filename = "motorola_phones_processed.json"

# Verificar se o arquivo existe
if os.path.exists(filename):
    print(f"Arquivo encontrado: {filename}")
    with open(filename) as f:
        try:
            # Carregar todos os objetos JSON de uma vez, já que é uma lista
            data = json.load(f)
            
            # Verificar se a estrutura de dados é uma lista
            if isinstance(data, list):
                for myDict in data:
                    requesting.append(InsertOne(myDict))
            else:
                print("O arquivo JSON não contém uma lista de objetos.")
        except json.JSONDecodeError as e:
            print(f"Erro ao processar o arquivo JSON: {e}")
else:
    print(f"Arquivo não encontrado: {filename}")

# Se o arquivo foi encontrado e os dados inseridos, execute o bulk_write
if requesting:
    result = collection.bulk_write(requesting)
    print(f"{result.inserted_count} documentos inseridos com sucesso!")

# Fechar a conexão
client.close()
import pymongo
import json
from pymongo import MongoClient, InsertOne
import os

uri = "mongodb+srv://developer:MotoAcademy2025@moto-device.gbmza.mongodb.net/?retryWrites=true&w=majority&appName=moto-device"
client = MongoClient(uri, server_api=pymongo.server_api.ServerApi("1"))

db = client["moto-device"]
collection = db["motodevice-data"]

requesting = []

filename = "motorola_phones_processed.json"

# Verificar se o arquivo existe
if os.path.exists(filename):
    print(f"Arquivo encontrado: {filename}")
    with open(filename) as f:
        try:
            # Carregar todos os objetos JSON de uma vez, já que é uma lista
            data = json.load(f)
            
            # Verificar se a estrutura de dados é uma lista
            if isinstance(data, list):
                for myDict in data:
                    requesting.append(InsertOne(myDict))
            else:
                print("O arquivo JSON não contém uma lista de objetos.")
        except json.JSONDecodeError as e:
            print(f"Erro ao processar o arquivo JSON: {e}")
else:
    print(f"Arquivo não encontrado: {filename}")

# Se o arquivo foi encontrado e os dados inseridos, execute o bulk_write
if requesting:
    result = collection.bulk_write(requesting)
    print(f"{result.inserted_count} documentos inseridos com sucesso!")

# Fechar a conexão
client.close()
import pymongo
import json
from pymongo import MongoClient, InsertOne
import os

uri = "mongodb+srv://developer:MotoAcademy2025@moto-device.gbmza.mongodb.net/?retryWrites=true&w=majority&appName=moto-device"
client = MongoClient(uri, server_api=pymongo.server_api.ServerApi("1"))

db = client["moto-device"]
collection = db["motodevice-data"]

requesting = []

filename = "motorola_phones_processed.json"

# Verificar se o arquivo existe
if os.path.exists(filename):
    print(f"Arquivo encontrado: {filename}")
    with open(filename) as f:
        try:
            # Carregar todos os objetos JSON de uma vez, já que é uma lista
            data = json.load(f)
            
            # Verificar se a estrutura de dados é uma lista
            if isinstance(data, list):
                for myDict in data:
                    requesting.append(InsertOne(myDict))
            else:
                print("O arquivo JSON não contém uma lista de objetos.")
        except json.JSONDecodeError as e:
            print(f"Erro ao processar o arquivo JSON: {e}")
else:
    print(f"Arquivo não encontrado: {filename}")

# Se o arquivo foi encontrado e os dados inseridos, execute o bulk_write
if requesting:
    result = collection.bulk_write(requesting)
    print(f"{result.inserted_count} documentos inseridos com sucesso!")

# Fechar a conexão
client.close()
