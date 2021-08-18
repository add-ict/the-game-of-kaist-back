const newTurnGroup = rootRef=>{
    const turnGroupsRef = rootRef.child("turnGroups")
    const stateRef = rootRef.child("state")
    rootRef.child("turnGroup").get()
        .then(snapshot=>{
            const turnGroup = snapshot.val();
            stateRef.get()
                .then(snapshot=>{
                    const state = snapshot.val();
                    const newTurnGroup = `${(100+state.turn+"").slice(1,3)}-${state.group}`;
                    turnGroupsRef.child(turnGroup).get()
                        .then(snapshot=>{
                            turnGroupsRef.update({[newTurnGroup]: {...snapshot.val(),prev:turnGroup,turnGroup:newTurnGroup}})
                                .then(()=> {
                                    rootRef.update({turnGroup:newTurnGroup})
                                        .then(()=>{
                                            console.log(`New turn group ${state.turn}-${state.group}`);
                                            stateRef.update({state:1});
                                        })
                                })
                        });
                });
        });
};

export default newTurnGroup;