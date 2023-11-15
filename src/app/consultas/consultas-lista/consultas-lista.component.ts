import { Component, OnInit } from '@angular/core';
import { ConsultasInterface } from '../types/consultas.types';
import { ConsultasService } from '../service/consultas.service';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';

@Component({
  selector: 'app-consultas-lista',
  templateUrl: './consultas-lista.component.html',
  styleUrls: ['./consultas-lista.component.scss'],
})
export class ConsultasListaComponent  implements OnInit {
  
  consultas: ConsultasInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private ConsultasService: ConsultasService
  ) { }

  ionViewWillEnter() {
    this.listaConsultas();
  }

  ngOnInit() {
    this.listaConsultas()
  }

  listaConsultas() {
    const observable = this.ConsultasService.getConsultas();
    observable.subscribe(
      (dados) => {
        this.consultas = dados;
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

