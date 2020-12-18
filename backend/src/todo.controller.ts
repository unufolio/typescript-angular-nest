import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import {
  CreateTodoDTO,
  TodoQuery,
  TodoQueryParam,
  Todo,
  TodoStatusEnum,
} from './todo.type';
import { Response } from 'express';
import { ArrayContent, DataContent, ResultEntity } from './result-entity';
import { v4 as UuidV4 } from 'uuid';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  public async createTodo(
    @Body() createTodoDTO: CreateTodoDTO,
    @Res() res: Response,
  ) {
    const todo: Todo = {
      id: UuidV4(),
      name: createTodoDTO.name,
      status: TodoStatusEnum.INACTIVE,
      createAt: new Date(),
      updateAt: new Date(),
      isDeleted: false,
    };
    await this.todoService.addTodo(todo);
    res.status(HttpStatus.OK).json(new ResultEntity(new DataContent(todo)));
  }

  @Get()
  public getTodoList(@Query() query: TodoQuery, @Res() res: Response) {
    let status;
    switch (Number(query.status)) {
      case TodoStatusEnum.INACTIVE:
        status = TodoStatusEnum.INACTIVE;
        break;
      case TodoStatusEnum.ACTIVE:
        status = TodoStatusEnum.ACTIVE;
        break;
      case TodoStatusEnum.COMPLETED:
        status = TodoStatusEnum.COMPLETED;
        break;
      case TodoStatusEnum.CANCELED:
        status = TodoStatusEnum.CANCELED;
        break;
      default:
        status = null;
    }
    this.todoService.getTodoList(status).subscribe((todoList: Todo[]) => {
      res
        .status(HttpStatus.OK)
        .json(new ResultEntity(new ArrayContent(todoList)));
    });
  }

  @Delete(':id')
  public delete(@Param() params, @Res() res: Response) {
    this.todoService.deleteById(params.id).subscribe();
    res.status(HttpStatus.OK).json(new ResultEntity(null));
  }

  @Patch(':id/activate')
  public activate(@Param() params: TodoQueryParam, @Res() res: Response) {
    this.todoService.activateById(params.id).subscribe();
    res.status(HttpStatus.OK).json(new ResultEntity(null));
  }

  @Patch(':id/finish')
  public async finish(@Param() params, @Res() res: Response) {
    this.todoService.finishById(params.id).subscribe();
    res.status(HttpStatus.OK).json(new ResultEntity(null));
  }

  @Patch(':id/cancel')
  public async cancel(@Param() params, @Res() res: Response) {
    this.todoService.cancelById(params.id).subscribe();
    res.status(HttpStatus.OK).json(new ResultEntity(null));
  }
}
