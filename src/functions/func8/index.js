import {entry} from "../common";
import before from "./before";

const func = {
    0: entry,
    1: before,
    2: ()=>{}
};
export default func;