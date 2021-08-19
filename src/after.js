import after_2 from "./afters/after_2";
import after_4 from "./afters/after_4";
import {updateRanking} from "./ranking";

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
    else
    for (let classID=0;classID<5;classID++) {
        const classRef = dataRef.child("class").child(classID);
        switch (state.group) {
            case 1:
                Promises.push(classRef.update({"map/location":data["class"][classID].upstream.MOVEMENT.position}));
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