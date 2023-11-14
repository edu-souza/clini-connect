import { NgModule } from '@angular/core';
import { MedicosComponent } from './medicos.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [MedicosComponent],
  exports: [MedicosComponent],
})
export class MedicosModule {}
