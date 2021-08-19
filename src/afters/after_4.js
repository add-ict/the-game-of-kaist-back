async function after_4 (dataRef,state) {
    const data = await get(dataRef);
    const RGH = ["R", "G", "H"];
    const Promises=[];
    if (state.turn===2) {
        const flag = {G:[],R:[],H:[]}
        for (let i=0;i<5;i++)
            if (data["class"][i].upstream.SEASON_SELECT.result === 0)
                flag.G.push(i);
            else if (data["class"][i].upstream.SEASON_SELECT.result === 1)
                flag.R.push(i);
            else if (data["class"][i].upstream.SEASON_SELECT.result === 2)
                flag.H.push(i);
        for (let i=0;i<5;i++)
            for (let j = 0; j < 3; j++)
                if(flag[RGH[j]].contains(i))
                    Promises.push(dataRef.child("class").child(i).child("score").child(RGH[j])
                        .update({value:Math.floor(100/flag[RGH[i]].length)+data["class"][i].score[RGH[i]].value}));
        }
    if (state.turn===11) {
        if (data["class"][i].upstream.SEASON_SELECT.result === 0)
            Promises.push(dataRef.child("class").child(i).child("score").child("B")
                .update({"value":data["class"][i].score.B.value*2}));
        else if (data["class"][i].upstream.SEASON_SELECT.result === 2)



    }
    /*
        dv.R += classData.score.R.value;
        dv.G += classData.score.G.value;
        dv.H += classData.score.H.value;
        dv.B += classData.score.B.value;
        return classData.update({"score/R/value":dv.R,"score/G/value":dv.G,"score/H/value":dv.H,"score/B/value":dv.B});
    */
};

export default after_4;