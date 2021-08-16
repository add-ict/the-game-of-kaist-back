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
    if (next.deck.used.filter(x=>x===true).length===4)
        next.deck.used = Array(next.deck.cards.length).fill(false);
    const candi=[];
    for (let i=0;i<next.deck.cards.length;i++)
        if (!next.deck.used[i])
            candi.push(...R[now["map"].location][next.deck.cards[i]]);
    for (let i=0;i<40;i++) next["map"].positions[i].canGo=false;
    for (let i=0;i<candi.length;i++) next["map"].positions[i].canGo=true;
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
