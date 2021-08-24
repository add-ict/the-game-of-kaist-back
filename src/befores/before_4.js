const titles = [
    ["[First Half of Fall Semester]\n해당 시즌 이벤트를 선택한 팀끼리 '???' 스탯 100점을 나눠 가진다.",
        "[First Half of Fall Semester]\n" +
        "Teams that picked this event divide up 100 points of '???' stat."],
    ["[Second Half of Fall Semester]\n타 팀(한 반)의 '???' 스탯을 40점 하락시킨다.",
        "[Second Half of Fall Semester]\n" +
        "Your team can take away 40 points from another team's '???' stat."],
    ["[First Half of Spring Semester] 타 팀(한 반)의 '???' 스탯을 40점 빼앗을 수 있다.",
        "[First Half of Spring Semester]\n" +
        "Your team can drop 40 points of another team's '???' stat."],
    ["[Second Half of Spring Semester]",
        "[Second Half of Spring Semester]"]
]
const descs = [
    [
        ["[개강] 겹강 구해요\n설명: 개강도 했겠다, 슬슬 시작해야죠?\n적용 스탯: Grades",
            "[Start of the Semester] Does anyone take the same course as me?\n" +
            "Description: Finally, the new semester is here. Shall we start?\n" +
            "Applied stat: Grades"],
        ["[KAMF] 같이 즐기는 KAMF\n설명: KAMF는 KAIST Art & Music Festival의 약자랍니다.\n적용 스탯: Relationship",
            "[KAMF] Enjoy KAMF altogether\n" +
            "Description: KAMF stands for KAIST Art & Music Festival.\n" +
            "Applied stat: Relationship"],
        ["[카포전] 질 수 없는 싸움\n설명: 하지만 무엇보다 안전이 가장 중요해요.\n적용 스탯: Health",
            "[KAIST-POSTECH Festival] You are no match for me.\n" +
            "Description: Anyway, safety always comes first. Remember!\n" +
            "Applied Stat: Health"],
    ],
    [
        ["[단풍 구경] 단풍은 못 참지\n설명: 알록달록 단풍 때문에 뭔가에 집중이 하나도 안 되는 것만 같은 기분이에요.\n적용 스탯: Grades",
            "[Going See the Fall Foliage] I can't wait for it!\n" +
            "Description: I feel like losing concentration because of colorful fall leaves.\n" +
            "Applied Stat: Grades"],
        ["[종강] 본가로 돌아가요\n설명: 짐 챙겨서 본가로 돌아가는 친구들이 하나둘 보이기 시작해요.\n적용 스탯: Relationship",
            "[End of the Semester] Let's go back home.\n" +
            "Description: I can see some friends begin to pack their baggage and head home.\n" +
            "Applied Stat: Relationship"],
        ["[Year-End Party] 아무리 연말파티라도\n설명: 과식은 금물이지요.\n적용 스탯: Health",
            "[Year-End Party] Even it's the end of the year...\n" +
            "Description: You should NOT overeat!\n" +
            "Applied Stat: Health"],
    ],
    [
        ["[벚꽃 구경] 같이 갈 사람?\n설명: 하지만 벚꽃이 필 즈음엔 다들 바빠진답니다.\n적용 스탯: Grades",
            "[Cherry Blossom Viewing] Who'd like to join me?\n" +
            "Description: But everybody gets busy just when the cherry blossoms start to bloom.\n" +
            "Applied Stat: Grades"],
        ["[딸기파티] 딸기 나눠 먹기\n설명: 딸기를 같이 먹으면 아무튼 이런저런 효과가 있다고 합니다.\n적용 스탯: Relationship",
            "[Strawberry Party] Sharing strawberries with others\n" +
            "Description: It is said that eating strawberries together has various effects.\n" +
            "Applied Stat: Relationship"],
        ["[중간고사] 교양분관의 망령\n설명: 이상하죠. 공부만 시작하면 자꾸 졸려요.\n적용 스탯: Health",
            "[Midterm Exam] The Phantom of the Undergraduate Branch Library\n" +
            "Description: Weird. Whenever I start studying, I get sleepy.\n" +
            "Applied Stat: Health"],
    ],
    [
        ["[축제] 즐거운 하루\n" +
        "설명: 즐거운 날에는 생각지도 못했던 일들이 일어나곤 하죠.\n" +
        "효과: 본인 팀의 '보너스' 스탯을 2배로 증가시킬 수 있다.",
            "[Spring Festival] Such a nice day!\n" +
            "Description: On a day like this, unexpected things happen.\n" +
            "Effect: You can double your team's 'Bonus' stat."],
        ["[학과설명회] 이젠 새내기가 아니야\n" +
        "설명: 학과 선택의 갈림길에서 학과 설명회는 필수가 아닐까요?\n" +
        "효과: '학과 진입' 이벤트에 대한 힌트를 제공한다.\n" +
        "\n" +
        "- 학과 목록\n" +
        "1) Department of Status Trade\n" +
        ": 본인 팀의 두 스탯(보너스 제외)을 서로 교환할 수 있다. \n" +
        "2) Department of Mathe-Magics\n" +
        ": 본인 팀의 한 스탯(보너스 제외)의 숫자를 랜덤으로 재배치할 수 있다. (ex 132 -> 231)\n" +
        "3) Department of Department\n" +
        ": 본인 팀의 가장 낮은 스탯(보너스 제외)을 2배로 올릴 수 있다. 가장 낮은 스탯이 여러 개일 경우, 그 중 하나가 랜덤으로 선택된다.",
            "[Department Information Session] I'm not a freshman anymore.\n" +
            "Description: Isn't a department information session necessary at a crossroads of deciding major?\n" +
            "Effect: You can get some hints about the 'Final Event: Joining the Department' event.\n" +
            "\n" +
            "- List of Departments\n" +
            "1) Department of Status Trade\n" +
            ": You can swap scores of two stats(excluding 'Bonus') of your team.\n" +
            "2) Department of Mathe-Magics\n" +
            ": You can choose one of your team's stats(excluding 'Bonus') and randomly relocate the numbers. (ex 132-> 231)\n" +
            "3) Department of Department\n" +
            ": You can double the lowest stat(excluding 'Bonus') of your team. If there are multiple lowest stats, one stat is chosen randomly."],
        ["[기말고사] 복습은 철저히\n" +
        "설명: 열심히 복습할수록 좋은 결과가 나올 거예요!\n" +
        "효과: 앞선 6개의 시즌 이벤트 중 하나를 선택할 수 있다.\n" +
        "\n" +
        "[기말고사] 복습은 철저히\n" +
        "설명: 열심히 복습할수록 좋은 결과가 나올 거예요!\n" +
        "효과: 앞선 6개의 시즌 이벤트 중 하나를 선택할 수 있다.\n" +
        "\n" +
        "- 이벤트 목록\n" +
        "1) [단풍 구경] 공부는 일단 뒷전: 타 팀(한 반)의 'Grades' 스탯을 40점 하락시킨다.\n" +
        "2) [종강] 본가로 돌아가요: 타 팀(한 반)의 'Relation' 스탯을 40점 하락시킨다.\n" +
        "3) [중간고사] 교양분관의 망령: 타 팀(한 반)의 'Health' 스탯을 40점 빼앗을 수 있다.",
            "[Final Exam] Review thoroughly.\n" +
            "Description: The more thorough you review, the better the results will come out!\n" +
            "Effect: You can choose from one of the previous season events.\n" +
            "\n" +
            "- List of Events\n" +
            "1) [Going See the Fall Foliage] I can't wait for it!: Your team can drop 40 points of another team's 'Grades' stat.\n" +
            "2) [End of the Semester] Let's go back home: Your team can drop 40 points of another team's 'Relationship' stat.\n" +
            "3) [Midterm Exam] The phantom of the Undergraduate Branch Library: Your team can take away 40 points from another team's 'Health' stat."],
    ],
]
async function before_4 (classRef,state,upstream) {
    const stream = {};
    let result=upstream?.SEASON_SELECT;
    if (!result) result={result:0};
    stream.title = titles[Math.floor(state.turn/3)]
    stream.desc = descs[Math.floor(state.turn/3)][result.result]
    return classRef.update({'downstream/SEASON_USE/title':stream.title,'downstream/SEASON_USE/desc':stream.desc});
};

export default before_4;