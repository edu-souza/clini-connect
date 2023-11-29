import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ConsultaInterface } from '../types/consultas.types';
import { ConsultaService } from '../service/consultas.service';
import { MedicoService } from 'src/app/medicos/service/medicos.service';
import { PacienteService } from 'src/app/pacientes/service/pacientes.service';
import { PacienteInterface } from 'src/app/pacientes/types/pacientes.types';
import { MedicoInterface } from 'src/app/medicos/types/medicos.types';

@Component({
  selector: 'app-consultas-cadastro',
  templateUrl: './consultas-cadastro.component.html',
  styleUrls: ['./consultas-cadastro.component.scss'],
})

export class ConsultasCadastroComponent  implements OnInit {
  consultaId: number | null;
  consultasForm: FormGroup;
  medicos: MedicoInterface[] = [];
  pacientes: PacienteInterface[] = [];


	constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private ConsultaService: ConsultaService,
    private MedicoService: MedicoService,
    private PacienteService: PacienteService,
    private router: Router){
    this.consultaId = null;
    this.consultasForm = this.createForm();
   }
	
	private setFormValues(consulta: ConsultaInterface) {
		this.consultasForm.patchValue({
			medico: consulta.medico.id,
			paciente: consulta.paciente.id,
			data: consulta.data,
			hora: consulta.hora,
			tipo: consulta.tipo,
			observacao: consulta.observacao,
		});
	}

  // Carrega a consulta conforme o ID. Caso a consulta não exista, é retornado a mensagem de não existencia
	private async loadConsulta() {
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.consultaId = parseInt(id);
			const consulta = await this.ConsultaService.getConsultaById(this.consultaId).toPromise();
			if (consulta) {
				this.setFormValues(consulta);
			} else {
				console.error(`Consulta não encontrada.`);
			}
		}
	}

   ngOnInit() {
		this.loadConsulta();
    this.carregaMedicos();
    this.carregaPacientes();
  }

  // Cria o forms e os valores que precisam ser adicionados no cadastro da consulta, sendo o médico, paciente e tipo obrigatórios 
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
      ]),
      observacao: new FormControl(consulta?.observacao || '', [
      ])
    });
  }

  // Salva as informações adicionada ao salvar o forms  
  async salvar() {
    const medicoId = this.consultasForm.value.medico;
    const pacienteId = this.consultasForm.value.paciente;
  
    const [medico, paciente] = await Promise.all([
      this.MedicoService.getMedicoById(medicoId).toPromise(),
      this.PacienteService.getPacienteById(pacienteId).toPromise()
    ]);
  
    const consulta: ConsultaInterface = {
      ...this.consultasForm.value,
      id: this.consultaId,
      medico: medico,
      paciente: paciente
    };
  
    this.ConsultaService.salvar(consulta).subscribe(
      () => this.router.navigate(['tabs/tab1']),
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

  // Carrega os médicos cadastrados
  carregaMedicos() {
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

  // Carrega os pacientes cadastrados
  carregaPacientes() {
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
  
  get observacao() {
    return this.consultasForm.get('observacao');
  }
}
