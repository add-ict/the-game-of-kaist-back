const process = (root,state)=>{

    root.child("state").set(state+1);
};

export default process;