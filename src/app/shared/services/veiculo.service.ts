import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo, ItemVeiculo, GetFindByIdVeiculo } from '../models/veiculo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) { }

  getVeiculos(page?: number, limit?: number, sortBy?: string, sortOrder?: 'asc' | 'desc'): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.apiUrl}/list?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`); 
  }

  getId(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id`);
  }

  getVeiculoById(id: number): Observable<GetFindByIdVeiculo> {
    return this.http.get<GetFindByIdVeiculo>(`${this.apiUrl}/search/${id}`);
  }

  createVeiculo(veiculo: Omit<ItemVeiculo, 'id'>): Observable<Veiculo> {
    return this.http.post<Veiculo>(`${this.apiUrl}/create`, veiculo);
  }

  updateVeiculo(id: number, veiculo: Partial<ItemVeiculo>): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.apiUrl}/update/${id}`, veiculo);
  }

  deleteVeiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

