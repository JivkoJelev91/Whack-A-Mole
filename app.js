class WhackAMole{
    constructor() {
        this.holes = document.querySelectorAll('.hole');
        this.scoreBoard = document.querySelector('.score');
        this.moles = document.querySelectorAll('.mole');
        this.btnStart = document.getElementById('btnStart');
        this.timeUp = false;
        this.lastHighestScore = 0;
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
        hole.classList.add('up');
        setTimeout(() => {
          hole.classList.remove('up');
          if (!this.timeUp) this.peep();
        }, time);
    }

    startGame(event) {
        this.scoreBoard.textContent = 0;
        this.timeUp = false;
        this.score = 0;
        this.peep();
        setTimeout(() => {
            this.timeUp = true;
            if(this.timeUp){
                localStorage.setItem('bestScore', JSON.stringify(this.score));
                this.renderBestScores();
            }
        }, 15000);
    }

    bonk(event){
        if(!event.isTrusted) return;
        this.score++;
        event.target.classList.remove('up');
        this.scoreBoard.textContent = this.score;
    }

    renderBestScores(){
        let highestScore = JSON.parse(localStorage.getItem('bestScore'));
        if(this.lastHighestScore < highestScore) this.lastHighestScore = highestScore;
            document.getElementById('bestResult').innerHTML = `
               <ul> 
                    <li class="scores">
                        <span>Highest score -</span> 
                        <span style="${this.lastHighestScore > 10 ? 'color: red': 'color: black'}">
                            ${this.lastHighestScore || 0}
                        </span>
                    </li>
               </ul>
            `;
    }

    init(){
        this.btnStart.addEventListener('click' ,(event) => this.startGame(event));
        this.moles.forEach(mole => mole.addEventListener('click',(event) => this.bonk(event)));
        this.renderBestScores();
    }
}

new WhackAMole().init();