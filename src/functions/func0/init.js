import mapData from "../assets/mapData"
import deck from "../assets/deck";

const init = (root,state)=>{
    const initScore = {
        value: 0,
        maxScale: 100,
        minScale: 0,
    };
    const initTurnState = {
        turnState: "init",
        prev:"init",
        score: {R: initScore,G: initScore,H: initScore,B: initScore},
        ranking: {R: [1,1,1,1,1],G: [1,1,1,1,1],H: [1,1,1,1,1],B: [1,1,1,1,1]},
        character: 0,
        deck:{
            ...deck,
            used: Array(deck.cards.length).fill(false),
        },
        map: {location: 24},
    };
    initTurnState["map"].positions={};
    for (let i=0;i<40;i++) initTurnState["map"].positions[i]={position:i, canGo: false};
    const initClass = {
        classID: -1,
        name: "",
        turnState: "init",
        turnStates: {init: initTurnState},
    };
    const initClasses = {};
    for (let i=0;i<5;i++) {
        initClasses[i]=initClass;
        initClasses[i].classID=i;
        initClasses[i].name="Class #"+i;
    };
    root.set({
        turn: 0,
        state: 9,
        mapData,
        class: initClasses,
        timer: {until:0,time:0},
        CKPT: false,
    });
};

export default init;