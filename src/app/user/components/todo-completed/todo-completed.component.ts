import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenHelper } from 'src/app/helper/tokenHelper';
import { ToDo } from 'src/app/models/toDo';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-completed',
  templateUrl: './todo-completed.component.html',
  styleUrls: ['./todo-completed.component.css'],
})
export class TodoCompletedComponent implements OnInit {
  toDos: ToDo[] = [];
  tokenHelper: TokenHelper = new TokenHelper();
  dataLoaded: boolean = false;

  constructor(
    private toDoService: TodoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCompletedToDos();
  }

  getCompletedToDos() {
    let userId = this.tokenHelper.userId();
    this.toDoService.getUserToDos(userId).subscribe((response) => {
      response.data.forEach((toDo) => {
        this.dataLoaded = true;
        if (toDo.status === false) {
          this.toDos.push(toDo);
        }
      });
    });
  }
}