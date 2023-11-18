import { Component, OnInit } from '@angular/core';
import { PacienteInterface } from '../types/pacientes.types';
import { PacienteService } from '../service/pacientes.service';
import {
  AlertController,
  ToastController,
} from '@ionic/angular';
@Component({
  selector: 'app-pacientes-lista',
  templateUrl: './pacientes-lista.component.html',
  styleUrls: ['./pacientes-lista.component.scss'],
})
export class PacientesListaComponent  implements OnInit {
  pacientes: PacienteInterface[] = [];

  constructor(
    private toastController: ToastController,
    private PacienteService: PacienteService
  ) { }

  ionViewWillEnter() {
    this.listaPacientes();
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
