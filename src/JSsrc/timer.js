import {getDB} from "../../Firebase";
const checkPeriod = 300; //ms
const timer = (root,flyingTime,fire,state)=>{
    const timerDB = getDB(root+'/public/timer');
    const timeDB = getDB(root+'/public/time');
    //const stateDB = getDB(root+'/public/time');
    let timeFire = Date.now()+flyingTime*1000;
    let time = flyingTime;
    timerDB.set(Date.now()+flyingTime*1000);
    timerDB.on('value',snapshot=>{
        timeFire=snapshot.val();
    });
    const id = setInterval(()=>{
        if( timeFire <= Date.now() ) {
            clearInterval(id);
            timerDB.off();
            fire();
        }
        else {
            const newTime = Math.round((timeFire-Date.now())/1000);
            if (time!==newTime) {
                time = newTime;
                timeDB.set(time);
            }
        }
    },checkPeriod);
}
export default timer;