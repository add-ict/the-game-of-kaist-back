async function before_7 (classRef) {
    const stream = {};
    stream.title = ["보너스 사용",""];
    return classRef.update({'downstream/BONUS_USE':stream});
};

export default before_7;