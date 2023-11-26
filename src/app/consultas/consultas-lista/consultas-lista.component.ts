import { Component, OnInit } from '@angular/core';
import { ConsultaInterface } from '../types/consultas.types';
import { ConsultaService } from '../service/consultas.service';
import { MedicoInterface } from 'src/app/medicos/types/medicos.types';
import { DatePipe } from '@angular/common';
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
  
  consultas: ConsultaInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private ConsultaService: ConsultaService,
    private datePipe: DatePipe
  ) { }

  ionViewWillEnter() {
    this.listaConsultas();
  }

  ngOnInit() {
    this.listaConsultas()
  }

  listaConsultas() {
    const observable = this.ConsultaService.getConsultas();
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

  confirmarExclusao(consulta: ConsultaInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o registro?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(consulta),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(consulta: ConsultaInterface) {
    if (consulta.id) {
      this.ConsultaService.excluir(consulta.id).subscribe(
        () => this.listaConsultas(),
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

