import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estado, EstadoRequest } from '../../models/estado.model';

@Component({
    selector: 'app-estado-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './estado-form.component.html',
})
export class EstadoFormComponent implements OnChanges {
    private readonly formBuilder = inject(FormBuilder);

    @Input() estado: Estado | null = null;
    @Input() isSaving = false;

    @Output() save = new EventEmitter<EstadoRequest>();
    @Output() cancel = new EventEmitter<void>();

    readonly form = this.formBuilder.nonNullable.group({
        uf: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}$/)]],
        description: ['', [Validators.required, Validators.maxLength(40)]],
    });

    ngOnChanges(): void {
        this.form.reset({
            uf: this.estado?.uf ?? '',
            description: this.estado?.description ?? '',
        });

        if (this.estado) {
            this.form.controls.uf.disable();
        } else {
            this.form.controls.uf.enable();
        }
    }

    normalizeUf(): void {
        const control = this.form.controls.uf;
        control.setValue(control.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2));
    }

    isInvalid(field: 'uf' | 'description'): boolean {
        const control = this.form.controls[field];
        return control.invalid && (control.touched || control.dirty);
    }

    submit(): void {
        if (this.form.invalid || this.isSaving) {
            this.form.markAllAsTouched();
            return;
        }

        const request: EstadoRequest = {
            uf: this.form.controls.uf.getRawValue().trim().toUpperCase(),
            description: this.form.controls.description.value.trim(),
        };

        if (!request.description) {
            this.form.controls.description.setErrors({ required: true });
            this.form.controls.description.markAsTouched();
            return;
        }

        this.save.emit(request);
    }
}