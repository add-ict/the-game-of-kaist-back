export const getInitGame = (initGameState=5)=>{
    const upstream = {
        character:0,
        MOVEMENT: -1,
        MINIGAME: 0,
        SEASON_SELECT: 0,
        SEASON_USE:0,
        LASTEVENT:0,
        LASTEVENT_USE:0,
        USE_BONUS:0,

    }
    const flag = {
        flag11:false,
        flag12:false,
        flag13:-1,
        flag22:false,
    }
    const publicDB = {
        timer: 0,
        time: 0,
        turns: 0,
        cards: [1,2,3,4,5],
        gameState: initGameState,
        ranking: {
            Relation: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1},
            Grades: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1},
            Health: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1},
            Bonus: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1},
        },
        prevRanking: {
            Relation: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1},
            Grades: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1},
            Health: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1},
            Bonus: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1},
        },
        modal: ["","",""],
    }
    const privateDB = {
        character: 0,
        deck: {0: false, 1: false, 2: false, 3:false, 4:false},
        score: {Relation: 0, Grades: 0, Health: 0, Bonus: 0},
        scoreScale: {min: 0, max: 100},
        location: 24,
        nextLocation: -1,
        mapData: {
            24: {
                location: 24,
                who: [0,1,2,3,4],
                tooltip: "",
                affectTo: {Relation: false, Grades: false, Health: false, Bonus: false},
                canGo: false
            }
        },
        modalTitle: "",
        lastMINIGAME: -1,
        lastSEASON_SELECT: {askN:0,desc:"Error: Please Call Admin."},
        lastLASTEVENT: {askN:0,desc:"Error: Please Call Admin."}
    }
    const privateDBs ={};
    const upstreams={}
    const flags={}

    for (let i=0;i<5;i++) privateDBs[i]=privateDB;
    for (let i=0;i<5;i++) upstreams[i]=upstream;
    for (let i=0;i<5;i++) flags[i]=flag;
    return {timestamp: Date.now(), public:publicDB,private:privateDBs,upstream:upstreams,flag:flags}
}
export const getInitState= gamesN=>{
    const initGame = getInitGame(0);
    const initState = {games:{},system:{INTR:false}};
    for (let i=0;i<gamesN;i++)
        initState.games[`game${i}`]=initGame;
    return initState
}