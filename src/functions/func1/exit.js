const exit = (root,state)=>{
    const stateRef = root.child("state");
    stateRef.set(20);
};

export default exit;