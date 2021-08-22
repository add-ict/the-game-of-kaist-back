const descs = [
    ["Department of Status Trade",""],
    ["Department of Mathe-Magics",""],
    ["Department of Department",""],
]
async function before_5 (classRef) {
    const stream = {};
    stream.title = ["학과 선택",""];
    stream.desc = descs;
    return classRef.update({'downstream/LAST_SELECT':stream});
};

export default before_5;