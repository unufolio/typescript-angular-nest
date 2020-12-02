export interface Todo {
  id: string;
  name: string;
  status: TodoStatusEnum;
  createAt: Date;
  updateAt: Date;
  isDeleted: boolean;
}

export enum TodoStatusEnum {
  INACTIVE,
  ACTIVE,
  COMPLETED,
  CANCELED,
}
