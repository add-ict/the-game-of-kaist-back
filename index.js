import {watch} from "./src/JSsrc/watchdog";
import {genesisN} from "./src/JSsrc/genesis";

const gamesN=3;
const roots=Array(gamesN).fill(0).map((x,i)=>`/games/game${i}`);
//genesisN(gamesN);
for (let i=0;i<gamesN;i++)
    watch(roots[i]);