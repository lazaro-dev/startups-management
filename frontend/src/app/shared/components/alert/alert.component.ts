
import { Component, input, output } from '@angular/core';

export type AlertVariant = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'ui-alert',
  standalone: true,
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  readonly variant = input<AlertVariant>('info');
  readonly message = input.required<string>();
  readonly dismissible = input(false);

  readonly dismiss = output<void>();

  get alertClasses(): string {
    const variants: Record<AlertVariant, string> = {
      success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      error: 'border-red-200 bg-red-50 text-red-700',
      info: 'border-blue-200 bg-blue-50 text-blue-800',
      warning: 'border-amber-200 bg-amber-50 text-amber-800',
    };

    return `flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${variants[this.variant()]}`;
  }
}
