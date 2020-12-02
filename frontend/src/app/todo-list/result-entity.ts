export interface ResultEntity<T> {
  content?: DataContent<T>;
  success?: boolean;
  errorMsg?: string;
  errorCode?: number;
  errorCtx?: any;
}

export interface PageResultEntity<T> {
  content?: PageContent<T>;
  success?: boolean;
  errorMsg?: string;
  errorCode?: number;
  errorCtx?: any;
}

export interface ArrayResultEntity<T> {
  content?: ArrayContent<T>;
  success?: boolean;
  errorMsg?: string;
  errorCode?: number;
  errorCtx?: any;
}

export interface DataContent<T> {
  data: T;
}

export interface PageContent<T> {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  pages: number;
  data: T[];
}

export interface ArrayContent<T> {
  data: T[];
}
