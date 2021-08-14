import {getInitGame, getInitState} from "./initState";
import {getDB} from "../../Firebase";

export const genesis = root=>{
    const initGame = getInitGame();
    const rootDB = getDB(root);
    rootDB.set(initGame)
        .then(()=>{
            return rootDB.child('public/gameState').set(10);
        })
        .catch(res=>console.error(res));
}

export const genesisN = gamesN=>{
    const initState = getInitState(gamesN);
    getDB('/').set(initState)
        .then(res=>console.log(res))
        .catch(res=>console.error(res))
}