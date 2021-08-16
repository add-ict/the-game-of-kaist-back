import R from "../assets/R";

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
    let position;
    if (latest) {
        position = now.upstream[latest].value.position;
    }
    else {
        const candi=[];
        for (let i=0;i<now.deck.cards.length;i++)
            if (!now.deck.used[i])
                candi.push(...R[now["map"].location][now.deck.cards[i]]);
        position = candi[Math.floor(candi.length*Math.random())]
    }
    next.deck.used=[...now.deck.used];
    const candi=[];
    for (let i=0;i<now.deck.cards.length;i++)
        if (!now.deck.used[i])
            if(R[now["map"].location][now.deck.cards[i]].includes(position))
                next.deck.used[i] = true;
    next["map"].location = position;
    // ***************
    return classRef.update({"turnState":nextTurnState,[nextTurnStateDir]: next});
};
async function func(root,state) {
    const turnG = await root.child("turn").get();
    const turn = turnG.val();
    const promises=[];
    for (let classID=0;classID<5;classID++)
        promises.push(classfunc(root,state,turn,classID));
    const ret = await promises;
    return root.child("state").set(state+1);
};

export default func;