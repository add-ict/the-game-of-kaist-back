const after = rootRef => {
    const stateRef = rootRef.child("state");
    stateRef.update({state:8});
}

export default after;