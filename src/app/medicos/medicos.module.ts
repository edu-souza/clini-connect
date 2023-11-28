import { NgModule } from '@angular/core';
import { MedicosListaComponent } from './medicos-lista/medicos-lista.component';
import { MedicosCadastroComponent } from './medicos-cadastro/medicos-cadastro.component';
import { MedicosRoutingModule } from './medicos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule,FormsModule,ReactiveFormsModule,MedicosRoutingModule],
  declarations: [MedicosListaComponent,MedicosCadastroComponent],
  providers: [DatePipe],
  exports: [MedicosListaComponent,MedicosCadastroComponent],
})
export class MedicosModule {}
