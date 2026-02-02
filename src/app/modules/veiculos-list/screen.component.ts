import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Veiculo } from '../../shared/models/veiculo.model';
import { VeiculoService } from '../../shared/services/veiculo.service';
import { AuthService } from '../../shared/services/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-veiculos-list',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class VeiculosListScreenComponent implements OnInit {
  
  veiculos: Veiculo = {
    data: [],
    pagination: {
      hasNextPage: false,
      hasPreviousPage: false,
      limit: 0,
      page: 0,
      totalItems: 0,
      totalPages: 0
    },
    success: false
  };
  isLoading = true;
  pageSize = 10;
  pageIndex = 0;
  sortBy: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private readonly veiculoService: VeiculoService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadVeiculos();
  }

  loadVeiculos(): void {
    this.isLoading = true;
    const page = this.pageIndex + 1;

    this.veiculoService.getVeiculos(page, this.pageSize, this.sortBy, this.sortOrder).subscribe({
      next: (veiculos) => {
        this.veiculos = veiculos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar veículos:', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    if (this.pageSize === event.pageSize) {
      this.pageIndex = event.pageIndex;
    } else {
      this.pageIndex = 0;
      this.pageSize = event.pageSize;
    }
    this.loadVeiculos();
  }

  onSortChange(sortBy: string, sortOrder: 'asc' | 'desc'): void {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    this.pageIndex = 0;
    this.loadVeiculos();
  }

  logout(): void {
    this.authService.logout();
  }

  getCorHex(cor: string): string {
    const cores: { [key: string]: string } = {
      'Branco': '#ffffff',
      'Preto': '#000000',
      'Prata': '#c0c0c0',
      'Azul': '#2196f3',
      'Vermelho': '#f44336',
      'Verde': '#4caf50',
      'Amarelo': '#ffeb3b'
    };
    return cores[cor] || '#9e9e9e';
  }

  editVeiculo(id: number): void {
    this.router.navigate(['/veiculos/edit', id]);
  }

  createVeiculo(): void {
    this.router.navigate(['/veiculos/create']);
  }

  deleteVeiculo(id: number): void {
    this.veiculoService.deleteVeiculo(id).subscribe({
      next: () => {
        this.loadVeiculos();
      }
    });
  }
}

