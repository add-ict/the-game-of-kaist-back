const exit = (root,state)=>{
    const stateRef = root.child("state");
    stateRef.set(80);
};

export default exit;