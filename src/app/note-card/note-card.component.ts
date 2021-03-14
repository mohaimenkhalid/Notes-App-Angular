import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;
  // tslint:disable-next-line:variable-name
  @Input() viewLink: string;
  constructor() { }

  ngOnInit(): void {
  }

}
