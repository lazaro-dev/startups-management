
import {
  Component,
  computed,
  contentChildren,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import {
  TableColumn,
  TableData,
  TablePageChange,
  TablePagination,
} from './table-column.model';
import { TableCellTemplateDirective } from './table-cell-template.directive';

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './table.component.html',
})
export class TableComponent<T = unknown> {
  readonly columns = input.required<TableColumn<T>[]>();
  readonly items = input.required<TableData<T>>();

  readonly cellTemplates = contentChildren(TableCellTemplateDirective);

  readonly title = input<string | null>(null);
  readonly loading = input(false);
  readonly rowKey = input('id');
  readonly withoutCardWrapper = input(false);
  readonly emptyValueInformation = input('Não informado');
  readonly emptyMessage = input('Nenhum registro encontrado.');
  readonly checkboxRow = input(false);


  readonly selectedItem = output<any>();
  readonly itemsSelected = output<any[]>();
  readonly changePage = output<TablePageChange>();

  readonly selectedKeys = signal<Set<string | number>>(new Set());

  readonly tableItems = computed<any[]>(() => {
    const data = this.items();

    return Array.isArray(data) ? data : data.content;
  });

  readonly pagination = computed<TablePagination | null>(() => {
    const data = this.items();

    if (Array.isArray(data)) {
      return null;
    }

    return {
      page: data.page,
      size: data.size,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
    };
  });

  readonly totalPages = computed(() =>
    Math.max(1, this.pagination()?.totalPages ?? 1),
  );

  getCellTemplate(key: string) {
    return this.cellTemplates().find(
      (template) => template.uiTableCell() === key,
    )?.template;
  }

  getCellValue(item: T, column: TableColumn<T>): unknown {
    if (column.value) {
      return column.value(item) ?? this.emptyValueInformation();
    }

    const value = column.key
      .toString()
      .split('.')
      .reduce(
        (current: any, part) => current?.[part],
        item,
      );

    return value ?? this.emptyValueInformation();
  }

  getRowKey(item: any): string | number {
    const value = this.rowKey()
      .split('.')
      .reduce(
        (current: any, part) => current?.[part],
        item,
      );

    return value as string | number;
  }

  isSelected(item: any): boolean {
    return this.selectedKeys().has(this.getRowKey(item));
  }

  isAllSelected(): boolean {
    const items = this.tableItems();

    return items.length > 0
      && items.every((item) => this.isSelected(item));
  }

  toggleRow(item: any, checked: boolean): void {
    const next = new Set(this.selectedKeys());
    const key = this.getRowKey(item);

    if (checked) {
      next.add(key);
    } else {
      next.delete(key);
    }

    this.selectedKeys.set(next);
    this.emitSelectedItems();
  }

  toggleAll(checked: boolean): void {
    const next = new Set(this.selectedKeys());

    for (const item of this.tableItems()) {
      const key = this.getRowKey(item);

      if (checked) {
        next.add(key);
      } else {
        next.delete(key);
      }
    }

    this.selectedKeys.set(next);
    this.emitSelectedItems();
  }

  private emitSelectedItems(): void {
    const selected = this.tableItems().filter(
      (item) => this.isSelected(item),
    );

    this.itemsSelected.emit(selected);
  }

  onRowClick(item: T): void {
    this.selectedItem.emit(item);
  }

  goToPage(page: number): void {
    const pagination = this.pagination();

    if (
      !pagination
      || page < 1
      || page > this.totalPages()
      || page === pagination.page
    ) {
      return;
    }

    this.changePage.emit({
      page,
      size: pagination.size,
    });
  }

  getAlignmentClass(align: string | undefined): string {
    const alignments: Record<string, string> = {
      start: 'text-left',
      center: 'text-center',
      end: 'text-right',
    };

    return alignments[align ?? 'start'];
  }

  trackByRow(_index: number, item: any): string | number {
    return this.getRowKey(item);
  }
}
