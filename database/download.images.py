import os
import json
import requests

def download_images(json_file):
    os.makedirs("imgs", exist_ok=True)
    
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    for i, obj in enumerate(data):
        src = obj.get("src")
        if src:
            try:
                response = requests.get("https://phonedb.net/"+src, stream=True,  verify=False)
                response.raise_for_status()
                filename = os.path.join("imgs", f"{src.split("/")[1].split(".")[0]}.jpg")
                
                with open(filename, "wb") as img_file:
                    for chunk in response.iter_content(1024):
                        img_file.write(chunk)
                
                print(f"Imagem salva: {filename}")
            except requests.exceptions.RequestException as e:
                print(f"Erro ao baixar {src}: {e}")

download_images("motorola_phones_processed.json" )
