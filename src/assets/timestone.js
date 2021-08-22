const timestone = state => {
    if (state.group === 4 && state.turn ===2) return 30;
    if (state.group === 6) return 120;
    return 120;

};

export default timestone;