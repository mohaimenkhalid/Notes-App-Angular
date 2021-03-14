import { Component, OnInit } from '@angular/core';
import {Note} from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
      this.notes = this.notesService.getAll();
  }

  deleteNote = (id: number): void => {
    this.notesService.delete(id);
    this.router.navigateByUrl('/');
  }

}
