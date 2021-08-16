def getGraph():
	L=[[0,1,17,18,16,19,21,20,22,23,24,38,39,13,12,35,32,33,34,29,28,31,4,3,2,0],
		[24,25,15,27,14,6,5,3],
		[29,30,8,7,26,6],
		[39,37,10,9,7],
		[10,11,36,32]]
	ret={i:[] for i in range(40)}
	for l in L:
		for i in range(len(l)-1):
			ret[l[i]].append(l[i+1])
	return ret
Graph=getGraph()
def getReachable(G):
	ret={i:{0:[i]} for i in range(40)}
	for i in range(1,6):
		for j in range(40):
			ret[j][i]=[]	
			for k in ret[j][i-1]:
				ret[j][i]+=G[k]	
			ret[j][i].sort()
	return ret
	
G=getGraph()
R=getReachable(G)
Rjs="const R = {"+\
"\n".join([f"{i}:{R[i]}," for i in range(40)])+\
"""
};
export default R;"""
with open("./R.js","w") as f:
    f.write(Rjs)

