import timestone from "../assets/timestone";
const period = 30;
export const entry = (root,state)=>{
    const stateRef = root.child("state");
    stateRef.set(state+1);
};
export const timer = (root,state)=>{
    const delay = timestone[Math.floor(state/10)]*1000;
    root.child("timer").set({until: Date.now()+delay,time:delay})
        .then(()=>{
            const id = setInterval(()=>{
                root.child("timer").once("value",snapshot=>{
                    const timer = snapshot.val();
                    if (timer.until - Date.now()<=0) {
                        clearInterval(id);
                        root.child("state").set(state+1);
                    }
                    else {
                        const time = Math.round(timer.until - Date.now());
                        if (timer.time!==time) root.child("timer/time").set(time);
                    }
                });
            },period);
        });
}
export const ckpt = (root,state)=>{
    root.child("CKPT").set(true)
        .then(()=>{
            root.child("CKPT").once("value",snapshot=>{
                root.child("state").set(state+4);
            })
        });
}