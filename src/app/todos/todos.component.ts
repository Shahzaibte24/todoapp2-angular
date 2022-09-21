import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/Todo';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [] ;
  showValidationErrors!: boolean
  constructor(private dtServieces: DataService, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.todos = this.dtServieces.getAllTodos() ;
  }

  onFormSubmit( form: NgForm ) {
    if (form.invalid) {
        this.showValidationErrors = true ;
    } else {
      this.dtServieces.addTodo( {title: form.value.title} ) ;
      this.showValidationErrors = false
    }
    form.reset();
  }
  toggleCompleted( todo: Todo ) {
    todo.completed = !todo.completed ;
  }
  editTodo( todo: Todo ) {
    const index = this.todos.indexOf( todo ) ;
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dtServieces.updateTodo(index, result)
      }
    })

  }
  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.dtServieces.deleteTodo(index)
  }

}
