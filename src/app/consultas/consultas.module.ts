import { NgModule } from '@angular/core';
import { ConsultasListaComponent } from './consultas-lista/consultas-lista.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [ConsultasListaComponent],
  exports: [ConsultasListaComponent],
})
export class ConsultasModule {}