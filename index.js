function helpMe () {
    console.log('Create new pet: petName = new Tamagotchi(PetName,he|she)');
    console.log(
        'List of all properties of the pet: \n' +
        ['name','health','happiness','cleanliness','majesty','money','hydration'] + '\n' +
        'Usage: petName.getPropName() \n' +
        'Methods: ' +
        ['petName.feed(fastfood|organic)','petName.play()','petName.contest()','petName.giveADrink(water|soda)','petName.wash()'] + '\n' +
        'Look at register. It really matters.'
    );
}

function Tamagotchi (name, gender) {
    helpMe();
    this.name = name;
    this.gender = {
        nominative: gender,
        possessive: this.gender === 'he' ? 'his' : 'her'
    };

    var age = 0; // will determine the deathFactor - every year the possibility of death grows

    var health = 100;
    var happiness = 100;
    var satiety = 100;
    var hydration = 100;

    var cleanliness = 100;
    var majesty = 0; // this can be improved by winning contests

    var money = 500;

    // Define getters for private values
    this.getHealth = function () {
        return health;
    };
    this.getHappiness = function () {
        return happiness;
    };
    this.getSatiety = function () {
        return satiety;
    };
    this.getCleanliness = function () {
        return cleanliness;
    };
    this.getMajesty = function () {
        return majesty;
    };
    this.getMoney = function () {
        return money;
    };
    this.getHydration = function () {
        return hydration;
    };

    this.msg = '';

    var deathFactor = function () {
        return Number(Math.random().toFixed(3)) < (this.age * 0.001);
    };

    this.logStatus = function () {
        console.log(this.msg);
        console.log(
            this.name+'\'s current state: \n'
            + 'Money: $'+ this.getMoney() +'\n'
            + 'Health: '+ this.getHealth() +'\n'
            + 'Happiness: '+ this.getHappiness() +'\n'
            + 'Satiety: '+ this.getSatiety() +'\n'
            + 'Hydration level: '+ this.getHydration() +'\n'
            + 'Majesty: '+ this.getMajesty() +'\n'
            + 'Cleanliness: '+ this.getCleanliness() +'\n'
        );


        if (health <= 0)
            this.die('\'s immunity became zero. Flu killed '+ this.gender.possessive);
        if (happiness <= 0)
            this.die(' could not live in such a boredom. ' +
                this.gender.nominative+ ' jumped from a window.');
        if (satiety <= 0)
            this.die(' died of hunger.');
        if (hydration <= 0)
            this.die(' died of dehydration.');
        if (cleanliness <= 0)
            this.die(' died because of bacteries and microbes.');
        return this;
    };

    this.feed = function (foodType) {
        if (money <= 0) {
            this.msg = 'You have no money to feed' + this.name + ' \n' +
                'You can go for a majesty contest to win money';
            this.logStatus();
        } else {
            if (foodType === 'fastfood') {
                money -= 45;
                happiness += 20;
                satiety += 50;
                cleanliness -= 15;
                health -= 25;
                hydration -= 25;
                age += 0.5;
                this.msg = 'You bought ' + this.name + ' burger and soda for $45; \n'
                    + this.gender.nominative + ' got dirty and felt happy and sated, but '
                    + this.gender.possessive + ' health deteriorated.';
                this.logStatus();
            } else if (foodType === 'organic') {
                money -= 35;
                happiness -= 10;
                satiety += 25;
                health += 25;
                age += 0.5;
                this.msg = 'You bought ' + this.name + ' some broccoli and smoothie for $35; \n'
                    + this.gender.nominative + ' didn\'t like it a bit, but '
                    + this.gender.possessive + ' health significantly improved.';
                this.logStatus();
            } else helpMe();

            if (deathFactor()) {
                this.die('choked.');
                return;
            }
        }
        return this;
    };

    this.giveADrink = function (drink) {
        if (deathFactor())
            this.die(' fled. ')
      if (drink === 'water') {
          money -= 5;
          hydration += 25;
          this.msg = 'You gave ' + this.name + ' some water.';
          this.logStatus();
      } else if (drink === 'soda') {
          money -= 15;
          hydration += 15;
          happiness += 10;
          this.msg = 'You gave ' + this.name + ' some soda.';
          this.logStatus();
      } else helpMe();
      return this;
    };

    this.play = function () {
        age += 0.5;
        happiness += 40;
        satiety -= 35;
        cleanliness -= 25;
        hydration -= 50;
        this.msg = 'You played with' + this.name + ' in a park \n'
            + this.gender.nominative + ' felt happy, but '
            + 'got dirty and hungry.';
        this.logStatus();
        if (deathFactor()) {
            this.die('ran away.');
            return;
        }
        return this;
    };

    this.contest = function () {
        age += 0.5;
        satiety -= 50;
        hydration -= 25;
        cleanliness -= 40;
        if (deathFactor()) {
            this.die('was bitten by another contester. Reanimation did not help.');
            return;
        } else if (Math.random() < 0.35) {
            happiness += 20;
            majesty++;
            money += Math.round(majesty * (health + happiness + satiety + cleanliness) / 15);
            this.msg = this.name + ' have won the contest and earned $'+(happiness + satiety + cleanliness) / 10;

           this.logStatus();
            return this;
        } else {
            money -= 10;
            happiness -= 25;
            this.msg = this.name + ' did not win. You just lose $10 by making a bet.';
            this.logStatus();
            return this;
        }
    };

    this.wash = function () {
        money -= 5;
        cleanliness += 50;
        satiety -= 25;
        hydration -= 5;
        this.msg = 'You washed '+this.name;
        if (deathFactor()) {
            this.die('Soap got into eyes.');
            return;
        }
        this.logStatus();
        return this;
    };

    this.die = function (context) {
      console.log(this.name +' '+ context + ' Greenpeace is watching you.');
      eval('delete window["'+this.name.toLowerCase()+'"];');
      helpMe();
    };
}