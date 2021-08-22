async function after_7 (classRef,classData) {
    let useData = classData?.upstream?.BONUS_USE;
    if (!useData) useData = {R:classData.score.B.value,G:0,H:0};
    let dv = {"G":0,"R":0,"H":0,"B":0};
    dv.R=classData.score.R.value + useData.R;
    dv.G=classData.score.G.value + useData.G;
    dv.H=classData.score.H.value + useData.H;
    dv.B=0;

    return classRef.update({"score/R/value":dv.R,"score/G/value":dv.G,"score/H/value":dv.H,"score/B/value":dv.B});
};

export default after_7;