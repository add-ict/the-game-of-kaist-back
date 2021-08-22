const announce = rootRef => {
    const stateRef = rootRef.child("state");
    stateRef.update({state:9});
}

export default announce;