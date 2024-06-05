import requests

url = "https://api.pricempire.com/v3/inventory/76561199182268681?sources=buff&sources=waxpeer&sources=csgoempire&currency=USD&appId=730"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
