import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasListaComponent } from './consultas-lista/consultas-lista.component';
import { ConsultasCadastroComponent } from './consultas-cadastro/consultas-cadastro.component';

const routes: Routes = [
  {
    path: 'listaconsultas',
    component: ConsultasListaComponent,
  },
  {
    path: 'cadastroconsultas',
    component: ConsultasCadastroComponent,
  },
  {
    path: 'edicao/:id',
    component: ConsultasCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule {}