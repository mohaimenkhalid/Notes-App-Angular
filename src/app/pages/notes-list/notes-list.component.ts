import {Component, OnInit} from '@angular/core';
import {Note} from '../../shared/note.model';
import {NotesService} from '../../shared/notes.service';
import {Router} from '@angular/router';
import {all} from 'codelyzer/util/function';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
      this.notes = this.notesService.getAll();
      this.filteredNotes = this.notes;
  }

  deleteNote = (id: number): void => {
    this.notesService.delete(id);
    this.router.navigateByUrl('/');
  }

  filter = (query: string) => {
    query = query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();
    let terms: string[] = query.split(' ');
    terms = this.removeDuplicates(terms);
    terms.forEach(element => {
      const results = this.relevantNotes(element);
      allResults  = [...allResults, ...results];
    });
    const uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
  }

  removeDuplicates = (arr: Array<any>): Array<any> => {
    const uniqueResults: Set<any> = new Set<any>();
    arr.forEach(item => uniqueResults.add(item));
    return Array.from(uniqueResults);
  }

  relevantNotes = (query: string): Array<Note> => {
    query = query.toLowerCase().trim();
    return this.notes.filter(note => {
      return note.body.toLowerCase().includes(query) || note.title.toLowerCase().includes(query);
    });
  }

}
