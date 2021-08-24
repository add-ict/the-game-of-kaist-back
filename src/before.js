import newTurnGroup from "./newTurnGroup";
import R from "./assets/R";
import before_3 from "./befores/before_3";
import before_4 from "./befores/before_4";
import before_5 from "./befores/before_5";
import before_6 from "./befores/before_6";
import before_7 from "./befores/before_7";
import before_8 from "./befores/before_8";

async function get(ref) {
    const retG = await ref.get();
    return retG.val();
}
async function before (rootRef) {
    const stateRef = rootRef.child("state");
    const state = await get(stateRef);
    const turnGroup = await get(rootRef.child("turnGroup"));
    const dataRef = rootRef.child("turnGroups").child(turnGroup);
    const data = await get(dataRef);
    if (state.group === 8) return before_8(dataRef,rootRef.child("turnGroups"),data);
    const Promises = [];
    for (let classID=0;classID<5;classID++) {
        const classRef = dataRef.child("class").child(classID);
        switch (state.group) {
            case 1:
                const location = data["class"][classID].map.location;
                const deck = data["class"][classID].deck;
                const cards = deck.cards;
                let used = deck.used;
                if (state.turn%4===0&&state.turn<12) used=Array(cards.length).fill(false)
                let candi = [];
                for (let i = 0; i < deck.cards.length; i++)
                    if (!used[i])
                        candi = candi.concat(R[location][cards[i]]);
                const canGo = {};
                for (let i = 0; i < 40; i++)
                    canGo[i] = candi.includes(i);
                if(state.turn!==12)
                    Promises.push(classRef.update({upstream: null, downstream: null, "map/canGo": canGo,"deck/used":used}));
                else
                    Promises.push(classRef.update({"map/canGo": canGo,"deck/used":used}));
                break;
            case 3:
                Promises.push(before_3(classRef,state));
                break;
            case 4:
                Promises.push(before_4(classRef,state,data["class"][classID].upstream));
                break;
            case 5:
                Promises.push(before_5(classRef));
                break;
            case 6:
                Promises.push(before_6(classRef,data["class"][classID].upstream));
                break;
            case 7:
                Promises.push(before_7(classRef));
                break;
        }
    }
    await Promise.all(Promises);
    return stateRef.update({state:2});
}

export default before;