import { Component, OnInit } from '@angular/core';
import { PacienteInterface } from '../types/pacientes.types';
import { PacienteService } from '../service/pacientes.service';
import { DatePipe } from '@angular/common';
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
    private PacienteService: PacienteService,
    private alertController: AlertController,
    private datePipe: DatePipe
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

  confirmarExclusao(paciente: PacienteInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o registro?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(paciente),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(paciente: PacienteInterface) {
    if (paciente.id) {
      this.PacienteService.excluir(paciente.id).subscribe(
        () => this.listaPacientes(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o registro`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }
}
