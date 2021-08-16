import {ckpt, entry, timer} from "../common";
import exit from "./exit";
import before from "./before";
import process from "./process";
import after from "./after";

const funcs = {
    0: entry,
    1: before, // updateDeck updateMapInfo
    2: timer,
    3: ckpt,
    7: process, // apply Location
    8: after, //
    9: exit,
};
export default funcs;