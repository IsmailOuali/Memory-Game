import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  template: `
    <div
      class="score-container"
      [@scoreChange]="scoreState"
      (@scoreChange.done)="resetScoreState()"
    >
      <div class="score-item">
        <span class="label">Score:</span>
        <span class="value">{{ score }}</span>
      </div>
      <div class="score-item">
        <span class="label">Niveau:</span>
        <span class="value">{{ level }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./score.component.css'],
  animations: [
    trigger('scoreChange', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'changed',
        style({
          transform: 'scale(1.2)',
          backgroundColor: '#ffd700',
        })
      ),
      transition('normal <=> changed', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class ScoreComponent {
  @Input() score: number = 0;
  @Input() level: number = 1;

  scoreState = 'normal';

  ngOnChanges() {
    this.scoreState = 'changed';
  }

  resetScoreState() {
    this.scoreState = 'normal';
  }
}
