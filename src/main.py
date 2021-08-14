import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import time
import argparse
import os
os.chdir("src")
#####################
from validate import validate
parser = argparse.ArgumentParser(description="Run a proper python function for each gameState.")
parser.add_argument('root', help="The root of firebase realtime database. Default value is /", type=str, nargs='?', default='/')
root = parser.parse_args().root

# Fetch the service account key JSON file contents
cred = credentials.Certificate('../serviceAccountKey.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://husaegi2021-default-rtdb.asia-southeast1.firebasedatabase.app/'
})
os.chdir("PYsrc")
#####################
from PYsrc.func1 import before1,after1
from PYsrc.func2 import before2,after2
from PYsrc.func3 import before3,after3
from PYsrc.func4 import before4,after4
from PYsrc.func5 import before5,after5
from PYsrc.func6 import before6,after6
from PYsrc.func7 import before7,after7
from PYsrc.func8 import before8

DB = db.reference(root)
data = DB.get()

state = data['public']['gameState']
functions = {
    10: before1, 17: after1,
    20: before2, 27: after2,
    30: before3, 37: after3,
    40: before4, 47: after4,
    50: before5, 57: after5,
    60: before6, 67: after6,
    70: before7, 77: after7,
    80: before8
}
print(state)
newData = functions[state](data)
assert validate(newData)
newData["timestamp"]=time.time()
DB.set(newData)
#'''
import json
with open(f"../../log/{time.time()}.json","w") as f:
    json.dump(newData, f)
#'''

'''
#functions[state](data)
try:
    newData = functions[state](data)
    assert validate(newData)
    newData["timestamp"]=time.time()
    DB.set(newData)
except Exception as e:
    print("ERR?",state,e)
'''