import initState, {VERSION} from "./assets/DB";
import ckpt from "./ckpt";
import newTurnGroup from "./newTurnGroup";
import announce from "./announce";
import timer from "./timer";
import before from "./before";
import after from "./after";
const watch = rootRef=>{
    const stateRef = rootRef.child("state");
    const versionRef = rootRef.child("VERSION");
    versionRef.get()
        .then(snapshot=>{
            if (VERSION !== snapshot.val())
                rootRef.set(initState);
        });
    stateRef.on("value",snapshot=>{
        const state = snapshot.val();
        console.log(`Observed. ${state.turn}-${state.group}-${state.state}`);
        if(state.group===0) rootRef.set(initState);
        else
        switch (state.state) {
            case 0:
                newTurnGroup(rootRef);
                break;
            case 1:
                if (state.turn===11&&state.group===8) {
                    stateRef.update({turn:12}).then(()=>{
                        newTurnGroup(rootRef);
                    })
                }
                else before(rootRef);
                break;
            case 2:
                timer(rootRef,state,3);
                //stateRef.update({state:3});
                break;
            case 3:
                ckpt(rootRef);
                //stateRef.update({state:7});
                break;
            case 7:
                after(rootRef);
                break;
            case 8:
                announce(rootRef);
                break;
            case 9:
                switch (state.group) {
                    case 1:case 3:case 5:case 6:
                        stateRef.update({group: state.group+1,state:0});
                        break;
                    case 2:
                        if ((state.turn+1)%3===0) stateRef.update({group: 3,state:0});
                        else stateRef.update({turn: state.turn+1,group:1,state:0});
                        break;
                    case 4:
                        if (state.turn===11) stateRef.update({group: 5,state:0});
                        else stateRef.update({turn: state.turn+1,group:1,state:0});
                        break;
                    case 7:
                        stateRef.update({turn:11, group: 8,state:0});
                        break;
                }
                break;
        }
    });
};

export default watch;
