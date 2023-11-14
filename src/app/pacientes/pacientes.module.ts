import { NgModule } from '@angular/core';
import { PacientesComponent } from './pacientes.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [PacientesComponent],
  exports: [PacientesComponent],
})
export class PacientesModule {}
