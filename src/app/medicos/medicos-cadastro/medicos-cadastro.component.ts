import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MedicoInterface } from '../types/medicos.types';
import { MedicoService } from '../service/medicos.service';

@Component({
  selector: 'app-medicos-cadastro',
  templateUrl: './medicos-cadastro.component.html',
  styleUrls: ['./medicos-cadastro.component.scss'],
})

export class MedicosCadastroComponent  implements OnInit {
  medicoId: number | null;
  medicosForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private MedicoService: MedicoService,
    private router: Router){
    this.medicoId = null;
    this.medicosForm = this.createForm();
   }

   ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.medicoId = parseInt(id);
      this.MedicoService.getMedico(this.medicoId).subscribe((medico) => {
        this.medicosForm = this.createForm(medico);
      });
    }
  }

  private createForm(medico ? : MedicoInterface) {
    return new FormGroup({
      nome: new FormControl(medico ?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      dataAdmissao: new FormControl(
        medico?.dataAdmissao || new Date().toISOString()
      ),
      crm: new FormControl(medico?.crm || '', [
        Validators.required,
      ]),
      turno: new FormControl(medico?.turno || '', [
        Validators.required,
      ]),
      especialidade: new FormControl(medico?.especialidade || '', [
        Validators.required,
      ]),
    });
  }

  salvar() {
    const medico: MedicoInterface = {
      ...this.medicosForm.value,
      id: this.medicoId,
    };
    this.MedicoService.salvar(medico).subscribe(
      () => this.router.navigate(['tabs/tab2']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o registro ${medico.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.medicosForm.get('nome');
  }

  get turno() {
    return this.medicosForm.get('turno');
  }

  get dataAdmissao() {
    return this.medicosForm.get('dataAdmissao');
  }

  get especialidade() {
    return this.medicosForm.get('especialidade');
  }

  get crm() {
    return this.medicosForm.get('crm');
  }
}

