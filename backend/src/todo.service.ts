import { Injectable } from '@nestjs/common';
import { Todo, TodoStatusEnum } from './todo.type';
import { EMPTY, Observable, of } from 'rxjs';

let todoList: Todo[] = [];

@Injectable()
export class TodoService {
  public getTodoList(status: TodoStatusEnum): Observable<Todo[]> {
    return of(
      todoList
        .filter((it: Todo) => {
          return !it.isDeleted;
        })
        .filter((it: Todo) => {
          if (status) {
            return it.status === status;
          } else {
            return true;
          }
        }),
    );
  }

  public addTodo(todo: Todo): Observable<any> {
    todoList.push(todo);
    return EMPTY;
  }

  public deleteById(id: string): Observable<any> {
    todoList = todoList.filter((it: Todo) => !(it.id === id));
    return EMPTY;
  }

  public activateById(id: string): Observable<any> {
    todoList = todoList.map((it: Todo) => {
      if (it.id === id) {
        it.status = TodoStatusEnum.ACTIVE;
      }
      return it;
    });
    return EMPTY;
  }

  public cancelById(id: string): Observable<any> {
    todoList = todoList.map((it: Todo) => {
      if (it.id === id) {
        it.status = TodoStatusEnum.CANCELED;
      }
      return it;
    });
    return EMPTY;
  }

  public finishById(id: string): Observable<any> {
    todoList = todoList.map((it: Todo) => {
      if (it.id === id) {
        it.status = TodoStatusEnum.COMPLETED;
      }
      return it;
    });
    return EMPTY;
  }
}
