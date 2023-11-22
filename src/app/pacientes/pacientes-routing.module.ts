import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';
import { PacientesCadastroComponent } from './pacientes-cadastro/pacientes-cadastro.component';

const routes: Routes = [
  {
    path: 'listapacientes',
    component: PacientesListaComponent,
  },
  {
    path: 'cadastropacientes',
    component: PacientesCadastroComponent,
  },
  {
    path: 'edicao/:id',
    component: PacientesCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {}
