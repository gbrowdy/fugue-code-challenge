import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../models/Card";

@Component({
  selector: 'app-difference-card',
  templateUrl: './difference-card.component.html',
  styleUrls: ['./difference-card.component.scss']
})
export class DifferenceCardComponent implements OnInit {

  @Input() card: Card;
  @Input() wrongClick: boolean = false;
  @Input() rightClick: boolean = false;
  @Input() disabled: boolean = false;

  @Output() imageChosen = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
