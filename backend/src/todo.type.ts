export interface Todo {
  id: string;
  name: string;
  status: TodoStatusEnum;
  createAt: Date;
  updateAt: Date;
  isDeleted: boolean;
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
