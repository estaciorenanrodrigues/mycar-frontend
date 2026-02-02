import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/veiculos']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      
      if (this.authService.login(email, senha)) {
        this.router.navigate(['/veiculos']);
      } else {
        this.errorMessage = 'Email ou senha inválidos';
      }
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente';
    }
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email é obrigatório';
    }
    if (emailControl?.hasError('email')) {
      return 'Email inválido';
    }
    return '';
  }

  getSenhaErrorMessage(): string {
    const senhaControl = this.loginForm.get('senha');
    if (senhaControl?.hasError('required')) {
      return 'Senha é obrigatória';
    }
    if (senhaControl?.hasError('minlength')) {
      return 'Senha deve ter no mínimo 6 caracteres';
    }
    return '';
  }
}

