import {getRank} from "../ranking";

async function before_8 (dataRef,data) {
    const stream = {};
    const ranking = data?.ranking;
    const score = Array(5).fill(0);
    console.log(">?!?!",data)
    for (let classID = 0;classID<5;classID++)
        score[classID] = (6-ranking.R[classID])*20 + (6-ranking.H[classID])*20 + (6-ranking.G[classID])*20;
    stream.allRanking = getRank(score);
    return dataRef.update({'RESULT':stream});
};

export default before_8;