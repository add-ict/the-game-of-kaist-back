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
        return Math.floor(coef[cData[character][RGH]]*dv[RGH])
    else
        return Math.floor(-coef[cData[character][RGH]]*dv[RGH])
}
const charEffect =  (dv,score,character) => {
    const ret={}
    ret.R = classData.score.R.value
    ret.G = classData.score.G.value
    ret.H = classData.score.H.value
    ret.B = classData.score.B.value + dv.B
    const RGB="RGH"
    for (let i=0;i<3;i++)
        if (dv[RGB[i]]>0)
            ret[RGB[i]]+=Math.floor(coef[cData[character][RGB[i]]]*dv[RGB[i]])
        else
            ret[RGB[i]]+=Math.floor(coef[-cData[character][RGB[i]]]*dv[RGB[i]])
    return dv
}
export default charEffect;