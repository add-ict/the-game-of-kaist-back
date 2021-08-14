def before6(data):
    data['public']['gameState'] = 65
    for classID in range(5):
        select = data['upstream'][classID]["LASTEVENT"]
        data['private'][classID]["lastLASTEVENT"]["askN"] = [6,4,0][select]
        data['private'][classID]["lastLASTEVENT"]["desc"]=["본인 팀의 두 스탯(보너스 제외)을 서로 교환할 수 있다. ", "본인 팀의 한 스탯(보너스 제외)의 숫자 랜덤으로 재배치할 수 있다. (ex 132 -> 231)", "본인 팀의 가장 낮은 스탯(보너스 제외)을 2배로 올릴 수 있다."][select]
    return data
import random
def anagram(n):
    x=list(str(n))
    random.shuffle(x)
    x=''.join(x)
    n=int(x)
    return n
def after6(data):
    data['public']['gameState'] = 70
    for classID in range(5):
        select = data['upstream'][classID]["LASTEVENT"]
        useData = data['upstream'][classID]["LASTEVENT_USE"]
        if select==0:
            data['private'][classID]["score"][useData["RGHB1"]],data['private'][classID]["score"][useData["RGHB2"]]=data['private'][classID]["score"][useData["RGHB2"]],data['private'][classID]["score"][useData["RGHB1"]]
        elif select==1:
            data['private'][classID]["score"][useData["RGHB"]]=anagram(data['private'][classID]["score"][useData["RGHB"]])
        elif select==2:
                RGHBs = ["Grades","Relation","Health"]#,"Bonus"]
                x=[]
                for i in RGHBs:
                    x.append(data['private'][classID]["score"][i])
                for i in RGHBs:
                    if data['private'][classID]["score"][i]==min(x):
                        data['private'][classID]["score"][i]*=2
                        break
    return data