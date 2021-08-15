import openpyxl
from Event import Event
excel_document = openpyxl.load_workbook('0811.xlsx')
sheet = excel_document['비시즌-비조건']

f=lambda x,y:sheet.cell(row = x, column = y).value
ret=[]
for i in range(3,34):
	x=Event()
	x.idx=int(f(i,1))	
	x.name=f(i,2)	
	if not x.name: x.name=''
	x.cause=f(i,3)	
	x.desc=[f(i,4),'']
	if not x.desc[0]: x.desc[0]=''
	L=[]
	for j in range(5,9):
		v=f(i,j)
		if v: L.append(int(v))
		else: L.append(0)
	x.value[0].append(L)
	L=[]
	for j in range(9,13):
		v=f(i,j)
		if v: L.append(int(v))
		else: L.append(0)
	x.value[0].append(L)
	L=[]
	for j in range(13,17):
		v=f(i,j)
		if v: L.append(int(v))
		else: L.append(0)
	x.value[0].append(L)
	ret.append(x)

sheet = excel_document['비시즌-조건']
for i in range(3,21,2):
	x=Event()
	x.idx=int(f(i,1))	

	x.cause=f(i,2)	
	x.desc[0]=f(i,4)
	L=[]
	for j in range(6,10):
		v=f(i,j)
		if v: L.append(int(v))
		else: L.append(0)
	x.value[0].append(L)
	L=[]
	for j in range(10,14):
		v=f(i,j)
		if v: L.append(int(v))
		else: L.append(0)
	x.value[0].append(L)
	L=[]
	for j in range(14,18):
		v=f(i,j)
		if v: L.append(int(v))
		else: L.append(0)
	x.value[0].append(L)

	x.desc[1]=f(i+1,4)
	L=[]
	for j in range(6,10):
		v=f(i+1,j)
		if v: L.append(int(v))
		else: L.append(0)
	x.value[1].append(L)
	L=[]
	for j in range(10,14):
		v=f(i+1,j)
		if v: L.append(int(v))
		else: L.append(0)
	x.value[1].append(L)
	L=[]
	for j in range(14,18):
		v=f(i+1,j)
		if v: L.append(int(v))
		else: L.append(0)
	x.value[1].append(L)

	ret.append(x)
ret.sort(key=lambda x:x.idx)
mapData={}
for i in range(40):
	mapData[i]={}
	mapData[i]["tooltip"]=ret[i].getHTML()
	x=ret[i].value[0][0]
	mapData[i]["affectTo"]={"Relation": x[0]!=0, "Grades": x[1]!=0, "Health": x[2]!=0, "Bonus": x[3]!=0}
print(mapData[20])
import pickle
#with open("../src/PYsrc/pickles/func1_mapData.pickle", "wb") as f:
with open("./func1_mapData.pickle", "wb") as f:
	pickle.dump(mapData,f)
Events={
'values': [ret[i].value for i in range(40)],
'descs': [ret[i].desc for i in range(40)],
}
for i in range(40):
	print(len(Events['values'][i]))
	print(len(Events['descs'][i]))
#with open("../src/PYsrc/pickles/func2_Events.pickle", "wb") as f:
with open("./func2_Events.pickle", "wb") as f:
	pickle.dump(Events,f)
