document.addEventListener("DOMContentLoaded", function() {
const dragons = [
    {name: "Terrible Terror", xp: 0, level: 1, power: 5, maxHP: 20, health: 20, id: 1, owned: true},
    {name: "Gronckle", xp: 0, level: 1, power: 10, maxHP: 100, health: 100, value: 100, id: 2, owned: false,},
    {name: "Natterhead", xp: 0, level: 1, power: 35, maxHP: 75, health: 75, value: 250, id: 3, owned: false,},
    {name: "Night Fury", xp: 0, level: 1, power: 75, maxHP: 100, health: 100, value: 1000, id: 4, owned: false,},
];
let currentDragon = 0;
let myDragon = dragons[currentDragon];
let gold = 10000;
let monster;
let ki = 0;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const info = document.querySelector("#info");
const xpText = document.querySelector("#xpText");
const levelText = document.querySelector("#levelText");
const goldText = document.querySelector("#goldText");
const healthText = document.querySelector("#healthText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealth = document.querySelector("#monsterHealth");

const monsters = [
    {name: "Beserker Henchman", level: 5, power: 1, maxHP: 15, health: 15, id: 0},
    {name: "Beserker Guard", level: 10, power: 10, maxHP: 50, health: 50, id: 1},
    {name: "Dagurs Personal Guard", level: 20, power: 50, maxHP: 250, health: 250, id: 2},
    {name: "Dagur the Deranged", level: 50, power: 123, maxHP: 777, health: 777, id: 3},
];
const locations = [
    {name: "home",
    "button text": ["Go to shop", "Travel to Berserk", "Check inventory"],
    "button functions": [goShop, goBeserk, goInventory],
    info: "You return to the town centre, where would you like to travel next."
    },
    {name: "shop",
    "button text": ["Buy new dragon", "Heal your dragon (10 gold)", "Return home"],
    "button functions": [buyDragon, healDragon, goHome],
    info: "You have entered the shop, what is it you wish to purchase",
    },
    {name: "shop inventory",
    "button text": ["Gronckle (100 gold)", "Natterhead (250 gold)", "Return home"],
    "button functions": [buyGronckle, buyNatterhead, goHome],
    info: "You have entered the shop, what is it you wish to purchase",
    },
    {name: "beserker island",
    "button text": ["Enter the dungeon", "Challenge Dagur", "Return home"],
    "button functions": [goDungeon, fightDagur, goHome],
    info: "You have landed on Berserker Island, are you prepared to face Dagur or must you defeat his men first."
    },
    {name: "inventory",
    "button text": ["Check inventory", "Swap dragon", "Return home"],
    "button functions": [showInventory, swapDragon, goHome],
    info: "Welcome to your inventory, here you can check for more information about your dragons and swap out the one your are actively fighting with."
    },
    {name: "battle",
    "button text": ["Attack", "Charge", "Flee"],
    "button functions": [attack, charge, goHome],
    info: "The battle begins..."
    },
    {name: "victory",
    "button text": ["Countinue fighting", "Challenge Dagur", "Return home"],
    "button functions": [goDungeon, fightDagur, goHome],
    info: "You slay your enemy and earn some loot some and gain some xp, what is your next move..."
    },
    {name: "defeat",
    "button text": ["Restart", "You won't", "Pussy"],
    "button functions": [restart, restart, restart],
    info: "With no dragon by your side you are overwhelmed and gone from the slayer to the slain."
    },
    {name: "dagur dead",
    "button text": ["Restart", "Restart", "Restart"],
    "button functions": [restart, restart, restart],
    info: "Far you're the man aye, too easy for you g your're gonna have to wait for the exapansion packs."
    },
    {name: "swap inventory",
    "button text": ["Equip Gronckle", "Equip Natterhead", "Return home"],
    "button functions": [equipGronckle, equipNatterhead, goHome],
    info: "Which dragon would you like to swap too."
    }
];

button1.onclick = goShop;
button2.onclick = goBeserk;
button3.onclick = goInventory;

function update(locations) {
    monsterStats.style.display = "none"
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];
    info.innerHTML = locations.info;
};

function restart() {
    update(locations[0])
}

function goHome() {
    update(locations[0])
};

function goShop() {
    update(locations[1])
};

function buyDragon() {
    update(locations[2])
};

function goBeserk() {
    update(locations[3])
};

function goInventory() {
    update(locations[4])
};

function buyGronckle() {
    if (gold >= dragons[1].value) {
        dragons[1].owned = true
        gold -= dragons[1].value
        myDragon = dragons[1]
        info.innerText = "You have purchased the Gronckle, this is a heavily fortified dragon with low power."
        xpText.innerText = dragons[1].xp
        goldText.innerText = gold
        levelText.innerText = dragons[1].level
        healthText.innerText = dragons[1].health
    } else {
        info.innerText = "You're broke, go make some money then come back here."
    }
};

function buyNatterhead() {
    if (gold >= dragons[2].value) {
        dragons[2].owned = true
        gold -= dragons[2].value
        myDragon = dragons[2]
        info.innerText = "You have purchased the Natterhead, this dragon can send viscous spine projectiles at its enemies."
        xpText.innerText = myDragon.xp
        goldText.innerText = gold
        levelText.innerText = myDragon.level
        healthText.innerText = myDragon.health
    } else {
        info.innerText = "You're broke, go make some money then come back here."
    }
};

function healDragon() {
    if (myDragon.health < myDragon.maxHP) {
        if (gold >= 10) {
            myDragon.health += 10
            gold -= 10
            goldText.innerText = gold
            healthText.innerText = myDragon.health
            if (myDragon.health >= myDragon.maxHP) {
            myDragon.health = myDragon.maxHP
            healthText.innerText = myDragon.health
            }
        }
        else {
            info.innerText = "You're broke, go make some money then come back here."
        }
     }
    else {
        info.innerText = "You're dragon is already fully healed and ready to battle"
    }
};

function goDungeon() {
    update(locations[5])
    if (myDragon.power >= monsters[2].power) {
        monster = monsters[getMonster(0, 2)]
    } else if (myDragon.power >= monsters[1].power) {
        monster = monsters[getMonster(0, 1)]
    } else {
        monster = monsters[0]
    } 
    monster.health = monster.maxHP
    monsterName.innerText = monster.name
    monsterHealth.innerText = monster.health
    monsterStats.style.display = "block"
    info.innerText = "You encounter a random enemy as you roam the Berserker island dungeons, prepare to battle!"
};

function getMonster(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

function attack() {
    info.innerText = "The" + monster.name + "attacks."
    info.innerText += myDragon.name + "strikes back."
    myDragon.health -= monster.power
    monster.health -= myDragon.power
    healthText.innerText = myDragon.health
    monsterHealth.innerText = monster.health
    ki = 0
    if (myDragon.health <= 0) {
        update(locations[7])
    } else if (monster.health <= 0) {
        if (monster.id == 3) {
            update(locations[8])
        } else {
            update(locations[6])
            myDragon.xp += monster.level * 10
            console.log(gold)
            gold += monster.level * 5
            xpText.innerText = myDragon.xp
            goldText.innerText  = gold
            if (myDragon.xp >= 100) {
                levelup()
            }
            }
    }
};

function fightDagur() {
    update(locations[5])
    monster = monsters[3]
    monsterName.innerText = monster.name
    monsterHealth.innerText = monster.health
    monsterStats.style.display = "block"
    info.innerText = "Dagur: You will not stand in the way of my mission and I, move now or pay the price."
};

function charge() {
    info.innerText = "The" + monster.name + "attacks."
    info.innerText = "You charge your next attack to be even more lethal."
    myDragon.health -= monster.power
    healthText.innerText = myDragon.health
    monsterHealth.innerText = monster.health
    ki = Math.floor(myDragon.power * 1.35)
};

function levelup() {
    myDragon.xp = 0
    myDragon.level += 1
    myDragon.power += myDragon.id * 5
    myDragon.health += 15
    myDragon.maxHP += 15
    healthText.innerText = myDragon.health
    xpText.innerText = myDragon.xp
    levelText.innerText = myDragon.level
    info.innerText = "Congratulations your dragon has leveled up."
};

function showInventory() {
    info.innerText = "These are your dragons: \n"
    dragons.forEach(dragon => {
        if (dragon.owned) {
            info.innerText += dragon.name + "\n";
        } else {
            console.log(`${dragon.name} is not owned.`);
        }
    });
};

function swapDragon() {
    update(locations[9])
}

function equipGronckle() {
    if (dragons[1].owned === true) {
    myDragon = dragons[1]
    info.innerText = "You have equipped Gronckle"
    } else {
        info.innerText = "You do not own this dragon"
    }
    xpText.innerText = myDragon.xp
    levelText.innerText = myDragon.level
    healthText.innerText = myDragon.health
}

function equipNatterhead() {
    if (dragons[2].owned === true) {
        myDragon = dragons[2]
        info.innerText = "You have equipped Natterhead"
        } else {
            info.innerText = "You do not own this dragon"
        }
    xpText.innerText = myDragon.xp
    levelText.innerText = myDragon.level
    healthText.innerText = myDragon.health
}

})