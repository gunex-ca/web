import json
import requests

def read_guns_jsonl(filepath):
    """
    Reads a guns.jsonl file and returns a list of dicts, one per line/object.
    """
    guns = []
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                guns.append(json.loads(line))
    return guns


guns = read_guns_jsonl("guns.jsonl")

with open("images.json", "r", encoding="utf-8") as f:
    images = json.load(f)

for gun in guns:
    if gun["frn"] in images:
        gun["images"] = images[gun["frn"]]

response = requests.post("http://localhost:3000/api/v1/frt", json=guns)
print("Status code:", response.status_code)
try:
    print("Response:", response.json())
except Exception:
    print("Response text:", response.text)
