import {getEffect} from "./charEffect";

async function get(ref) {
    const retG = await ref.get();
    return retG.val();
}
async function after_4 (dataRef,state) {
    const data = await get(dataRef);
    const RGH = ["R", "G", "H"];
    const Promises=[];
    if (state.turn===2) {
        const flag = {G:[],R:[],H:[]}
        for (let i=0;i<5;i++) {
            let result = data["class"][i]?.upstream?.SEASON_SELECT?.result;
            if (!result) result=0;
            if (result === 0)
                flag.G.push(i);
            else if (result === 1)
                flag.R.push(i);
            else if (result === 2)
                flag.H.push(i);
        }
        for (let i=0;i<5;i++)
            for (let j = 0; j < 3; j++)
                if(flag[RGH[j]].includes(i))
                    Promises.push(dataRef.child("class").child(i).child("score").child(RGH[j])
                        .update({value:Math.floor(100/flag[RGH[j]].length)+data["class"][i].score[RGH[j]].value}));
        }
    else for (let i=0;i<5;i++) {
        let result = data["class"][i]?.upstream?.SEASON_SELECT?.result;
        let useData = data["class"][i]?.upstream?.SEASON_USE;
        const character = data["class"][i]?.character;
        if (!result) result=0;
        if (!useData) useData = {classID:(i+1)%5,x:0}
        let select=-1;
        if (state.turn===11) {
            if (result===0)
                Promises.push(dataRef.child("class").child(i).child("score").child('B')
                .update({value:data["class"][i].score['B'].value*2}));
            if (result===2)
                if (useData.x==0) select=3;
                if (useData.x==1) select=4;
                if (useData.x==2) select=2;
        }
        if (state.turn===5) select = 3+result;
        if (state.turn===8) select = result;
        switch (select) {
            case 0:
                Promises.push(dataRef.child("class").child(useData.classID).child("score").child('G')
                    .update({value:data["class"][useData.classID].score['G'].value+getEffect(-40,"G",character)}));
                break;
            case 1:
                Promises.push(dataRef.child("class").child(useData.classID).child("score").child('R')
                    .update({value:data["class"][useData.classID].score['R'].value+getEffect(-40,"R",character)}));
                break;
            case 2:
                Promises.push(dataRef.child("class").child(useData.classID).child("score").child('H')
                    .update({value:data["class"][useData.classID].score['H'].value+getEffect(-40,"H",character)}));
                break;
            case 3:
                Promises.push(dataRef.child("class").child(i).child("score").child('G')
                    .update({value:data["class"][i].score['G'].value+getEffect(40,"G",character)}));
                Promises.push(dataRef.child("class").child(useData.classID).child("score").child('G')
                    .update({value:data["class"][useData.classID].score['G'].value+getEffect(-40,"G",character)}));
                break;
            case 4:
                Promises.push(dataRef.child("class").child(i).child("score").child('R')
                    .update({value:data["class"][i].score['R'].value+getEffect(40,"R",character)}));
                Promises.push(dataRef.child("class").child(useData.classID).child("score").child('R')
                    .update({value:data["class"][useData.classID].score['R'].value+getEffect(-40,"R",character)}));
                break;
            case 5:
                Promises.push(dataRef.child("class").child(i).child("score").child('H')
                    .update({value:data["class"][i].score['H'].value+getEffect(40,"H",character)}));
                Promises.push(dataRef.child("class").child(useData.classID).child("score").child('H')
                    .update({value:data["class"][useData.classID].score['H'].value+getEffect(-40,"H",character)}));
                break;
            default:
        }
    }
    return Promise.all(Promises);
};

export default after_4;