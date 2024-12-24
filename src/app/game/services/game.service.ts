import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private colors: string[] = ['red', 'blue', 'green', 'yellow'];
  private sequence: string[] = [];

  constructor() { }

  initGame() {
    this.sequence = [];
  }

  getNextSequence(): string[] {
    this.sequence.push(this.getRandomColor());
    return [...this.sequence];
  }

  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  checkSequence(playerSequence: string[], gameSequence: string[]): boolean {
    if (playerSequence.length !== gameSequence.length) {
      return false;
    }
    return playerSequence.every((color, index) => color === gameSequence[index]);
  }
}

