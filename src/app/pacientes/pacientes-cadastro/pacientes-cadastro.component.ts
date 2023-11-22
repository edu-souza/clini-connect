import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PacienteInterface } from '../types/pacientes.types';
import { PacienteService } from '../service/pacientes.service';

@Component({
  selector: 'app-pacientes-cadastro',
  templateUrl: './pacientes-cadastro.component.html',
  styleUrls: ['./pacientes-cadastro.component.scss'],
})
export class PacientesCadastroComponent  implements OnInit {
  pacienteId: number | null;
  pacientesForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private PacienteService: PacienteService,
    private router: Router){
    this.pacienteId = null;
    this.pacientesForm = this.createForm();
   }

   ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pacienteId = parseInt(id);
      this.PacienteService.getPaciente(this.pacienteId).subscribe((paciente) => {
        this.pacientesForm = this.createForm(paciente);
      });
    }
  }

  private createForm(paciente ? : PacienteInterface) {
    return new FormGroup({
      nome: new FormControl(paciente ?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      endereco: new FormControl(paciente ?.endereco || '', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(150),
      ]),
      dataNascto: new FormControl(
        paciente?.dataNascto || new Date().toISOString()
      ),
      cidade: new FormControl(paciente?.cidade || '', [
        Validators.required,
      ]),
      sexo: new FormControl(paciente?.cidade || '', [
        Validators.required,
      ])
    });
  }

  salvar() {
    const paciente: PacienteInterface = {
      ...this.pacientesForm.value,
      id: this.pacienteId,
    };
    this.PacienteService.salvar(paciente).subscribe(
      () => this.router.navigate(['tabs/tab3']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o registro ${paciente.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.pacientesForm.get('nome');
  }

  get endereco() {
    return this.pacientesForm.get('endereco');
  }

  get dataNascto() {
    return this.pacientesForm.get('dataNascto');
  }

  get cidade() {
    return this.pacientesForm.get('cidade');
  }

  get sexo() {
    return this.pacientesForm.get('sexo');
  }
}
