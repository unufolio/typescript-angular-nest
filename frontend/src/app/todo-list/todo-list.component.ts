import {Component, OnInit} from '@angular/core';
import {Todo} from './todo.type';
import {TodoListService} from './todo-list.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArrayResultEntity, ResultEntity} from './result-entity';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less']
})
export class TodoListComponent implements OnInit {

  formGroup: FormGroup;

  public todoList: Todo[] = [];

  constructor(private todoListService: TodoListService, private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      todoName: [null, [Validators.required]],
    });
    this.loadTodoList();
  }

  public loadTodoList(): void {
    // this.todoList = this.todoListService.getTodoList(null);
    this.todoListService.getTodoList(null).subscribe((res: ArrayResultEntity<Todo>) => {
      if (res.success){
        this.todoList = res.content.data;
      }
    });
  }

  public onSubmit($event): void {
    if (this.formGroup.valid) {
      const todoName = this.formGroup.get('todoName').value;
      this.todoListService.addTodo(todoName).subscribe((res: ResultEntity<any>) => {
        if (res.success){
          this.loadTodoList();
        }
      });
    }
  }

  public onCancel(id: string): void {
    this.todoListService.cancelById(id).subscribe((res: ResultEntity<any>) => {
      if (res.success){
        this.loadTodoList();
      }
    });
  }

  public onFinish(id: string): void {
    this.todoListService.finishById(id).subscribe((res: ResultEntity<any>) => {
      if (res.success){
        this.loadTodoList();
      }
    });
  }

  public onActivate(id: string): void {
    this.todoListService.activateById(id).subscribe((res: ResultEntity<any>) => {
      if (res.success){
        this.loadTodoList();
      }
    });
  }

  public onDelete(id: string): void {
    this.todoListService.deleteById(id).subscribe((res: ResultEntity<any>) => {
      if (res.success){
        this.loadTodoList();
      }
    });
  }
}
