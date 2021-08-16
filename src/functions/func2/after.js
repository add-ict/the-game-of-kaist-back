const func = (root,state)=>{
    root.child("turn").get()
        .then(ts=>{
            const turn = ts.val();
            const promises=[];
            for (let classID=0;classID<5;classID++) {
                const classRef = root.child('class').child(classID);
                const promise = classRef.child("turnState").get()
                    .then(snapshot=>{
                        const turnState = snapshot.val();
                        return classRef.child("turnStates").child(turnState).get();
                    }).then(snapshot=>{
                        const now = snapshot.val();
                        const turnState = `${turn}-${state}`;
                        const turnStateDir = `turnStates/${turn}-${state}`;
                        const next = {...now,turnState: turnState,prev: now.turnState, upstream:null, downstream:null};
                        // ***************



                        // ***************
                        classRef.update({"turnState":turnState,[turnStateDir]: next});
                    });
                promises.push(promise);
            };
            Promise.all(promises)
                .then(()=>{
                    root.child("state").set(state+1);
                });
        });

};

export default func;