import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VeiculoService } from '../../shared/services/veiculo.service';
import { AuthService } from '../../shared/services/auth.service';
import { ItemVeiculo } from '../../shared/models/veiculo.model';

@Component({
  selector: 'app-veiculo-edit',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class VeiculoEditScreenComponent implements OnInit {
  veiculoForm: FormGroup;
  veiculoId: number | null = null;
  isLoading = false;
  isSaving = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly veiculoService: VeiculoService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
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

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.veiculoId = Number(id);
      this.loadVeiculo();
    } else {
      this.router.navigate(['/veiculos']);
    }
  }

  loadVeiculo(): void {
    if (!this.veiculoId) return;

    this.isLoading = true;
    this.veiculoService.getVeiculoById(this.veiculoId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const veiculo = response.data;

          this.veiculoForm.patchValue({
            placa: veiculo.placa,
            chassi: veiculo.chassi,
            renavam: veiculo.renavam,
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            ano: veiculo.ano
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar veículo:', error);
        this.isLoading = false;
        this.router.navigate(['/veiculos']);
      }
    });
  }

  onSubmit(): void {
    if (this.veiculoForm.invalid || !this.veiculoId) {
      return;
    }

    this.isSaving = true;
    const veiculoData: Partial<ItemVeiculo> = this.veiculoForm.value;

    this.veiculoService.updateVeiculo(this.veiculoId, veiculoData).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/veiculos']);
      },
      error: (error) => {
        console.error('Erro ao atualizar veículo:', error);
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

