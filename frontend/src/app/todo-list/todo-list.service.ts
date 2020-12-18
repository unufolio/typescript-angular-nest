import {Injectable} from '@angular/core';
import {Todo, TodoStatusEnum} from './todo.type';
import {v4 as UuidV4} from 'uuid';
import {HttpClient} from '@angular/common/http';
import {ArrayResultEntity, ResultEntity} from './result-entity';
import {NzTableVirtualScrollDirective} from 'ng-zorro-antd/table';
import { EMPTY, Observable, of } from 'rxjs';

let todoList: Todo[] = [];

// @Injectable()
// export class TodoListService {
//   public getTodoList(status: TodoStatusEnum): Observable<Todo[]> {
//     switch (status) {
//       case TodoStatusEnum.INACTIVE:
//         status = TodoStatusEnum.INACTIVE;
//         break;
//       case TodoStatusEnum.ACTIVE:
//         status = TodoStatusEnum.ACTIVE;
//         break;
//       case TodoStatusEnum.COMPLETED:
//         status = TodoStatusEnum.COMPLETED;
//         break;
//       case TodoStatusEnum.CANCELED:
//         status = TodoStatusEnum.CANCELED;
//         break;
//       default:
//         status = null;
//     }
//     return of(todoList
//       .filter((it: Todo) => {
//         return !it.isDeleted;
//       })
//       .filter((it: Todo) => {
//         if (status) {
//           return it.status === status;
//         } else {
//           return true;
//         }
//       }));
//   }
//
//   public addTodo(name: string): Observable<any> {
//     const todo: Todo = {
//       id: UuidV4(),
//       name,
//       status: TodoStatusEnum.INACTIVE,
//       createAt: new Date(),
//       updateAt: new Date(),
//       isDeleted: false
//     };
//     todoList.push(todo);
//     return EMPTY;
//   }
//
//   public deleteById(id: string): Observable<any> {
//     todoList = todoList.filter((it: Todo) => !(it.id === id));
//     return EMPTY;
//   }
//
//   public activateById(id: string): Observable<any> {
//     todoList = todoList.map((it: Todo) => {
//       if (it.id === id) {
//         it.status = TodoStatusEnum.ACTIVE;
//       }
//       return it;
//     });
//     return EMPTY;
//   }
//
//   public cancelById(id: string): Observable<any> {
//     todoList = todoList.map((it: Todo) => {
//       if (it.id === id) {
//         it.status = TodoStatusEnum.CANCELED;
//       }
//       return it;
//     });
//     return EMPTY;
//   }
//
//   public finishById(id: string): Observable<any> {
//     todoList = todoList.map((it: Todo) => {
//       if (it.id === id) {
//         it.status = TodoStatusEnum.COMPLETED;
//       }
//       return it;
//     });
//     return EMPTY;
//   }
// }

const baseUrl = 'http://localhost:3000';

@Injectable()
export class TodoListService {

  constructor(private httpClient: HttpClient) {
  }

  public getTodoList(status: TodoStatusEnum): Observable<ArrayResultEntity<Todo>> {
    return this.httpClient.get(baseUrl + '/todos');
  }

  public addTodo(name: string): Observable<ResultEntity<Todo>> {
    const body = {name};
    return this.httpClient.post(baseUrl + '/todos', body);
  }

  public deleteById(id: string): Observable<ResultEntity<any>> {
    return this.httpClient.delete(baseUrl + '/todos/' + id);
  }

  public activateById(id: string): Observable<ResultEntity<any>> {
    return this.httpClient.patch(baseUrl + '/todos/' + id + '/activate', null);
  }

  public cancelById(id: string): Observable<ResultEntity<any>> {
    return this.httpClient.patch(baseUrl + '/todos/' + id + '/cancel', null);
  }

  public finishById(id: string): Observable<ResultEntity<any>> {
    return this.httpClient.patch(baseUrl + '/todos/' + id + '/finish', null);
  }
}
