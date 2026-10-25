import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStateService } from '../../core/auth/services/auth-state.service';
import { NavigationItem } from '../../core/auth/models/current-user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private readonly authState = inject(AuthStateService);

  readonly isOpen = input(false);
  readonly close = output<void>();

  private readonly navigationItems: NavigationItem[] = [
    // {
    //   label: 'Visão geral',
    //   route: '/dashboard',
    //   icon: '▦',
    //   allowedRoles: [
    //     'ADMIN',
    //     'COMMITTEE',
    //     'STARTUP_ADMIN',
    //     'COLLABORATOR',
    //     'GUEST',
    //     'SUPPORTER',
    //   ],
    // },
    {
      label: 'Estados',
      route: '/estados',
      icon: '⌖',
      allowedRoles: ['ADMIN'],
    },
    // {
    //   label: 'Cidades',
    //   route: '/cidades',
    //   icon: '⌂',
    //   allowedRoles: ['ADMIN'],
    //   badge: 'Em breve',
    // },
    // {
    //   label: 'Usuários',
    //   route: '/usuarios',
    //   icon: '♙',
    //   allowedRoles: ['ADMIN'],
    //   badge: 'Em breve',
    // },
    // {
    //   label: 'Startups',
    //   route: '/startups',
    //   icon: '◇',
    //   allowedRoles: ['ADMIN', 'COMMITTEE', 'STARTUP_ADMIN'],
    // },
    // {
    //   label: 'Projetos',
    //   route: '/projetos',
    //   icon: '▤',
    //   allowedRoles: [
    //     'ADMIN',
    //     'COMMITTEE',
    //     'STARTUP_ADMIN',
    //     'COLLABORATOR',
    //     'SUPPORTER',
    //   ],
    // },
    // {
    //   label: 'Necessidades',
    //   route: '/necessidades',
    //   icon: '◎',
    //   allowedRoles: ['ADMIN', 'COMMITTEE', 'STARTUP_ADMIN'],
    // },
  ];

  readonly visibleItems = computed(() => {
    const user = this.authState.currentUser();

    if (!user) {
      return [];
    }

    return this.navigationItems.filter((item) =>
      item.allowedRoles.includes(user.role),
    );
  });

  closeMenu(): void {
    this.close.emit();
  }
}