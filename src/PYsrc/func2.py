import pickle,copy
import os
def updateRanking(data):
    data['public']['prevRanking'] = copy.deepcopy(data['public']['ranking'])
    nR = {}
    for i in data['public']['ranking']:
        r = []
        for classID in range(5):
            r.append((-data["private"][classID]["score"][i], classID))
        r.sort()
        prev = -987654321
        x = 0
        rr = [0] * 5
        for j in range(5):
            if prev != r[j][0]: x += 1
            rr[r[j][1]] = x
            prev = r[j][0]
        nR[i] = rr
    data['public']['ranking'] = nR
    nM=-987654321
    nm=987654321
    for classID in range(5):
        nM=max(nM,max(data['private'][classID]['score'].values()))
        nm=min(nm,min(data['private'][classID]['score'].values()))
        data['private'][classID]['scoreScale']={'max':nM+20,'min':nm-20}
        print(data['private'][classID]['scoreScale'])
    return data
def getEffect(data,classID):
    ranking = data['public']['ranking']

    location = data['private'][classID]['location']
    effect=0
    if location==38 and ranking["Health"][classID]>=4: effect=1
    if location==17 and ranking["Relation"][classID]>=3: effect=1
    if location==13 and ranking["Grades"][classID]>=4: effect=1
    if location==21 and ranking["Bonus"][classID]>=4: effect=1
    if location==36 and ranking["Health"][classID]>=4: effect=1
    if location==37 and ranking["Grades"][classID]==5: effect=1
    if location==27 and data['private'][classID]['character'] != 4: effect=1
    if location==35 and ranking["Relation"][classID]==4: effect=1
    if location==20:
        cnt2=0
        for i in ranking:
            if ranking[i][classID]<=2: cnt2+=1
        if cnt2>=1:
            effect=1

    return effect
def before2(data):

    with open("./pickles/func2_Events.pickle", "rb") as f:
        Events = pickle.load(f)
    values,descs = Events["values"],Events["descs"]
    with open("./pickles/func1_mapData.pickle","rb") as f:
        mapData = pickle.load(f)

    data['public']['modal'] = ["실패", "성공 1단계", "성공 2단계"]
    for classID in range(5):
        effect = getEffect(data,classID)
        location = data['private'][classID]['location']
        fd=mapData[location]["tooltip"]
        fd= fd.split(">")[-2]
        fd= fd.split("<")[0]
        data['private'][classID]['modalTitle'] = fd+"\n"+descs[data['private'][classID]['location']][effect]
    data['public']['gameState']=25
    return data
import random
def after2(data):
    data['public']['modal'] = ["", "", ""]
    with open("./pickles/func2_Events.pickle", "rb") as f:
        Events = pickle.load(f)
    values,descs = Events["values"],Events["descs"]
    ds = [[0] * 4 for i in range(5)]
    for classID in range(5):
        location = data['private'][classID]['location']
        effect = getEffect(data,classID)
        data['private'][classID]['modalTitle']=""
        result = data['upstream'][classID]['MINIGAME']
        ds[classID] = values[location][effect][result]
        if location==20:
            ds[classID]=[0]*4
            if effect==0:
                ds[classID][random.randrange(0,4)]=50
            else:
                X=[]
                for k in data['private'][classID]['score']:
                    X.append((data['private'][classID]['score'][k],k))
                if max(X)[1][0]=="G":
                    ds[classID][0]=-50
                elif max(X)[1][0]=="R":
                    ds[classID][1] = -50
                elif max(X)[1][0]=="H":
                    ds[classID][2] = -50
                elif max(X)[1][0]=="B":
                    ds[classID][3] = -50

    # FLAG
    for classID in range(5):
        if data["flag"][classID]["flag13"]!=-1:
            for i in range(4):
                ds[classID][i]+=int(0.8*ds[data["flag"][classID]["flag13"]][i])
            data["flag"][classID]["flag31"]=-1
    for classID in range(5):
        if data["flag"][classID]["flag11"]:
            for i in range(4):
                if ds[classID][i]!=0:
                    ds[classID][i]+=30
            data["flag"][classID]["flag11"]=False
    for classID in range(5):
        if data["flag"][classID]["flag12"]:
            ds[classID]=[0]*4
            data["flag"][classID]["flag12"]=False
    for classID in range(5):
        if data["flag"][classID]["flag22"]:
            ds[classID]=[sum(ds[classID]),0,0,0]
            data["flag"][classID]["flag22"]=False
    #Char
    chW = [[0,0,0],[-1,0,1],[2,-1,-1],[-2,2,0],[1,-2,1],[0,1,-1]]
    for classID in range(5):
        x=chW[data['private'][classID]['character']]
        for i in range(3):
            ds[classID][i]=int(ds[classID][i]*(1+x[i]*0.1))

    for classID in range(5):
        data["private"][classID]["score"]["Grades"]+=ds[classID][0]
        data["private"][classID]["score"]["Relation"]+=ds[classID][1]
        data["private"][classID]["score"]["Health"]+=ds[classID][2]
        data["private"][classID]["score"]["Bonus"]+=ds[classID][3]

    if (data['public']['turns']+1)%3==0:
        data['public']['gameState']=30
    else:
        data['public']['gameState']=10
        data['public']['turns']+=1
    #update ranking
    data = updateRanking(data)

    return data