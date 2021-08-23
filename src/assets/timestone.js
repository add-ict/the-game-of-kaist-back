const timestone = state => {
    return 0;
    if (state.group === 4 && state.turn ===2) return 30;
    if (state.group === 6) return 60;
    return 120;

};

export default timestone;