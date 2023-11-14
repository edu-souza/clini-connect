import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { MedicoInterface } from './types/medicos.types';
import { MedicoService } from './service/medicos.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss'],
})
export class MedicosComponent  implements OnInit,ViewWillEnter {

  medicos: MedicoInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private MedicoService: MedicoService
  ) { }

  ionViewWillEnter() {
    this.listaMedicos();
    console.log('ionViewWillEnter');
  }

  ngOnInit() {
    this.listaMedicos()
  }

  listaMedicos() {
    const observable = this.MedicoService.getMedicos();
    observable.subscribe(
      (dados) => {
        this.medicos = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Erro ao listar registros`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }
}

