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