import pickle
def updateMapData(data):
    with open("./pickles/func1_mapData.pickle","rb") as f:
        mapData = pickle.load(f)
    with open("./pickles/func1_R.pickle","rb") as f:
        R = pickle.load(f)

    locs=[data['private'][i]['location'] for i in range(5)]
    for classID in range(5):
        location = data['private'][classID]['location']
        candi=[]
        dcandi=[]
        for k in range(len(data['public']["cards"])):
            if not data['private'][classID]["deck"][k]:
                dcandi.append(k)
        for d in dcandi:
            candi+=(R[location][data['public']["cards"][d]])
        ret={}
        for i in candi+locs:
            ret[i]={"location":i}
            ret[i]["who"]=[]
            for j in range(5):
                if locs[j]==i:
                    ret[i]["who"].append(j)
            ret[i]["tooltip"]=mapData[i]["tooltip"]
            ret[i]["affectTo"]=mapData[i]["affectTo"]
            ret[i]["canGo"]=(i in candi)
        data['private'][classID]['mapData']=ret
    return data
def before1(data):
    turn = data['public']['turns']
    if turn % 4==0:
        for i in range(len(data['public']["cards"])):
            for classID in range(5):
                data['private'][classID]["deck"][i]=False
    data=updateMapData(data)
    for classID in range(5):
        data['private'][classID]['nextLocation']=-1
    data['public']['gameState']=15
    return data
import random
def after1(data):
    with open("./pickles/func1_R.pickle","rb") as f:
        R = pickle.load(f)
    for classID in range(5):
        location = data['private'][classID]['location']
        if data['private'][classID]['nextLocation']==-1 or data['private'][classID]['nextLocation']==data['private'][classID]['location']:
            candi = []
            dcandi = []
            for k in range(len(data['public']["cards"])):
                if not data['private'][classID]["deck"][k]:
                    dcandi.append(k)
            for d in dcandi:
                candi += (R[location][data['public']["cards"][d]])
            data['private'][classID]['nextLocation'] = random.choice(candi)

        d=7
        for k in range(len(data['public']["cards"])):
            print(classID,data['private'][classID]['location'],data['private'][classID]['nextLocation'],)
            if data['private'][classID]['nextLocation'] in R[data['private'][classID]['location']][data['public']["cards"][k]]:
                d=k
                break
        print(classID)
        data['private'][classID]["deck"][d]=True
        data['private'][classID]['location'] = data['private'][classID]['nextLocation']
    data=updateMapData(data)
    data['public']['gameState']=20
    return data