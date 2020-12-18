export interface Todo {
  id: string;
  name: string;
  status: TodoStatusEnum;
  createAt: Date;
  updateAt: Date;
  isDeleted: boolean;
}

export interface TodoQueryParam {
  id: string;
}

export interface TodoQuery {
  status: string;
}

export class Todo {
  constructor(
    public id: string,
    public name: string,
    public status: TodoStatusEnum,
    public createAt: Date,
    public updateAt: Date,
    public isDeleted: boolean,
  ) {}
}

export class CreateTodoDTO {
  constructor(public name: string) {}
}

export enum TodoStatusEnum {
  INACTIVE,
  ACTIVE,
  COMPLETED,
  CANCELED,
}
