const exit = (root,state)=>{
    const stateRef = root.child("state");
    stateRef.set(10);
};

export default exit;