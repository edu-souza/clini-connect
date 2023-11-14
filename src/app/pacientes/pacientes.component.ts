import { Component, OnInit } from '@angular/core';
import { PacienteInterface } from './types/pacientes.types';
import { PacienteService } from './service/pacientes.service';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent  implements OnInit,ViewWillEnter {

  pacientes: PacienteInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private PacienteService: PacienteService
  ) { }

  ionViewWillEnter() {
    this.listaPacientes();
    console.log('ionViewWillEnter');
  }

  ngOnInit() {
    this.listaPacientes()
  }

  listaPacientes() {
    const observable = this.PacienteService.getPacientes();
    observable.subscribe(
      (dados) => {
        this.pacientes = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os pacientes`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }
}
