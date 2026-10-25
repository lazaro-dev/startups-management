import { Directive, TemplateRef, inject, input } from '@angular/core';

export interface TableCellContext<T> {
  $implicit: T;
  index: number;
}

@Directive({
  selector: 'ng-template[uiTableCell]',
  standalone: true,
})
export class TableCellTemplateDirective<T = unknown> {
  readonly uiTableCell = input.required<string>();

  readonly template = inject(TemplateRef) as TemplateRef<
    TableCellContext<T>
  >;

  static ngTemplateContextGuard<T>(
    _directive: TableCellTemplateDirective<T>,
    _context: unknown,
  ): _context is TableCellContext<T> {
    return true;
  }
}