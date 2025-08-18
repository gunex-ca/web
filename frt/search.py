import requests

def get_frt_data():
    response = requests.get("http://localhost:3000/api/v1/frt?q=p320")
    if response.status_code == 200:
        try:
            return response.json()
        except Exception:
            print("Failed to parse JSON response")
            return None
    else:
        print(f"Request failed with status code {response.status_code}")
        return None

data = get_frt_data()
print(data["hits"][0])
for hit in data["hits"]:
    doc = hit["document"]
    print(doc["manufacturer"] + " " + doc["model"] + " " + doc["frn"])
