
import { Component, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { AlertComponent } from '@/app/shared/components/alert/alert.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';

import { EstadoFormComponent } from '@/app/features/estados/components/estado-form/estado-form.component';
import { Estado, EstadoRequest } from '@/app/features/estados/models/estado.model';
import { EstadoService } from '@/app/features/estados/services/estado.service';
import { TableComponent } from '@/app/shared/components/data-table/table.component';
import { TableCellTemplateDirective } from '@/app/shared/components/data-table/table-cell-template.directive';
import { TableColumn } from '@/app/shared/components/data-table/table-column.model';

@Component({
  selector: 'app-estado-list',
  standalone: true,
  imports: [
    AlertComponent,
    ButtonComponent,
    TableComponent,
    TableCellTemplateDirective,
    EstadoFormComponent,
  ],
  templateUrl: './estado-list.component.html',
})
export class EstadoListComponent {
  private readonly estadoService = inject(EstadoService);

  readonly estados = signal<Estado[]>([]);
  readonly searchTerm = signal('');
  readonly editingEstado = signal<Estado | null>(null);

  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly isModalOpen = signal(false);

  readonly successMessage = signal('');
  readonly errorMessage = signal('');

  readonly columns: TableColumn<Estado>[] = [
    {
      title: 'UF',
      key: 'uf',
      align: 'start',
      styles: 'w-28',
    },
    {
      title: 'Descrição',
      key: 'description',
      align: 'start',
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'end',
      styles: 'w-48',
    },
  ];

  readonly filteredStates = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase('pt-BR');

    return this.estados()
      .filter((estado) =>
        estado.uf.toLocaleLowerCase('pt-BR').includes(term)
        || estado.description.toLocaleLowerCase('pt-BR').includes(term),
      )
      .sort((a, b) => a.uf.localeCompare(b.uf));
  });

  constructor() {
    this.loadEstados();
  }

  loadEstados(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.estadoService.findAll()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (estados) => {
          this.estados.set(estados);
        },
        error: () => {
          this.errorMessage.set(
            'Não foi possível carregar os estados. Verifique a conexão com a API.',
          );
        },
      });
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  openCreateModal(): void {
    this.editingEstado.set(null);
    this.successMessage.set('');
    this.errorMessage.set('');
    this.isModalOpen.set(true);
  }

  openEditModalFromTable(item: unknown): void {
    if (
      typeof item === 'object'
      && item !== null
      && 'uf' in item
      && 'description' in item
    ) {
      this.openEditModal(item as Estado);
    }
  }

  openEditModal(estado: unknown): void {
    this.editingEstado.set({ ...(estado as Estado) });
    this.successMessage.set('');
    this.errorMessage.set('');
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    if (this.isSaving()) {
      return;
    }

    this.isModalOpen.set(false);
    this.editingEstado.set(null);
  }

  saveEstado(request: EstadoRequest): void {
    if (this.isSaving()) {
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');

    const currentEstado = this.editingEstado();

    const operation = currentEstado
      ? this.estadoService.update(currentEstado.uf, request)
      : this.estadoService.create(request);

    operation
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: () => {
          this.isModalOpen.set(false);
          this.editingEstado.set(null);
          this.successMessage.set('Estado salvo com sucesso!');
          this.loadEstados();
        },
        error: (error) => {
          if (error.status === 409) {
            this.errorMessage.set(
              'Já existe um estado cadastrado com essa UF.',
            );
          } else if (error.status === 400) {
            this.errorMessage.set(
              'Os dados informados são inválidos. Confira os campos.',
            );
          } else {
            this.errorMessage.set(
              'Não foi possível salvar o estado. Tente novamente.',
            );
          }
        },
      });
  }

  deleteEstado(item: unknown): void {
    const estado = item as Estado;
    const confirmed = window.confirm(
      `Deseja realmente excluir (${estado.uf})?`,
    );

    if (!confirmed) {
      return;
    }

    this.successMessage.set('');
    this.errorMessage.set('');

    this.estadoService.delete(estado.uf).subscribe({
      next: () => {
        this.successMessage.set('Estado excluído com sucesso!');
        this.loadEstados();
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage.set(
            'O estado não foi encontrado. Atualize a listagem.',
          );
          this.loadEstados();
        } else {
          this.errorMessage.set('Não foi possível excluir o estado.');
        }
      },
    });
  }
}
