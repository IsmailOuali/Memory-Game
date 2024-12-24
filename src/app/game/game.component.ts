import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('buttonState', [
      state('inactive', style({
        backgroundColor: '{{color}}',
        transform: 'scale(1)'
      }), { params: { color: '#ccc' } }),
      state('active', style({
        backgroundColor: '{{color}}',
        transform: 'scale(1.1)'
      }), { params: { color: '#ccc' } }),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class GameComponent implements OnInit {
  colors: string[] = ['red', 'blue', 'green', 'yellow'];
  sequence: string[] = [];
  playerSequence: string[] = [];
  showingSequence = false;
  gameStarted = false;
  level = 1;
  score = 0;
  timeLeft = 15;
  timerInterval: any;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.initGame();
  }

  startGame() {
    this.gameStarted = true;
    this.nextLevel();
  }

  nextLevel() {
    this.level++;
    this.sequence = this.gameService.getNextSequence();
    this.showSequence();
  }

  showSequence() {
    this.showingSequence = true;
    let i = 0;
    const interval = setInterval(() => {
      if (i < this.sequence.length) {
        this.activateButton(this.sequence[i]);
        i++;
      } else {
        clearInterval(interval);
        this.showingSequence = false;
        this.startTimer();
      }
    }, 1000);
  }

  activateButton(color: string) {
    const button = document.getElementById(color);
    button?.classList.add('active');
    setTimeout(() => button?.classList.remove('active'), 500);
  }

  startTimer() {
    this.timeLeft = 15;
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.endGame();
      }
    }, 1000);
  }

  playerClick(color: string) {
    if (!this.showingSequence && this.gameStarted) {
      this.playerSequence.push(color);
      this.activateButton(color);
    }
  }

  validateSequence() {
    if (this.gameService.checkSequence(this.playerSequence, this.sequence)) {
      this.score += this.calculateScore();
      this.playerSequence = [];
      clearInterval(this.timerInterval);
      this.nextLevel();
    } else {
      this.endGame();
    }
  }

  resetChoice() {
    this.playerSequence = [];
  }

  calculateScore(): number {
    return Math.round((this.level * 10) * (this.timeLeft / 15));
  }

  endGame() {
    clearInterval(this.timerInterval);
    this.gameStarted = false;
    alert(`Game Over! Your final score is ${this.score}`);
    this.gameService.initGame();
    this.level = 1;
    this.score = 0;
    this.sequence = [];
    this.playerSequence = [];
  }
}

