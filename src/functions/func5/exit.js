const exit = (root,state)=>{
    const stateRef = root.child("state");
    stateRef.set(60);
};

export default exit;