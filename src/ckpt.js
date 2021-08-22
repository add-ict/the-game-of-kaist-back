import {getDB} from "../Firebase";

const ckpt = rootRef=>{
    const ckptRef = rootRef.child("CKPT");
    const stateRef = rootRef.child("state");
    ckptRef.set(true);
    ckptRef.on("value",snapshot=>{
        if (!snapshot.val()) {
            stateRef.get()
                .then(snapshot=>{
                    const state = snapshot.val();
                    console.log(`CKPT released. ${state.turn}-${state.group}-${state.state}=>${state.state+4}`);
                    ckptRef.off();
                    stateRef.update({state: state.state+4});
                });
        };
    });
};
export default ckpt;