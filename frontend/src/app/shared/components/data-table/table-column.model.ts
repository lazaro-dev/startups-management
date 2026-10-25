
export type TableAlignment = 'start' | 'center' | 'end';

export interface TableColumn<T> {
  title: string;
  key: keyof T | string;
  align?: TableAlignment;
  styles?: string;
  value?: (item: T) => string | number | null | undefined;
  sortable?: boolean;
}

export interface TablePagination {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export interface TablePageChange {
  page: number;
  size: number;
}

export interface PaginatedData<T> {
  content: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export type TableData<T> = T[] | PaginatedData<T>;
