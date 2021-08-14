def before3(data):
    turn = data['public']['turns']
    data['public']['modal']=[
        ["개강<br/>개강 버프","KAMF<br/>I think they're tired.","카포전<br/>협동 정신"],
        ["단풍 구경<br/>누구랑 같이 가지?","종강<br/>주변 사람들이 보여","year-end party<br/>올해는 새 사람으로"],
        ["벚꽃구경<br/>벚꽃 명소를 찾아서", "딸기파티<br/>딸기 나눠 먹기","중간고사<br/>교양분관의 망령",],
        ["축제<br/>같이 즐기는 축제", "학과설명회<br/>이젠 새내기가 아니야","기말고사<br/>도서관 사석화",],
    ][turn//3]
    for classID in range(5):
        data['private'][classID]['modalTitle']=f"시즌이벤트 #{1+turn//3}"
    data['public']['gameState'] = 35
    return data
def after3(data):
    turn = data['public']['turns']
    data['public']['modal']=["","",""]
    for classID in range(5):
        data['private'][classID]['modalTitle']=""

    data['public']['gameState']=40
    return data