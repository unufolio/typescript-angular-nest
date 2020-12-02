import { Injectable } from '@nestjs/common';
import { Todo, TodoStatusEnum } from './todo.type';

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

@Injectable()
export class TodoService {
  public async getTodoList(status: TodoStatusEnum): Promise<Todo[]> {
    return todoList
      .filter((it: Todo) => {
        return !it.isDeleted;
      })
      .filter((it: Todo) => {
        if (status) {
          return it.status === status;
        } else {
          return true;
        }
      });
  }

  public async addTodo(todo: Todo) {
    todoList.push(todo);
  }

  public async deleteById(id: string) {
    todoList = todoList.filter((it: Todo) => !(it.id === id));
  }

  public async activateById(id: string) {
    todoList = todoList.map((it: Todo) => {
      if (it.id === id) {
        it.status = TodoStatusEnum.ACTIVE;
      }
      return it;
    });
  }

  public async cancelById(id: string) {
    todoList = todoList.map((it: Todo) => {
      if (it.id === id) {
        it.status = TodoStatusEnum.CANCELED;
      }
      return it;
    });
  }

  public async finishById(id: string) {
    todoList = todoList.map((it: Todo) => {
      if (it.id === id) {
        it.status = TodoStatusEnum.COMPLETED;
      }
      return it;
    });
  }
}
