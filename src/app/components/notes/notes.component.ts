import { Component } from "@angular/core"

interface Note {
  title: string
  description: string
  label?: string
}

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
  standalone: false,
})
export class NotesComponent {
  isExpanded = false
  newNote = { title: '', description: '' }
  notes: Note[] = [
    // Sample data
    { 
      title: 'First Note', 
      description: 'This is my first note',
      label: 'Personal'
    },
    { 
      title: 'Meeting Notes', 
      description: 'Discussion about project timeline'
    }
  ]

  saveNote() {
    if (this.newNote.title || this.newNote.description) {
      this.notes.push({
        title: this.newNote.title,
        description: this.newNote.description
      })
      // Reset form
      this.newNote = { title: '', description: '' }
      this.isExpanded = false
    }
  }
}
