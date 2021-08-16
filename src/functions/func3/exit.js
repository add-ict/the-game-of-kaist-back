const exit = (root,state)=>{
    const stateRef = root.child("state");
    stateRef.set(40);
};

export default exit;