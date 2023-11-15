import { NgModule } from '@angular/core';
import { PacientesComponent } from './pacientes.component';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [PacientesComponent,PacientesListaComponent],
  exports: [PacientesComponent,PacientesListaComponent],
})
export class PacientesModule {}
