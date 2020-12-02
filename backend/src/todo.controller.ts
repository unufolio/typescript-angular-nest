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
import { CreateTodoDTO, Todo, TodoStatusEnum } from './todo.type';
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
  public async getTodoList(@Query() query, @Res() res: Response) {
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
    await this.todoService.getTodoList(status).then((todoList: Todo[]) => {
      res
        .status(HttpStatus.OK)
        .json(new ResultEntity(new ArrayContent(todoList)));
    });
  }

  @Delete(':id')
  public async delete(@Param() params, @Res() res: Response) {
    await this.todoService.deleteById(params.id);
    res.status(HttpStatus.OK).json(new ResultEntity(null));
  }

  @Patch(':id/activate')
  public async activate(@Param() params, @Res() res: Response) {
    await this.todoService.activateById(params.id);
    res.status(HttpStatus.OK).json(new ResultEntity(null));
  }

  @Patch(':id/finish')
  public async finish(@Param() params, @Res() res: Response) {
    await this.todoService.finishById(params.id);
    res.status(HttpStatus.OK).json(new ResultEntity(null));
  }

  @Patch(':id/cancel')
  public async cancel(@Param() params, @Res() res: Response) {
    await this.todoService.cancelById(params.id);
    res.status(HttpStatus.OK).json(new ResultEntity(null));
  }
}
