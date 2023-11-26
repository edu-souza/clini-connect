import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosCadastroComponent } from './medicos-cadastro/medicos-cadastro.component';
import { MedicosListaComponent } from './medicos-lista/medicos-lista.component';

const routes: Routes = [
  {
    path: 'listamedicos',
    component: MedicosListaComponent,
  },
  {
    path: 'cadastromedicos',
    component: MedicosCadastroComponent,
  },
  {
    path: 'edicao/:id',
    component: MedicosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule {}
