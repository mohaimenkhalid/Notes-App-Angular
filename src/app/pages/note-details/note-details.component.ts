import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Note} from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  note: Note;
  constructor(private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
    this.note = new Note();
  }

  onSubmit = (form: NgForm): void => {
    // save note
    this.notesService.add(form.value);
    this.router.navigateByUrl('/');
  }

  cancel = () => {
    this.router.navigateByUrl('/');
  }
}
