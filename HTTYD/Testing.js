const dragons = [
    {name: "Terrible Terror", xp: 0, level: 1, power: 5, maxHP: 20, health: 20, id: 1, owned: true},
    {name: "Gronckle", xp: 0, level: 1, power: 10, maxHP: 100, health: 100, value: 100, id: 2, owned: false,},
    {name: "Natterhead", xp: 0, level: 1, power: 35, maxHP: 75, health: 75, value: 250, id: 3, owned: false,},
    {name: "Night Fury", xp: 0, level: 1, power: 75, maxHP: 100, health: 100, value: 1000, id: 4, owned: false,},
];
let currentDragon = 0;
let myDragon = dragons[currentDragon];

let ki = Math.floor(myDragon.power * getRandom(1, 3))
console.log(ki)

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};
