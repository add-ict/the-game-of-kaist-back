async function before (rootRef) {
    const stateRef = rootRef.child("state");

    stateRef.update({state:2});
}

export default before;