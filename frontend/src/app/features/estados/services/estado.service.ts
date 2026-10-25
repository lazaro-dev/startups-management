import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, EstadoRequest } from '../models/estado.model';

@Injectable({
    providedIn: 'root',
})
export class EstadoService {
    private readonly http = inject(HttpClient);
    private readonly apiHost = 'http://localhost:8080';
    private readonly apiUrl = '/api/estados';
    private readonly endPoints = {
        findAll: () => `${this.apiHost}${this.apiUrl}`,
        findByUf: (uf: string) => `${this.apiHost}${this.apiUrl}/${uf}`,
        create: () => `${this.apiHost}${this.apiUrl}`,
        update: (uf: string) => `${this.apiHost}${this.apiUrl}/${uf}`,
        delete: (uf: string) => `${this.apiHost}${this.apiUrl}/${uf}`,
    };

    findAll(): Observable<Estado[]> {
        return this.http.get<Estado[]>(this.endPoints.findAll());
    }

    findByUf(uf: string): Observable<Estado> {
        return this.http.get<Estado>(this.endPoints.findByUf(uf));
    }

    create(request: EstadoRequest): Observable<Estado> {
        return this.http.post<Estado>(this.endPoints.create(), request);
    }

    update(uf: string, request: EstadoRequest): Observable<Estado> {
        return this.http.put<Estado>(this.endPoints.update(uf), request);
    }

    delete(uf: string): Observable<void> {
        return this.http.delete<void>(this.endPoints.delete(uf));
    }
}