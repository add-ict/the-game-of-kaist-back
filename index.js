import watch from "./src/watch";

//const gamesN=3;
//const roots=Array(gamesN).fill(0).map((x,i)=>`/games/game${i}`);
const roots=["/"]
for (let i=0;i<roots.length;i++)
    watch(roots[i]);