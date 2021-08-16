import {getDB} from "../Firebase.js"
import functions from "./functions"
const watch = root=>{
    const rootRef = getDB(root);
    const stateRef = rootRef.child("state");
    const toState = nextState=>stateRef.set(nextState);
    stateRef.on("value",snapshot=>{
        const state = snapshot.val();
        if (state === null) toState(-1);
        else if(state>=0){
            console.log(state);
            return functions[Math.floor(state/10)][state%10](rootRef,state);
        }
    })
};

export default watch;