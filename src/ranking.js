export const getRank = (score)=>{
    const L = [...score];
    L.sort((a,b)=>{return b-a});
    console.log(score,L)
    const R={};
    for (let i=0;i<5;i++)
        for (let j=0;j<5;j++)
            if(score[j]===L[i]&&!R[j]) R[j]=i+1;
    console.log(R)
    return R;
};
async function get(ref) {
    const retG = await ref.get();
    return retG.val();
}
export async function updateRanking (dataRef){
    const Promises=[];
    for (let classID=0;classID<5;classID++) Promises.push(get(dataRef.child("class").child(classID).child("score")));
    const scores = await Promise.all(Promises);
    const RGHB="RGHB";
    const ranking = {}
    for (let i=0;i<4;i++) {
        const L=[];
        for (let classID=0;classID<5;classID++) L.push(scores[classID][RGHB[i]].value);
        //for (let classID=0;classID<5;classID++) scores[classID][RGHB[i]].max = Math.max(...L)+20;
        //for (let classID=0;classID<5;classID++) scores[classID][RGHB[i]].min = Math.min(...L)-20;
        ranking[RGHB[i]] = getRank(L);
        console.log("!!!!!!!!",i,L,getRank(L))
    }
    const Promises2=[];
    console.log("!!!!!!!!",ranking)
    Promises2.push(dataRef.update({ranking}))
    for (let classID=0;classID<5;classID++) Promises2.push(dataRef.child("class").child(classID).child("score").set(scores[classID]));
    return Promise.all(Promises2)
};