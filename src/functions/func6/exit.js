const exit = (root,state)=>{
    const stateRef = root.child("state");
    stateRef.set(70);
};

export default exit;