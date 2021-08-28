const descs = [
    ["<Department of Status Trade>\n본인 팀의 두 스탯(보너스 제외)을 서로 교환할 수 있다.",
        "<Department of Status Trade>\nYou can swap scores of two stats(excluding 'Bonus') of your team."],
    ["<Department of Mathe-Magics>\n본인 팀의 한 스탯(보너스 제외)의 숫자를 랜덤으로 재배치할 수 있다. (ex 132 -> 231)",
        "<Department of Mathe-Magics>\nYou can choose one of your team’s stats(excluding 'Bonus') and randomly relocate the numbers. (ex 132 -> 231)",],
    ["<Department of Department>\n본인 팀의 가장 낮은 스탯(보너스 제외)을 2배로 올릴 수 있다. 가장 낮은 스탯이 여러 개일 경우, 그 중 하나가 랜덤으로 선택된다.",
        "<Department of Department>\nYou can double the lowest stat(excluding 'Bonus') of your team. If there are multiple lowest stats, one stat is chosen randomly. "],
]
async function before_6 (classRef,upstream) {
    const stream = {};
    let result = upstream?.LAST_SELECT?.result;
    if (!result) result=0;
    stream.title = ["학과 진입","Joining the Department"];
    stream.desc = descs[result];
    return classRef.update({'downstream/LAST_USE':stream});
};

export default before_6;