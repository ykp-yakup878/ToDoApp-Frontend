import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CryptoHelper } from 'src/app/helper/cryptoHelper';
import { ToDo } from 'src/app/models/toDo';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  toDo: ToDo;
  cryptoHelper: CryptoHelper = new CryptoHelper();
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private toDoService: TodoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getToDo(params['Id']);
    });
  }

  getToDo(Id: number) {
    let decodeId = +this.cryptoHelper.decrypted(Id.toString());
    this.toDoService.getToDo(decodeId).subscribe((response) => {
      this.toDo = response.data;
      response.data.status === false
        ? this.toastrService.info('', "Bu ToDo'yu Tamamladın")
        : null;
    });
  }
  toDoCompleted() {
    this.toDo.status = false;
    this.toDoService.toDoUpdate(this.toDo).subscribe(
      (response) => {
        this.toastrService.success('', 'ToDo Tamamlandı ;)');
        setTimeout(() => {
          window.location.reload();
        }, 1250);
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }
}
