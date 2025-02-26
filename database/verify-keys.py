from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client["moto-academy"]
collection = db["motorola-phones"]



common_keys = None

for document in collection.find():
    keys = set(document.keys())

    if common_keys is None:
        common_keys = keys
    else:
        common_keys &= keys

print(f"Chaves comuns: {common_keys}")
