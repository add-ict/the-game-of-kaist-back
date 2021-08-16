import mapData from "../assets/mapData";

async function classfunc(root,state,turn,classID) {
    const classRef = root.child('class').child(classID);
    const turnStateG = await classRef.child("turnState").get();
    const turnState = turnStateG.val();
    const nowG = await classRef.child("turnStates").child(turnState).get();
    const now = nowG.val();
    const nextTurnState = `${turn}-${state}`;
    const nextTurnStateDir = `turnStates/${turn}-${state}`;
    const next = {...now,turnState: nextTurnState,prev: turnState, upstream:null, downstream:null};
    // ***************
    const latest = now?.upstream?.latest;
    let result;
    if (latest) result = now.upstream[latest].value.result;
    else result = 0;
    const data = mapData[now.map.location];
    let value={};
    if (data.conditional) {
        let condition=false;
        switch (now.map.location) {
            case 38:
                condition = now.ranking.H<=3;
                break;
            case 17:
                condition = now.ranking.R<=2;
                break;
            case 13:
                condition = now.ranking.G<=3;
                break;
            case 21:
                condition = now.ranking.B<=3;
                break;
            case 36:
                condition = now.ranking.H<=3;
                break;
            case 20:
                condition||=now.ranking.G<=2;
                condition||=now.ranking.R<=2;
                condition||=now.ranking.H<=2;
                condition||=now.ranking.B<=2;
                condition = !condition;
                break;
            case 37:
                condition = now.ranking.G<=4;
                break;
            case 27:
                condition = now.character===4;
                break;
            case 35:
                condition = now.ranking.R<=4;
                break;
        }
        const x=[condition?1:0];
        value = data.value[x];
    }
    else value = data.value;
    next.score.G={...now.score.G,value};
    next.score.R={...now.score.R,value};
    next.score.H={...now.score.H,value};
    next.score.B={...now.score.B,value};
    // ***************
    return classRef.update({"turnState":nextTurnState,[nextTurnStateDir]: next});
};
async function classfunc2(root,state,turn,classID,ranking,minScale,maxScale) {
    const classRef = root.child('class').child(classID);
    const turnStateG = await classRef.child("turnState").get();
    const turnState = turnStateG.val();
    const nowG = await classRef.child("turnStates").child(turnState).get();
    const now = nowG.val();
    // ***************
    now.score.R.minScale=minScale.R;
    now.score.G.minScale=minScale.G;
    now.score.H.minScale=minScale.H;
    now.score.B.minScale=minScale.B;

    now.score.R.maxScale=maxScale.R;
    now.score.G.maxScale=maxScale.G;
    now.score.H.maxScale=maxScale.H;
    now.score.B.maxScale=maxScale.B;

    now.ranking=ranking;
    // ***************
    await classRef.child("turnStates").child(turnState).set(now);
    return classRef.child("turnStates").child(turnState).child("score").get();
};
async function func(root,state) {
    const turnG = await root.child("turn").get();
    const turn = turnG.val();
    const promises=[];
    for (let classID=0;classID<5;classID++)
        promises.push(classfunc(root,state,turn,classID));
    const ret = await promises;
    const RGHB = "RGHB";
    const ranking = {};
    const minScale = {};
    const maxScale = {};
    for (let i = 0; i < 4; i++) {
        const L=[];
        for (let classID=0;classID<5;classID++)
            L.push(ret[classID][RGHB[i]].value);
        L.sort();
        for (let classID=0;classID<5;classID++)
            for (let j=0;j<5;j++)
                if (L[j]===ret[classID][RGHB[i]].value){
                    ranking[RGHB[i]][classID] = j;
                    break;
                }
        minScale[RGHB[i]] = L[0]-20;
        maxScale[RGHB[i]] = L[4]+20;
    };
    const promises2=[];
    for (let classID=0;classID<5;classID++)
        promises2.push(classfunc2(root,state,turn,classID,ranking,minScale,maxScale));
    const ret2 = await promises2;

    return root.child("state").set(state+1);
};

export default func;

