class WhackAMole{

    constructor() {
        this.holes = document.querySelectorAll('.hole');
        this.scoreBoard = document.querySelector('.score');
        this.moles = document.querySelectorAll('.mole');
        this.btn = document.getElementById('btn');
        this.timeUp = false;
        this.score = 0;
        this.lastHole;
    }

    randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    randomHole() {
        const hole = this.holes[Math.floor(Math.random() * this.holes.length)];
        if (hole === this.lastHole) {
          return this.randomHole(this.holes);
        }
        this.lastHole = hole;
        return hole;
    }

    peep() {
        const time = this.randomTime(300, 1300);
        const hole = this.randomHole(this.holes);
        let that = this;
        hole.classList.add('up');
        setTimeout(() => {
          hole.classList.remove('up');
          if (!that.timeUp) this.peep();
        }, time);
    }

    startGame(event) {
        this.scoreBoard.textContent = 0;
        this.timeUp = false;
        this.score = 0;
        let that = this;
        this.peep();
        setTimeout(() => {
            that.timeUp = true;
        }, 15000);
    }

    bonk(event){
        if(!event.isTrusted) return;
        this.score++;
        event.path[1].classList.remove('up');
        this.scoreBoard.textContent = this.score;
    }

    init(){
        this.btn.addEventListener('click' ,(event) => this.startGame(event));
        this.moles.forEach(mole => mole.addEventListener('click',(event) => this.bonk(event)));
    }
}

new WhackAMole().init();