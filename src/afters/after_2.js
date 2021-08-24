import mapData from "../assets/mapData";
import charEffect from "./charEffect";
const cData = {
    0: {R:0,G:0,H:0},
    1: {R:-1,G:0,H:1},
    2: {R:2,G:-1,H:-1},
    3: {R:-2,G:2,H:0},
    4: {R:1,G:-2,H:1},
    5: {R:0,G:1,H:-1},
}
async function after_2 (classRef,classData) {
    let result = classData?.upstream?.MINIGAME?.result;
    if(!result) result=0
    const location = classData.map.location;
    const character = classData.character;
    const ret = mapData[location].value[result];
    let dv = {"G":0,"R":0,"H":0,"B":0};
    console.log(classData.score,ret)
    if (location === 20) {
        const x = "RGHB".charAt(Math.floor(Math.random()*4));
        dv[x]=[30,40,50][result];
    }
    else dv = {...ret};
    const f=charEffect(dv,classData.score,character)
    console.log(dv,classData.score,character,f)
    return classRef.update({"score/R/value":f.R,"score/G/value":f.G,"score/H/value":f.H,"score/B/value":f.B});
};

export default after_2;