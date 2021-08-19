export const getRank = (score)=>{
    const L = [score[0].value,score[1].value,score[2].value,score[3].value,score[4].value];
    L.sort();
    L.reverse();
    const R=Array(5).fill(0);
    for (let i=0;i<5;i++)
        for (let j=0;j<5;j++)
            if(score[j].value===L[i]&&R[j]===0) R[j]=i;
    return R;
};
export const updateRanking = (dataRef)=>{
    dataRef.
};