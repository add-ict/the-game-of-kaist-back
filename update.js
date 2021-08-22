import {getDB} from "./Firebase";
import {updateRanking} from "./src/ranking";
async function get(ref) {
    const retG = await ref.get();
    return retG.val();
}
async function updateRank (){
    const rootRef = getDB("/");
    const turnGroup = await get(rootRef.child('turnGroup'));
    let dataRef = rootRef.child('turnGroups').child(turnGroup);
    let data = await get(dataRef);
    while (data.turnGroup!=="init") {
        console.log(turnGroup)
        await updateRanking(dataRef);
        dataRef = rootRef.child('turnGroups').child(dataRef.prev);
        data = await get(dataRef);
    }
}
updateRank()