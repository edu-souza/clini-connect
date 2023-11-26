import { NgModule } from '@angular/core';
import { ConsultasListaComponent } from './consultas-lista/consultas-lista.component';
import { ConsultasCadastroComponent } from './consultas-cadastro/consultas-cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultasRoutingModule } from './consultas-routing.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule,FormsModule,ReactiveFormsModule,ConsultasRoutingModule],
  declarations: [ConsultasListaComponent,ConsultasCadastroComponent],
  exports: [ConsultasListaComponent,ConsultasCadastroComponent],
})
export class ConsultasModule {}