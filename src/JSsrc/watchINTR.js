const {getDB} = require("../../Firebase");

const watchINTR = (target,fire) => {
    //return fire();
    const targetDB = getDB(target);
    targetDB.on("value",snapshot=>{
        console.log(target,snapshot.val())
        if(!snapshot.val()) {
            targetDB.off();
            fire();
        }
    });
}

export default watchINTR;