class Character {
    constructor(name, health, power) {
        this._name = name;
        this._health = health;
        this._power = power;
    }

    get name() { return this._name; }
    set name(value) { this._name = value; }

    get health() { return this._health; }
    set health(value) {
        if (typeof value !== 'number') {
            throw new TypeError('Health must be a number');
        }
        this._health = value;
    }

    get power() { return this._power; }
    set power(value) {
        if (typeof value !== 'number') {
            throw new TypeError('Power must be a number');
        }
        this._power = value;
    }

    describe() {
        return `${this._name} | HP: ${this._health} | Power: ${this._power}`;
    }

    static battle(a, b) {
        const scoreA = (a instanceof Mage) ? a.castSpell() : a.attack();
        const scoreB = (b instanceof Mage) ? b.castSpell() : b.attack();

        if (scoreA > scoreB) return `Winner: ${a.name}`;
        if (scoreB > scoreA) return `Winner: ${b.name}`;
        return "It's a draw!";
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'number') return this._health;
        return this.describe();
    }
}

class Warrior extends Character {
    constructor(name, health, power) {
        super(name, health, power);
        this._shield = 0;
    }

    get shield() { return this._shield; }
    set shield(value) {
        if (typeof value !== 'number') throw new TypeError('Shield must be a number');
        this._shield = value;
    }

    attack() {
        return this.power + (this._shield / 2);
    }
}

class Mage extends Character {
    constructor(name, health, power) {
        super(name, health, power);
        this._mana = 0;
    }

    get mana() { return this._mana; }
    set mana(value) {
        if (typeof value !== 'number') throw new TypeError('Mana must be a number');
        this._mana = value;
    }

    castSpell() {
        if (this._mana > 0) {
            return this.power * 2;
        }
        return 0;
    }
}

// Yoxlama ssenarisi
const g = new Mage('Gandalf', 80, 40);
g.mana = 10;
const a = new Warrior('Aragorn', 100, 30);
a.shield = 20;

console.log(Character.battle(g, a));
console.log(`${a}`, +g);
