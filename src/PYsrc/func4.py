import copy
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
    return data
def before4(data):
    data['public']['gameState']=45
    turn = data['public']['turns']
    descs = ["막 개강한 당신! 공부할 의지가 넘칩니다. - 다음 턴에 스탯을 추가로 획득할 수 있다.",
             "KAMF를 너무 즐긴 나머지 지쳐버린 사람들이 보이네요.. 아무래도 휴식이 필요해 보이죠? - 타 팀(한 반)의 다음 턴 스탯 획득/감소 효과를 무효화한다.",
             "카포전에서 제일 중요한 건? 다른 사람들과 함께하는 협동 정신! - 타 팀(한 반)의 다음 턴 획득 스탯의 일부를 본인 팀이 추가로 얻을 수 있다.",
             "나랑 같이 단풍 구경 갈 사람! - '단풍 구경'을 선택한 각 팀은 타 1팀을 지목할 수 있다. 이러한 '선택과 지목으로 이루어진 모든 팀'의 스탯을 합쳐 평균을 내어 '모든 팀'이 나누어 가진다.",
             "종강 전까지는 여유가 없어서 주변 사람들을 만나기 힘들었는데, 종강하고 나니까 여기저기 약속이 잡히고 있네. 신난다! - 다음 턴에 획득하는 모든 스탯을 '인간관계' 스탯으로 변환시켜 획득한다.",
             "1년을 되돌아 보며, 내년에는 새로운 사람이 되기로 결심한 당신. 내년도 화이팅입니다! - 특성을 바꿀 수 있다.",
             "학교에 벚꽃 구경하기 좋은 곳이 참 많은데요~ 친구한테 추천해줘 볼까요? - 타 팀(한 팀)을 다른 칸으로 이동시킬 수 있다. (단, 이동시킬 수 있는 구역은 제한된다.)",
             "딸기에는 아무튼 이런 효능이 있다고 합니다. - 본인 팀 스탯 중 하나를 일부 감소시키는 대신 이에 비례하여 다른 스탯을 증가시킨다.",
             "Study! Study for me! - 타 팀(한 반) '성적' 스탯을 하락시킨다.",
             "축제는 다같이 즐겨야 제 맛! - '축제'를 선택한 팀들끼리 '인간관계' 스탯을 나눠 가진다.",
             "학과 선택의 갈림길에서 학과 설명회는 필수가 아닐까요? - '학과 선택' 이벤트에 대한 힌트를 제공한다.",
             "사석화 절대 금지! - 타 팀(한 반)의 '성적' 스탯을 빼앗거나 하락시킬 수 있다.",]
    for classID in range(5):
        select = data['upstream'][classID]["SEASON_SELECT"]
        data['private'][classID]["lastSEASON_SELECT"]["askN"] = int("011000351002"[3 * (turn // 3) + select])
        data['private'][classID]["lastSEASON_SELECT"]["desc"] = descs[3 * (turn // 3) + select]
    return data
def after4(data):
    turn = data['public']['turns']
    isFlag21=False
    flag21=[False]*5

    isFlag41 = False
    flag41 = [False] * 5


    for classID in range(5):
        select = data['upstream'][classID]["SEASON_SELECT"]
        useData = data['upstream'][classID]["SEASON_USE"]
        print(classID,data['upstream'][classID])
        print(useData)
        x = 3 * (turn // 3) + select
        if x==0:
            data["flag"][classID]["flag11"]=True
        elif x==1:
            data["flag"][useData["classID"]]["flag12"]=True
        elif x==2:
            data["flag"][classID]["flag13"] = useData["classID"]

        elif x==3:
            isFlag21=True
            flag21[classID]=True
        elif x==4:
            data["flag"][classID]["flag22"] = True
        elif x==5:
            pass

        elif x==6:
            print('?',select,useData,'?')
            data["private"][useData["classID"]]["location"] = useData["location"]
        elif x==7:
            if useData["isBigdeal"]:
                # -10 +20
                data["private"][classID]["score"][useData["RGHB1"]]-=10
                data["private"][classID]["score"][useData["RGHB2"]]+=20
            else:
                # -20 +30
                data["private"][classID]["score"][useData["RGHB1"]]-=20
                data["private"][classID]["score"][useData["RGHB2"]]+=30
        elif x==8:
            data["private"][useData["classID"]]["score"]["Grades"]-=40

        elif x==9:
            isFlag41 = True
            flag41[classID] = True
        elif x==10:
            pass
        elif x==11:
            if useData["isSteal"]:
                data["private"][useData["classID"]]["score"]["Grades"]-=40
                data["private"][classID]["score"]["Grades"]+=40
    if isFlag21:
        for classID in range(5):
            if not flag21[classID]:
                data["private"][classID]["score"]["Grades"]-=20
    if isFlag41:
        cnt=0
        for classID in range(5):
            if flag41[classID]:
                cnt+=1
        for classID in range(5):
            if flag41[classID]:
                data["private"][classID]["score"]["Relation"]+=100//cnt
    if data['public']['turns']==11:
        data['public']['gameState']=50
    else:
        data['public']['gameState']=10
    data['public']['turns']+=1
    return updateRanking(data)