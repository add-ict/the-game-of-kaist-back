import {getEffect} from "./charEffect";
import broadcast from "../broadcast";

async function get(ref) {
    const retG = await ref.get();
    return retG.val();
}
async function after_4 (dataRef,state) {
    const data = await get(dataRef);
    const RGH = ["R", "G", "H"];
    const Promises=[];
    const Pscore=[];
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
                    Pscore.push({classID:i,RGHB:RGH[j],dv:getEffect(Math.floor(100/flag[RGH[j]].length),RGH[j],data["class"][i]?.character)})
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
            else if (result===2) {
                if (useData.x == 0) select = 3;
                if (useData.x == 1) select = 4;
                if (useData.x == 2) select = 2;
            }
        }
        else {
            if (state.turn === 5) select = 3 + result;
            if (state.turn === 8) select = result;
        }
        if(select!==-1)
        switch (select) {
            case 0:
                Pscore.push({classID:useData.classID,RGHB:'G',dv:getEffect(-40,"G",data["class"][useData.classID]?.character)})
                Promises.push(broadcast(dataRef.child("class").child(useData.classID),"Air-raid!",`${data["class"][i]?.name} attacked your Grades`));
                break;
            case 1:
                Pscore.push({classID:useData.classID,RGHB:'R',dv:getEffect(-40,"R",data["class"][useData.classID]?.character)})
                Promises.push(broadcast(dataRef.child("class").child(useData.classID),"Air-raid!",`${data["class"][i]?.name} attacked your Relationship`));
                break;
            case 2:
                Pscore.push({classID:useData.classID,RGHB:'H',dv:getEffect(-40,"H",data["class"][useData.classID]?.character)})
                Promises.push(broadcast(dataRef.child("class").child(useData.classID),"Air-raid!",`${data["class"][i]?.name} attacked your Health`));
                break;
            case 3:
                Pscore.push({classID:i,RGHB:'G',dv:getEffect(40,"G",character)})
                Pscore.push({classID:useData.classID,RGHB:'G',dv:getEffect(-40,"G",data["class"][useData.classID]?.character)})
                Promises.push(broadcast(dataRef.child("class").child(useData.classID),"Air-raid!",`${data["class"][i]?.name} attacked your Grades`));
                break;
            case 4:
                Pscore.push({classID:i,RGHB:'R',dv:getEffect(40,"R",character)})
                Pscore.push({classID:useData.classID,RGHB:'R',dv:getEffect(-40,"R",data["class"][useData.classID]?.character)})
                Promises.push(broadcast(dataRef.child("class").child(useData.classID),"Air-raid!",`${data["class"][i]?.name} attacked your Relationship`));
                break;
            case 5:
                Pscore.push({classID:i,RGHB:'H',dv:getEffect(40,"G",character)})
                Pscore.push({classID:useData.classID,RGHB:'H',dv:getEffect(-40,"G",data["class"][useData.classID]?.character)})
                Promises.push(broadcast(dataRef.child("class").child(useData.classID),"Air-raid!",`${data["class"][i]?.name} attacked your Health`));
                break;
            default:
        }
    }
    const DV=[{R:0,G:0,H:0,B:0},{R:0,G:0,H:0,B:0},{R:0,G:0,H:0,B:0},{R:0,G:0,H:0,B:0},{R:0,G:0,H:0,B:0}];
    const RGHB="RGHB";
    for (let i=0;i<Pscore.length;i++) DV[Pscore[i].classID][Pscore[i].RGHB]+=Pscore[i].dv
    for (let classID=0;classID<5;classID++)
        for (let i=0;i<4;i++)
            if(DV[classID][RGHB[i]])
                Promises.push(dataRef.child("class").child(classID).child("score").child(RGHB[i])
                    .update({value:data["class"][classID].score[RGHB[i]].value+DV[classID][RGHB[i]]}));
    return Promise.all(Promises);
};

export default after_4;