import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStateService } from '../../core/auth/services/auth-state.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  private readonly authState = inject(AuthStateService);

  readonly isMenuOpen = signal(false);
  readonly currentUser = this.authState.currentUser;

  readonly userInitials = computed(() => {
    const name = this.currentUser()?.name?.trim();

    if (!name) {
      return 'U';
    }

    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  });

  readonly userRoleLabel = computed(() => {
    const role = this.currentUser()?.role;

    const labels: Record<string, string> = {
      ADMIN: 'Administrador',
      COMMITTEE: 'Comitê gestor',
      STARTUP_ADMIN: 'Administrador de startup',
      COLLABORATOR: 'Colaborador',
      GUEST: 'Convidado',
      SUPPORTER: 'Apoiador',
    };

    return role ? labels[role] ?? 'Usuário' : 'Visitante';
  });

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}