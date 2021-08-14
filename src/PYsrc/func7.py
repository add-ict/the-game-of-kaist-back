def before7(data):
    data['public']['gameState'] = 75
    return data
def after7(data):
    print("after7")
    for classID in range(5):
        useData=data['upstream'][classID]['USE_BONUS']
        print(classID,useData)
        data["private"][classID]["score"]["Relation"]+=int(data['upstream'][classID]['USE_BONUS']["Relation"])
        data["private"][classID]["score"]["Grades"]+=int(data['upstream'][classID]['USE_BONUS']["Grades"])
        data["private"][classID]["score"]["Health"]+=int(data['upstream'][classID]['USE_BONUS']["Health"])
        data["private"][classID]["score"]["Bonus"]=0
    data['public']['gameState'] = 80
    return data