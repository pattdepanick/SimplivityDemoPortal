import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
 
url = "https://10.13.20.20/rest/com/vmware/cis/session"

headers = {
    'Authorization': "Basic YWRtaW5pc3RyYXRvckB2c3BoZXJlLmxvY2FsOkhwaW52ZW50MjAxMiE="
    }

response = requests.request("POST", url, headers=headers)

print(response.text)