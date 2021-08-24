import mapData from "../assets/mapData";
import R from "../assets/R";

async function after_1 (classRef,classData) {
    const location = classData.map.location;
    const deck = classData.deck;
    const cards = deck.cards;
    const used = deck.used;
    let nextLocation=classData?.upstream?.MOVEMENT;
    if (!nextLocation) {
        let candi = [];
        for (let i = 0; i < cards.length; i++)
            if (!used[i]){
                candi = candi.concat(R[location][cards[i]]);
                console.log(location)}
        nextLocation = {position:candi[Math.floor(Math.random()*candi.length)]}
    }

    for (let i = 0; i < deck.cards.length; i++)
        if (!used[i])
            if (R[location][cards[i]].includes(parseInt(nextLocation.position))) {
                used[i] = true
                break
            }

    console.log(nextLocation)
    return classRef.update({"map/location":nextLocation.position,"deck/used":used,"map/canGo":Array(40).fill(false)});
};

export default after_1;