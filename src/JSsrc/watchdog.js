import {getDB} from "../../Firebase.js"
import {genesis} from "./genesis";
import timestone from "./timestone";
import watchINTR from "./watchINTR";
import timer from "./timer";
const spawn = require('child_process').spawn;
const call = (root)=>{
    const ret = spawn('/Users/seunghwan/miniconda3/envs/kaistua/bin/python', ['./src/main.py',root]);
    console.log('called py')
    ret.stdout.on('data', data=>console.log(data.toString()));
    ret.stderr.on('data', data=>console.log(data.toString()));
}

export const watch = root=>{
    const stateDB = getDB(root+'/public/gameState');
    const adminDB = getDB(root+'/admin');
    const upstreamDB = getDB(root+'/upstream');
    const privateDB = getDB(root+'/private');
    const timerDB = getDB(root+'/public/timer');
    stateDB.on("value",snapshot=>{
        const state = snapshot.val();
        console.log("State watched",root,state);
        if (state===5) genesis(root);
        else if(state!==0)
        switch (state%10) {
            // init
            // call python
            case 0:
                adminDB.update({CKPT2:true});
            case 7:
                call(root);
                break;
            // timer
            case 5:
                timer(root,timestone[state],()=>{stateDB.set(state+1)});
                break;
            // ckpt2
            case 6:
                watchINTR(root+'/admin/CKPT2',()=>{stateDB.set(state+1)})
                break;
            default:
                break;
        }
    })
    adminDB.child("Tm").on("value",snapshot=>{
        const Tm=snapshot.val();
        if (Tm) {
            timerDB.once("value",sn=>{
                timerDB.set(sn.val()-Tm);
            })
            adminDB.update({Tm:0});
        }
    })
    upstreamDB.on("value",snapshot=>{
        const data = snapshot.val();
        stateDB.once("value",ssnp=>{
            const state = ssnp.val();
            for(let i=0;i<5;i++) {
                privateDB.child(i).child('character').set(data[i].character);
                if(state==15||state==16) privateDB.child(i).child('nextLocation').set(Number.isInteger(data[i].MOVEMENT)&&data[i].MOVEMENT!==-1?data[i].MOVEMENT:-1);
            }
        })
    })
}