import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ConsultaInterface } from '../types/consultas.types';
import { ConsultaService } from '../service/consultas.service';

@Component({
  selector: 'app-consultas-cadastro',
  templateUrl: './consultas-cadastro.component.html',
  styleUrls: ['./consultas-cadastro.component.scss'],
})

export class ConsultasCadastroComponent  implements OnInit {
  consultaId: number | null;
  consultasForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private ConsultaService: ConsultaService,
    private router: Router){
    this.consultaId = null;
    this.consultasForm = this.createForm();
   }

   ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.consultaId = parseInt(id);
      this.ConsultaService.getMedico(this.consultaId).subscribe((consulta) => {
        this.consultasForm = this.createForm(consulta);
      });
    }
  }

  private createForm(consulta ? : ConsultaInterface) {
    return new FormGroup({
      medico: new FormControl(consulta?.medico || '', [
        Validators.required,
      ]),
      paciente: new FormControl(consulta?.paciente || '', [
        Validators.required,
      ]),
      data: new FormControl(
        consulta?.data || new Date().toISOString()
      ),
      hora: new FormControl(
        consulta?.hora || new Date().toISOString()
      ),
      tipo: new FormControl(consulta?.tipo || '', [
        Validators.required,
      ])
    });
  }

  salvar() {
    const consulta: ConsultaInterface = {
      ...this.consultasForm.value,
      id: this.consultaId,
    };
    this.ConsultaService.salvar(consulta).subscribe(
      () => this.router.navigate(['tabs/tab2']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o registro`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get medico() {
    return this.consultasForm.get('medico');
  }

  get paciente() {
    return this.consultasForm.get('paciente');
  }

  get data() {
    return this.consultasForm.get('data');
  }

  get hora() {
    return this.consultasForm.get('hora');
  }

  get tipo() {
    return this.consultasForm.get('tipo');
  }
}
