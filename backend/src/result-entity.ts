export class ResultEntity<T> {
  constructor(
    public content: Content<T>,
    public success?: boolean,
    public errorMsg?: string,
    public errorCode?: number,
    public errorCtx?: any,
  ) {
    this.success = true;
    if (success != null) {
      this.success = success;
    }
  }
}

export abstract class Content<T> {}

export class PageContent<T> extends Content<T> {
  constructor(
    public currentPage: number,
    public pageSize: number,
    public totalCount: number,
    public pages: number,
    public data: T[],
  ) {
    super();
  }
}

export class ArrayContent<T> extends Content<T> {
  constructor(public data: T[]) {
    super();
  }
}

export class DataContent<T> extends Content<T> {
  constructor(public data: T) {
    super();
  }
}
