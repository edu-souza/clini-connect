import { NgModule } from '@angular/core';
import { MedicosListaComponent } from './medicos-lista/medicos-lista.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [MedicosListaComponent],
  exports: [MedicosListaComponent],
})
export class MedicosModule {}
