document.addEventListener("DOMContentLoaded", function() {
const dragons = [
    {name: "Terrible Terror", xp: 0, level: 1, range: 0.5, maxHit: 5, maxHP: 20, health: 20, id: 0, owned: true},
    {name: "Gronckle", xp: 0, level: 1, range: 0.5, maxHit: 10, maxHP: 100, health: 100, value: 200, id: 1, owned: false},
    {name: "Natterhead", xp: 0, level: 1, range: 0.65, maxHit: 35, maxHP: 75, health: 75, value: 500, id: 2, owned: false},
    {name: "Night Fury", xp: 0, level: 1, range: 0.825, maxHit: 75, maxHP: 100, health: 100, value: 1000, id: 3, owned: false},
    {name: "Skrill", xp: 0, level: 1, range: 0.35, maxHit: 110, maxHP: 180, health: 180, id: 4, owned: false},
    {name: "Dev Dragon", xp: 0, level: 1, range: 0.825, maxHit: 500, maxHP: 1000000, health: 1000000, id: 5, owned: false},
];

let myDragon = dragons[0];
let gold = 20;
let mhPrice;
let monster;
let ki = 0;
let xpGained;
let goldGained;
let myHit;
let monsterHit;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const info = document.querySelector("#info");
const xpText = document.querySelector("#xpText");
const levelText = document.querySelector("#levelText");
const goldText = document.querySelector("#goldText");
const healthText = document.querySelector("#healthText");
const nameText = document.querySelector("#nameText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealth = document.querySelector("#monsterHealth");
const monsters = [
    {name: "Berserker Henchman", level: 2, range: 0.5, maxHit: 3, maxHP: 15, health: 15, id: 0},
    {name: "Berserker Guard", level: 10, range: 0.65, maxHit: 18, maxHP: 50, health: 50, id: 1},
    {name: "Dagurs Personal Guard", level: 20, range: 0.4, maxHit: 110, maxHP: 250, health: 250, id: 2},
    {name: "Dagur the Deranged", level: 50, range: 0.735, maxHit: 215, maxHP: 777, health: 777, id: 3},
];
const locations = [
    {name: "home",
    "button text": ["Travel to Berserk", "Shop", "Inventory"],
    "button functions": [goBerserk, goShop, goInventory],
    info: "You return to the town centre, where would you like to travel next."
    },
    {name: "shop",
    "button text": ["New dragon", "+10 Health (5 gold)", "Full heal (" + mhPrice + " gold)", "Home"],
    "button functions": [dragonShop, () => healDragon(1), () => healDragon(2), goHome],
    info: "You have entered the shop, what is it you wish to purchase",
    },
    {name: "shop inventory",
    "button text": ["Gronckle (" + dragons[1].value + " gold)", "Natterhead (" + dragons[2].value + " gold)", "Night Fury (" + dragons[3].value + " gold)", "Home"],
    "button functions": [ () => buyDragon(1), () => buyDragon(2), () => buyDragon(3), goHome],
    info: "You have entered the shop, what is it you wish to purchase",
    },
    {name: "beserker island",
    "button text": ["Enter the dungeon", "Challenge Dagur", "Home"],
    "button functions": [goDungeon, fightDagur, goHome],
    info: "You have landed on Berserker Island, are you prepared to face Dagur or must you defeat his men first."
    },
    {name: "inventory",
    "button text": ["Dragon Info", "Swap dragons", "Return home"],
    "button functions": [statCheck, swapDragon, goHome],
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
    info: ``
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
    "button text": [],
    "button functions": [],
    info: "Which dragon would you like to swap too."
    }
];

button1.onclick = goBerserk;
button2.onclick = goShop;
button3.onclick = goInventory;
updateStats()
function updateStats() {
    nameText.innerText = myDragon.name
    goldText.innerText = gold
    xpText.innerText = myDragon.xp
    levelText.innerText = myDragon.level
    healthText.innerText = myDragon.health + "/" + myDragon.maxHP
}

function updateLocation(locations) {
    monsterStats.style.display = "none"
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    button4.innerText = locations["button text"][3];
    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];
    button4.onclick = locations["button functions"][3];
    info.innerHTML = locations.info;
    updateStats()
};

function restart() {
    location.reload();
}

function goHome() {
    button2.style.display = "inline-block"
    button3.style.display = "inline-block"
    button4.style.display = "none"
    updateLocation(locations[0])
};

function goShop() {
    mhPrice = Math.ceil((myDragon.maxHP - myDragon.health) * 0.5)
    if (mhPrice == 0) {
        locations[1]["button text"][2] = "Full heal (0 Gold)"
    } else {
        locations[1]["button text"][2] = `Full heal (${mhPrice} Gold)`
    }
    updateLocation(locations[1])
    button4.style.display = "inline-block"
};

function dragonShop() {
    updateLocation(locations[2])
    button4.style.display = "inline-block"
};

function goBerserk() {
    updateLocation(locations[3])
};

function goInventory() {
    updateLocation(locations[4])
};

function swapDragon() {
    button4.style.display = "inline-block"
    checkForDragons(0)
    updateLocation(locations[9])
}

function buyDragon(selected) {
    if (dragons[selected].owned == false) {
        if (gold >= dragons[selected].value) {
            dragons[selected].owned = true
            gold -= dragons[selected].value
            myDragon = dragons[selected]
            info.innerText = `You have purchased the ${myDragon.name}.`
            updateStats()
        }  else {
            info.innerText = "You're broke, go make some money then come back here."
        }
    } else {
        info.innerText = "owww, you already own this dragon"
    }
}


function healDragon(size) {
    if (myDragon.health < myDragon.maxHP) {
        if (size == 1 && gold >= 10) {
            myDragon.health += 10
            gold -= 5
            goldText.innerText = gold
            if (myDragon.health >= myDragon.maxHP) {
            myDragon.health = myDragon.maxHP
            }
        } else if (size == 2 && gold >= mhPrice) {
            myDragon.health = myDragon.maxHP
            gold -= mhPrice
            goldText.innerText = gold
        }
        else {
            info.innerText = "You're broke, go make some money then come back here."
        }
     }
    else {
        info.innerText = "You're dragon is already fully healed and ready to battle"
    }
    healthText.innerText = myDragon.health + "/" + myDragon.maxHP
};

function goDungeon() {
    updateLocation(locations[5])
    if (myDragon.maxHit >= monsters[2].maxHit) {
        monster = monsters[getMonster(0, 2)]
    } else if (myDragon.maxHit >= monsters[1].maxHit) {
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

function getHitValue(power, range) {
    let minHit = Math.floor(power * range)
    return Math.floor(Math.random() * (power - minHit + 1)) + minHit

}

function attack() {
    monsterHit = getHitValue(monster.maxHit, monster.range)
    myHit = getHitValue(myDragon.maxHit, myDragon.range)
    info.innerText = `${monster.name} attacks for ${monsterHit} damage
    ${myDragon.name} deals ${myHit} damage.`
    myDragon.health -= monsterHit
    monster.health -= myHit + ki
    healthText.innerText = myDragon.health + "/" + myDragon.maxHP
    monsterHealth.innerText = monster.health
    ki = 0
    if (monster.health <= 0) {
        if (monster.id == 3) {
            updateLocation(locations[8])
        } else {
            xpGained = Math.floor(monster.maxHP * 3.5)
            goldGained = monster.level * 5
            myDragon.xp += xpGained
            gold += goldGained
            updateLocation(locations[6])
            checkForLevelup()
            info.innerText += `+${goldGained} Gold
            +${xpGained} XP\n`
            }
    }
    if (myDragon.health <= 0) {
        updateLocation(locations[7])
    }
};

function fightDagur() {
    updateLocation(locations[5])
    monster = monsters[3]
    monster.health = monster.maxHP
    monsterName.innerText = monster.name
    monsterHealth.innerText = monster.health
    monsterStats.style.display = "block"
    info.innerText = "Dagur: You will not stand in the way of my mission and I, move now or pay the price."
};

function charge() {
    info.innerText = `${monster.name} attacks for ${monster.maxHit} damage`
    info.innerText += "You charge your next attack to be even more lethal."
    myDragon.health -= monster.maxHit
    updateStats()
    monsterHealth.innerText = monster.health
    let attackMultiplier = Math.floor(Math.random() * (max - min + 1)) + min
    ki = Math.floor(myDragon.maxHit * attackMultiplier)
};

function checkForLevelup() {
    let nextLevelXP = xpCheck(myDragon.level + 1)
    let levels = 0
    while (myDragon.xp >= nextLevelXP) {
        myDragon.level++
        myDragon.maxHit += (myDragon.id + 1) * 5
        myDragon.maxHP += 15
        updateStats()
        levels++
        nextLevelXP = xpCheck(myDragon.level + 1)
        info.innerText = `${myDragon.name} has levelled up. +${levels}\n`;
    }
    
};

function xpCheck(level) {
    let totalXP = 0;
    for (let i = 1; i < level; i++) {
        totalXP += Math.floor(i + 100 * Math.pow(2, (i - 1) / 7));
    }
   let requiredXP = Math.floor(totalXP / 1.5);
   let xpLeft = requiredXP - myDragon.xp
   return requiredXP
}

function equipDragon(selected) {
    if (dragons[selected].owned === true) {
    myDragon = dragons[selected]
    info.innerText = "You have equipped " + myDragon.name
    } else {
        info.innerText = "You do not own this dragon"
    }
    updateStats()
}

function statCheck() {
    info.innerText = `Dragon Stats:
    Name: ${myDragon.name}
    Power: ${myDragon.maxHit}
    Level: ${myDragon.level}
    Health: ${myDragon.health}/${myDragon.maxHP}
    Next level up at ${xpCheck(myDragon.level + 1)}xp`
}

function checkForDragons(page) {
    let ownedDragons = dragons.filter(dragons => dragons.owned)
    let dragonsPerPage = 2
    let startIndex = page * dragonsPerPage
    let endIndex = startIndex + dragonsPerPage
    for (let i = 0; i < dragonsPerPage; i++) {
        if (startIndex + i < ownedDragons.length) {
            let dragon = dragons[i + startIndex]
            locations[9]["button text"][i] = `Equip ${dragon.name}`
            locations[9]["button functions"][i] = () => equipDragon(dragon.id)
        } else {
                 button2.style.display = "none"
            }
    }

    if (endIndex < ownedDragons.length) {

        locations[9]["button text"][2] = "Next page"
        locations[9]["button functions"][2] = () => checkForDragons(page + 1)
    } else {
        button3.style.display = "none"
    }
    locations[9]["button text"][3] = "Return home"
    locations[9]["button functions"][3] = goHome
    updateLocation(locations[9])
}





})