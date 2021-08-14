def before5(data):
    data['public']['gameState']=55
    data['public']['modal'] = ["Department of Status Trade","Department of Mathe-Magics","Department of Department"]
    for classID in range(5):
        data['private'][classID]['modalTitle']="학과 진입"
    return data
def after5(data):
    data['public']['gameState'] = 60
    data['public']['modal'] = ["","",""]
    for classID in range(5):
        data['private'][classID]['modalTitle'] = ""
    return data