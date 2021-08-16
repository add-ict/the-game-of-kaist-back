const exit = (root,state)=>{
    const turnRef = root.child("turn");
    const stateRef = root.child("state");
    turnRef.once("value",snapshot=>{
        const turn = snapshot.val();
        if (turn===11) stateRef.set(50);
        else {
            stateRef.set(10);
            turnRef.set(turn+1);
        }
    });
};

export default exit;