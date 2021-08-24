import {getRank} from "../ranking";
async function get(ref) {
    const retG = await ref.get();
    return retG.val();
}
async function before_8 (dataRef,turnGroupsRef,data) {
    const stream = {};
    const ranking = data?.ranking;
    const score1 = Array(5).fill(0);
    const score2 = Array(5).fill(0);
    const score3 = Array(5).fill(0);
    const score = Array(5).fill(0);
    for (let classID = 0;classID<5;classID++) score1[classID] = (6-ranking.R[classID])*20 + (6-ranking.H[classID])*20 + (6-ranking.G[classID])*20;
    for (let classID = 0;classID<5;classID++) score2[classID] = data["class"][classID].score.R.value + data["class"][classID].score.G.value +data["class"][classID].score.H.value
    for (let classID = 0;classID<5;classID++) {
        for (let turn=0;turn<12;turn++) {
            let result = await get(turnGroupsRef.child(`${(100 + turn + "").slice(1, 3)}-2`).child("class").child(classID).child('upstream/MINIGAME'))
            if (result) score3[classID] += result.result;
        }
    }
    for (let classID = 0;classID<5;classID++) score[classID]=score1[classID]*100*10000+score2[classID]*100+score3[classID];
    console.log(score)
    stream.allRanking = getRank(score);
    return dataRef.update({'RESULT':stream});
};

export default before_8;