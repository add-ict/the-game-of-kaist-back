export const cData = {
    0: {R:0,G:0,H:0},
    1: {R:-1,G:0,H:1},
    2: {R:2,G:-1,H:-1},
    3: {R:-2,G:2,H:0},
    4: {R:1,G:-2,H:1},
    5: {R:0,G:1,H:-1},
}
export const coef = {
    [-2]:0.8,
    [-1]:0.9,
    0: 1,
    1: 1.1,
    2: 1.2
}
export const getEffect = (dv,RGH,character) => {
    if (dv>0)
        return Math.floor(coef[cData[character][RGH]]*dv)
    else
        return Math.floor(coef[-cData[character][RGH]]*dv)
}
const charEffect =  (dv,score,character) => {
    const ret={}
    ret.R = score.R.value
    ret.G = score.G.value
    ret.H = score.H.value
    ret.B = score.B.value + dv.B
    const RGH="RGH"
    for (let i=0;i<3;i++)
        ret[RGH[i]] += getEffect(dv[RGH[i]],RGH[i],character)
    return dv
}
export default charEffect;