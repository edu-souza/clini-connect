import { NgModule } from '@angular/core';
import { ConsultasComponent } from './consultas.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [ConsultasComponent],
  exports: [ConsultasComponent],
})
export class ConsultasModule {}
