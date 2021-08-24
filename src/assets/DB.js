/*
DB.js
Build database.rules.json

Rule
child node
bool
int
str
$x
 */

import mapData from "./mapData";
export const VERSION = "1.0.0"
const INT = "int";
const BOOL = "bool";
const STR = "str";
const iSTR = "istr"; //[str] or [str|str]
const ANY = "any";
const LIST = (type, len=-1) => {
    return (type,len)
}

const LEN_CARDS = 5;
const LEN_LOCATION = 40;

//outdated
const DB = {
    VERSION: STR,
    state:{
        turn: INT,
        group: INT,
        state: INT
    },
    mapData: {
        $position: {
            position: INT,
            name: iSTR,
            cause: iSTR,
            desc: iSTR,
            value: [
                {
                    R: INT,
                    G: INT,
                    H: INT,
                    B: INT
                },
                {
                    R: INT,
                    G: INT,
                    H: INT,
                    B: INT
                },
                {
                    R: INT,
                    G: INT,
                    H: INT,
                    B: INT
                }
            ],
            affection: {
                R: BOOL,
                G: BOOL,
                H: BOOL,
                B: BOOL
            }
        }
    },
    timer:{
        until: INT,
        time: INT
    },
    CKPT: BOOL,
    turnGroup: STR,
    turnGroups: {
        $turnGroup: {
            prev: STR,
            turnGroup: STR,
            ranking: {
                R: {0:INT,1:INT,2:INT,3:INT,4:INT},
                G: {0:INT,1:INT,2:INT,3:INT,4:INT},
                H: {0:INT,1:INT,2:INT,3:INT,4:INT},
                B: {0:INT,1:INT,2:INT,3:INT,4:INT}
            },
            class:{
                $classID: {
                    classID: INT,
                    score: {
                        R: {max: INT,min: INT, value:INT},
                        G: {max: INT,min: INT, value:INT},
                        H: {max: INT,min: INT, value:INT},
                        B: {max: INT,min: INT, value:INT}
                    },
                    character: INT,
                    deck: {
                        cards: LIST(INT,LEN_CARDS),
                        used: LIST(BOOL,LEN_CARDS)
                    },
                    map: {
                        location: INT,
                        canGo: LIST(BOOL,LEN_LOCATION)
                    },
                    upstream: ANY,
                    downstream: ANY
                }
            }
        }
    }
};
const initClass = classID => {
    return {
        classID: classID,
        name: "Class "+classID,
        score: {
            R: {max: 400,min: -100, value:0},
            G: {max: 400,min: -100, value:0},
            H: {max: 400,min: -100, value:0},
            B: {max: 400,min: -100, value:0},
        },
        character: 0,
        deck: {
            cards: [1,2,3,4,5],
            used: Array(LEN_CARDS).fill(false)
        },
        map: {
            location: 24,
            canGo: Array(LEN_LOCATION).fill(false)
        },
        upstream: {},
        downstream: {},
        MESSAGE: {}
    }
}
//update database.rules.json
const initState = {
    VERSION,
    state:{
        turn: 0,
        group: 0,
        state: 0
    },
    mapData,
    timer:{
        until: 0,
        time: 0
    },
    CKPT: false,
    RELOAD: 0,
    turnGroup: "init",
    turnGroups: {
        init: {
            prev: "init",
            turnGroup: "init",
            ranking: {
                R: {0:1,1:1,2:1,3:1,4:1},
                G: {0:1,1:1,2:1,3:1,4:1},
                H: {0:1,1:1,2:1,3:1,4:1},
                B: {0:1,1:1,2:1,3:1,4:1}
            },
            class:{
                0:initClass(0),
                1:initClass(1),
                2:initClass(2),
                3:initClass(3),
                4:initClass(4),
            }
        }
    }
};

export default initState;