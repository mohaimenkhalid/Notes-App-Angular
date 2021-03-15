import {Component, OnInit} from '@angular/core';
import {Note} from '../../shared/note.model';
import {NotesService} from '../../shared/notes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();
  noteCount;
  constructor(private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
      this.notes = this.notesService.getAll();
      this.filteredNotes = this.notes;
      this.checkNoteIsEmpty();
  }

  deleteNote = (note: Note): void => {
    const noteId = this.notesService.getId(note);
    this.notesService.delete(noteId);
    this.router.navigateByUrl('/');
    this.filteredNotes = this.notesService.getAll();
    this.checkNoteIsEmpty();
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
    this.checkNoteIsEmpty();

    this.sortByRelevancy(allResults);
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

  sortByRelevancy = (searchResult: Note[]) => {
    const noteCountObj: object = {};
    searchResult.forEach(note => {
      const noteId = this.notesService.getId(note);
      if (noteCountObj[noteId]) {
        noteCountObj[noteId] += 1;
      } else {
        noteCountObj[noteId] = 1;
      }
    });

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      const aId = this.notesService.getId(a);
      const bId = this.notesService.getId(b);

      const aCount = noteCountObj[aId];
      const bCount = noteCountObj[bId];

      return bCount - aCount;
    });
  }

  checkNoteIsEmpty = () => {
    this.noteCount = this.filteredNotes.length > 0;
    console.log(this.noteCount);
  }

  generateLink = (note: Note) => {
    return this.notesService.getId(note);
  }

}
