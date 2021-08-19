import mapData from "../assets/mapData";

async function after_2 (classRef,classData) {
    const result = classData.upstream.MINIGAME.result;
    const location = classData.map.location;
    const ret = mapData[location].value[result];
    let dv = {"G":0,"R":0,"H":0,"B":0};
    if (location === 20) {
        const x = "RGHB".charAt(Math.floor(Math.random()*4));
        dv[x]=[30,40,50][result];
    }
    else dv = ret[result];
    dv.R += classData.score.R.value;
    dv.G += classData.score.G.value;
    dv.H += classData.score.H.value;
    dv.B += classData.score.B.value;
    return classData.update({"score/R/value":dv.R,"score/G/value":dv.G,"score/H/value":dv.H,"score/B/value":dv.B});
};

export default after_2;