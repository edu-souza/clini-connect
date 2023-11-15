import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { MedicoInterface } from '../types/medicos.types';
import { MedicoService } from '../service/medicos.service';

@Component({
  selector: 'app-medicos-lista',
  templateUrl: './medicos-lista.component.html',
  styleUrls: ['./medicos-lista.component.scss'],
})
export class MedicosListaComponent  implements OnInit {

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

