import watch from "./src/watch";
import {getDB} from "./Firebase";

//const roots=Array(3).fill(0).map((x,i)=>`/games/game${i}`);
const roots=["/"]
for (let i=0;i<roots.length;i++)
    watch(getDB(roots[i]));