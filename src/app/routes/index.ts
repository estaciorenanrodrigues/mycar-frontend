import { Routes } from "@angular/router";
import { LoginScreenComponent, VeiculosListScreenComponent, VeiculoEditScreenComponent, VeiculoCreateScreenComponent } from "../modules";

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginScreenComponent },
    { path: 'veiculos', component: VeiculosListScreenComponent },
    { path: 'veiculos/create', component: VeiculoCreateScreenComponent },
    { path: 'veiculos/edit/:id', component: VeiculoEditScreenComponent }
  ];