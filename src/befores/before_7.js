async function before_7 (classRef) {
    const stream = {};
    stream.title = ["보너스 사용","보너스 사용(번역X)"];
    return classRef.update({'downstream/BONUS_USE':stream});
};

export default before_7;