from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client["moto-academy"]
collection = db["motorola-phones"]

count = collection.count_documents({})

print(f"Total de documentos: {count}")
