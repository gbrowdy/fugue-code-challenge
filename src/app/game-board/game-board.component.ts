import {Component, OnDestroy, OnInit} from '@angular/core';
import {Card} from "../models/Card";

const IMAGE_URL_BASE = 'https://s3-us-west-2.amazonaws.com/fugue-code-tests/fe-image-test/';
const A = 'a';
const B = 'b';


/* Credit: https://stackoverflow.com/a/12646864/5794076 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
}


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy {

  public cards: Card[] = Array.from({length: 4}, () => <Card>{src: '', correct: false});
  public points: number = 0;
  public round: number = 0;
  public timer: number = 30;
  public loading: boolean = false;
  public clicked: boolean = false;
  public gameStarted: boolean = false;

  private _interval;
  private _imageOrder: number[] = Array.from({length: 10}, (value, index) => index);
  private _loadedRounds: number = 0;
  private _images: any = {};


  public checkCard(card: Card) {
    this.clicked = true;
    if (card.correct) {
      this.points += this.timer;
    }
    clearInterval(this._interval);
  }

  public startNewGame() {
    this.gameStarted = false;
    this.loading = true;
    shuffleArray(this._imageOrder);
    this._loadedRounds = 0;
    this.gameStarted = true;
    this._loadImages(this._imageOrder[this._loadedRounds]);
    this.round = 0;
  }

  public nextRound() {
    if (this.round < 5) {
      if (this._loadedRounds >= this.round + 1) {
        this.round += 1;
        this.getCards();
        this.loading = false;
        this.clicked = false;
        this.startTimer();
      }
      else {
        this.loading = true;
      }
    }
  }

  private _loadImages(index) {
    this._images[index] = {a: {loaded: false}, b: {loaded: false}};
    for (let letter of Array.from('ab')) {
      this._images[index][letter].img = new Image();
      this._images[index][letter].img.onload = () => this._imageLoaded(index, letter);
      this._images[index][letter].img.src = `${IMAGE_URL_BASE}0${index}-${letter}.jpg`;
    }
  }

  private _imageLoaded(index, letter) {
    this._images[index][letter].loaded = true;
    if (this._images[index].a.loaded && this._images[index].b.loaded && this._loadedRounds < 9) {
      this._loadedRounds += 1;
      this._loadImages(this._imageOrder[this._loadedRounds]);
    }
    if (this.loading && this._loadedRounds >= this.round + 1) {
      this.nextRound();
    }
  }

  private startTimer() {
    this.timer = 30;
    this._interval = setInterval(() => {
      this.timer > 0 ? this.timer -= 1 : this.timer = 0;
    }, 1000);
  }

  private getCards() {
    const correctLetter = Math.floor(Math.random() * 2) ? A : B;
    const incorrectLetter = correctLetter === A ? B : A;
    const correctCardIndex = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
      const correct = i === correctCardIndex;
      let src = `${IMAGE_URL_BASE}0${this._imageOrder[this.round - 1]}`;
      src = correct ? `${src}-${correctLetter}.jpg` : `${src}-${incorrectLetter}.jpg`;
      this.cards[i] = {src, correct};
    }

  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

}
