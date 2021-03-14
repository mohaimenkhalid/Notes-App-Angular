import {Injectable} from '@angular/core';
import {Note} from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: Note[] = new Array <Note>();
  constructor() { }

  getAll = (): Note[] => {
    return this.notes;
  }

  get = (id: number): Note => {
    return this.notes[id];
  }

  getId = (note: Note): number => {
    return  this.notes.indexOf(note);
  }

  add = (note: Note): number => {
    const newLength = this.notes.push(note);
    return newLength - 1;
  }

  update = (id: number, title: string, body: string): void => {
    const note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  delete = (id: number): void => {
    this.notes.splice(id, 1);
  }
}
