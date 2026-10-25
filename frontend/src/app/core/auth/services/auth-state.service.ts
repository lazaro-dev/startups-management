import { computed, Injectable, signal } from '@angular/core';
import { CurrentUser, UserRole } from '../models/current-user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthStateService {
    private readonly userState = signal<CurrentUser | null>({
        id: 1,
        name: 'Administrador',
        email: 'admin@example.com',
        role: 'ADMIN',
    });
    // private readonly userState = signal<CurrentUser | null>({
    //     id: 2,
    //     name: 'Colaborador de Startup',
    //     email: 'colaborador@example.com',
    //     role: 'COLLABORATOR',
    // });

    readonly currentUser = this.userState.asReadonly();

    readonly isAuthenticated = computed(
        () => this.currentUser() !== null,
    );

    readonly currentRole = computed<UserRole | null>(
        () => this.currentUser()?.role ?? null,
    );

    setCurrentUser(user: CurrentUser | null): void {
        this.userState.set(user);
    }

    hasRole(roles: UserRole[]): boolean {
        const role = this.currentRole();
        return role !== null && roles.includes(role);
    }
}