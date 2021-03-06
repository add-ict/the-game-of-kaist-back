import after_2 from "./afters/after_2";
import after_4 from "./afters/after_4";
import {updateRanking} from "./ranking";
import after_1 from "./afters/after_1";
import after_6 from "./afters/after_6";
import after_7 from "./afters/after_7";

async function get(ref) {
    const retG = await ref.get();
    return retG.val();
}
async function after(rootRef){
    const stateRef = rootRef.child("state");
    const state = await get(stateRef);
    const turnGroup = await get(rootRef.child("turnGroup"));
    const dataRef = rootRef.child("turnGroups").child(turnGroup);
    const data = await get(dataRef);
    const Promises = [];
    if (state.group===4) Promises.push(after_4(dataRef,state,data));
    else  if (state.turn===2&&state.group===3) {
        const flag = [0,0,0];
        for (let i=0;i<5;i++) {
            let result = data["class"][i]?.upstream?.SEASON_SELECT?.result;
            if (!result) result=0;
            flag[result]++;
        }
        for (let i=0;i<5;i++) {
            let result = data["class"][i]?.upstream?.SEASON_SELECT?.result;
            if (!result) result=0;
            Promises.push(dataRef.child("class").child(i).child("downstream/SEASON_USE/")
                .update({count:flag[result]}));
        }
    }
    else
    for (let classID=0;classID<5;classID++) {
        const classRef = dataRef.child("class").child(classID);
        switch (state.group) {
            case 1:
                Promises.push(after_1(classRef,data["class"][classID]));
                break;
            case 2:
                Promises.push(after_2(classRef,data["class"][classID]));
                break;
            case 6:
                Promises.push(after_6(classRef,data["class"][classID]));
                break;
            case 7:
                Promises.push(after_7(classRef,data["class"][classID]));
                break;
        }
    }
    await Promise.all(Promises);
    await updateRanking(dataRef);
    return stateRef.update({state:8});
}

export default after;