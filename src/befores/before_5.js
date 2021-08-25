const descs = [
    ["Department of Stat Trade",""],
    ["Department of Mathe-Magics",""],
    ["Department of Department",""],
]
async function before_5 (classRef) {
    const stream = {};
    stream.title = ["학과 진입","Joining the Department"];
    stream.desc = descs;
    return classRef.update({'downstream/LAST_SELECT':stream});
};

export default before_5;