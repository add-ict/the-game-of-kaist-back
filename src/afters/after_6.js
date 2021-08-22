async function after_6 (classRef,classData) {
    let result = classData?.upstream?.LAST_SELECT;
    if (!result) result={result: 2};
    let useData = classData?.upstream?.LAST_USE;
    if (!useData) useData = {RGHB:"R",RGHB1:"R",RGHB2:"G"};
    let dv = {"G":0,"R":0,"H":0,"B":0};
    dv.R=classData.score.R.value
    dv.G=classData.score.G.value
    dv.H=classData.score.H.value
    dv.B=classData.score.B.value
    if (result.result===0) {
        const tmp = dv[useData.RGHB1];
        dv[useData.RGHB1] = dv[useData.RGHB2];
        dv[useData.RGHB2] = tmp;
    }
    if (result.result===1) {
        let val=dv[useData.RGHB];
        let f=false;
        if(val<0) {
            val=-val;
            f=true;
        }
        const L = val.toString().split("");
        for (let i=L.length-1;i>0;i--) {
            const j=Math.floor(Math.random()*(i+1));
            const tmp = L[i];
            L[i]=L[j];
            L[j]=tmp;
        }
        val = parseInt(L.join(""))
        if(f) val=-val;
        dv[useData.RGHB] = val;
    }
    if (result.result===2) {
        const minScore = Math.min(dv.R, dv.G, dv.H)
        if (minScore === dv.R) dv.R *= 2;
        else if (minScore === dv.G) dv.G *= 2;
        else if (minScore === dv.H) dv.H *= 2;
    }
    return classRef.update({"score/R/value":dv.R,"score/G/value":dv.G,"score/H/value":dv.H,"score/B/value":dv.B});
};

export default after_6;