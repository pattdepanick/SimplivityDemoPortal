import requests
url = 'https://simplivity@10.13.20.61/api/'

hms_username = 'administrator@vsphere.local'
hms_password = 'Hpinvent2012!'

response = requests.post(url+'oauth/token', auth=('simplivity', ''), verify=False, data={
  'grant_type':'password',
  'username':hms_username,
  'password':hms_password})
print(response.json())

