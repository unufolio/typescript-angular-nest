import {Injectable} from '@angular/core';
import {Todo, TodoStatusEnum} from './todo.type';
import {v4 as UuidV4} from 'uuid';
import {HttpClient} from '@angular/common/http';
import {ArrayResultEntity, ResultEntity} from './result-entity';
import {NzTableVirtualScrollDirective} from 'ng-zorro-antd/table';
import {Observable} from 'rxjs';

let todoList: Todo[] = [
  {
    id: '2f204328-12f7-4812-9027-61460727034c',
    name: '吃饭',
    status: TodoStatusEnum.ACTIVE,
    createAt: new Date(),
    updateAt: new Date(),
    isDeleted: false,
  },
  {
    id: '7303356d-8fe7-4d04-8fa3-73b37a0b81af',
    name: '睡觉',
    status: TodoStatusEnum.INACTIVE,
    createAt: new Date(),
    updateAt: new Date(),
    isDeleted: false,
  },
  {
    id: '77d18bc1-5fa4-4804-a506-5c5b0994a150',
    name: '打豆豆',
    status: TodoStatusEnum.INACTIVE,
    createAt: new Date(),
    updateAt: new Date(),
    isDeleted: false,
  },
  {
    id: '470040db-a438-4b38-bc73-6a30200cd842',
    name: '取消的 TODO',
    status: TodoStatusEnum.CANCELED,
    createAt: new Date(),
    updateAt: new Date(),
    isDeleted: false,
  },
];

// @Injectable()
// export class TodoListService {
//   public getTodoList(status: TodoStatusEnum): Todo[] {
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
//     return todoList
//       .filter((it: Todo) => {
//         return !it.isDeleted;
//       })
//       .filter((it: Todo) => {
//         if (status) {
//           return it.status === status;
//         } else {
//           return true;
//         }
//       });
//   }
//
//   public addTodo(name: string): void {
//     const todo: Todo = {
//       id: UuidV4(),
//       name,
//       status: TodoStatusEnum.INACTIVE,
//       createAt: new Date(),
//       updateAt: new Date(),
//       isDeleted: false
//     };
//     todoList.push(todo);
//   }
//
//   public deleteById(id: string): void {
//     todoList = todoList.filter((it: Todo) => !(it.id === id));
//   }
//
//   public activateById(id: string): void {
//     todoList = todoList.map((it: Todo) => {
//       if (it.id === id) {
//         it.status = TodoStatusEnum.ACTIVE;
//       }
//       return it;
//     });
//   }
//
//   public cancelById(id: string): void {
//     todoList = todoList.map((it: Todo) => {
//       if (it.id === id) {
//         it.status = TodoStatusEnum.CANCELED;
//       }
//       return it;
//     });
//   }
//
//   public finishById(id: string): void {
//     todoList = todoList.map((it: Todo) => {
//       if (it.id === id) {
//         it.status = TodoStatusEnum.COMPLETED;
//       }
//       return it;
//     });
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
