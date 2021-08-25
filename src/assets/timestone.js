const MOVEMENT = 1;
const MINIGAME = 2;
const SEASON_SELECT = 3;
const SEASON_USE = 4;
const LAST_SELECT = 5;
const LAST_USE = 6;
const BONUS_USE = 7;
const RESULT = 8;

const timestone = state => {
    if (state.group === MOVEMENT) return 90;
    if (state.group === MINIGAME) return 140;
    if (state.group === SEASON_SELECT) return 90;

    if (state.group === SEASON_USE && state.turn ===2) return 20;
    if (state.group === SEASON_USE) return 90;

    if (state.group === LAST_USE) return 60;

    return 120;
};

export default timestone;