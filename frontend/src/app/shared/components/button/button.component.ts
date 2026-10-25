
import { Component, input, output } from '@angular/core';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'ui-button',
    standalone: true,
    templateUrl: './button.component.html',
})
export class ButtonComponent {
    readonly variant = input<ButtonVariant>('primary');
    readonly size = input<ButtonSize>('md');
    readonly type = input<'button' | 'submit' | 'reset'>('button');

    readonly disabled = input(false);
    readonly loading = input(false);
    readonly fullWidth = input(false);

    readonly clicked = output<MouseEvent>();

    get buttonClasses(): string {
        const base =
            'inline-flex items-center justify-center gap-2 rounded-lg font-semibold ' +
            'transition focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
            'disabled:cursor-not-allowed disabled:opacity-50';

        const variants: Record<ButtonVariant, string> = {
            primary:
                'bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:ring-blue-500',
            secondary:
                'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400',
            danger:
                'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
            ghost:
                'text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
        };

        const sizes: Record<ButtonSize, string> = {
            sm: 'px-3 py-2 text-xs',
            md: 'px-4 py-2.5 text-sm',
            lg: 'px-5 py-3 text-sm',
        };

        return [
            base,
            variants[this.variant()],
            sizes[this.size()],
            this.fullWidth() ? 'w-full' : '',
        ].filter(Boolean).join(' ');
    }
}
