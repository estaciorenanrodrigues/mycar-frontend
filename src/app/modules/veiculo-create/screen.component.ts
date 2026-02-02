import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VeiculoService } from '../../shared/services/veiculo.service';
import { AuthService } from '../../shared/services/auth.service';
import { ItemVeiculo, Veiculo } from '../../shared/models/veiculo.model';

@Component({
  selector: 'app-veiculo-create',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class VeiculoCreateScreenComponent implements OnInit {
  veiculoForm: FormGroup;
  isSaving = false;
  newId!: number;
  listVeiculos: Veiculo = {
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly veiculoService: VeiculoService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.veiculoForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/)]],
      chassi: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      renavam: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      modelo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      ano: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]]
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.getListVeiculos();
    this.getId();
  }

  getId(): void {
    this.veiculoService.getId().subscribe((id) => {
      this.newId = id.id;
    });
  }

  getListVeiculos(): void {
    this.veiculoService.getVeiculos().subscribe((veiculos) => {
      this.listVeiculos = veiculos;
    });
  }

  onSubmit(): void {
    if (this.veiculoForm.invalid) {
      return;
    }

    this.isSaving = true;

    const veiculoData: Omit<ItemVeiculo, 'id'> = { ...this.veiculoForm.value, id: this.newId + 1 };

    this.veiculoService.createVeiculo(veiculoData).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/veiculos']);
      },
      error: (error) => {
        console.error('Erro ao cadastrar veículo:', error);
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/veiculos']);
  }

  logout(): void {
    this.authService.logout();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.veiculoForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} é obrigatório`;
    }
    if (field?.hasError('pattern')) {
      return 'Placa inválida. Use o formato ABC1234 ou ABC1D23';
    }
    if (field?.hasError('minlength') || field?.hasError('maxlength')) {
      if (fieldName === 'chassi') {
        return 'Chassi deve ter exatamente 17 caracteres';
      }
      if (fieldName === 'renavam') {
        return 'Renavam deve ter exatamente 11 caracteres';
      }
    }
    if (field?.hasError('min') || field?.hasError('max')) {
      return 'Ano inválido';
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      placa: 'Placa',
      chassi: 'Chassi',
      renavam: 'Renavam',
      modelo: 'Modelo',
      marca: 'Marca',
      ano: 'Ano'
    };
    return labels[fieldName] || fieldName;
  }
}

