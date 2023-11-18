import { NgModule } from '@angular/core';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';
import { PacientesCadastroComponent } from './pacientes-cadastro/pacientes-cadastro.component';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule,FormsModule,ReactiveFormsModule,PacientesRoutingModule],
  declarations: [PacientesListaComponent,PacientesCadastroComponent],
  exports: [PacientesListaComponent,PacientesCadastroComponent],
})
export class PacientesModule {}
