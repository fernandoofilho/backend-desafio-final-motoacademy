import json

def process_data(input_file, output_file):
    with open(input_file, 'r') as f:
        data = json.load(f)
        
    processed_data = []
    for item in data:  
        model = item.get("Model") if "Model" in item else item.get("Title")
        src = item.get("imageSrc") if "imageSrc" in item else None
        if not model or not src:
            continue
        info = {}
        specs = {}

        for key in ["Released", "Announced", "Hardware Designer", "Manufacturer"]:
            if key in item:
                info[key] = item.pop(key)
        
        for key, value in item.items():
            specs[key] = value
        
        processed_item = {
            "Model": model,
            "src": src,
            "Added": item.get("Added"),
            "info": info,
            "specs": specs
        }
        processed_data.append(processed_item)
    with open(output_file, 'w') as f:
        json.dump(processed_data, f, indent=4)


process_data("motorola_phones_data.json", "motorola_phones_processed.json")
print("Processamento concluído!")
