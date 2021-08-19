import timestone from "./assets/timestone";

const timer = (rootRef,beforeState,afterStateState) => {
    const timerRef = rootRef.child("timer");
    const stateRef = rootRef.child("state");
    const delay = timestone(beforeState);
    let until = Date.now()+delay*1000;
    let time = delay;
    timerRef.set({until,time});
    timerRef.on('value',snapshot=>{
        until = snapshot.val().until;
        time = snapshot.val().time;
    });
    const id = setInterval(()=>{
        if (until - Date.now() <= 0) {
            clearInterval(id);
            timerRef.off();
            stateRef.update({state: afterStateState});
        }
        else {
            const newTime = Math.round((until-Date.now())/1000)
            if (time!==newTime) {
                time = newTime;
                timerRef.update({time:newTime});
            }
        }
    },30);
};

export default timer;