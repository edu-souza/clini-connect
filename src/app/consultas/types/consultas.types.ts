import { Time } from "@angular/common";
import { MedicoInterface } from "src/app/medicos/types/medicos.types";
import { PacienteInterface } from "src/app/pacientes/types/pacientes.types";

export interface ConsultasInterface {
  id: number;
  paciente: PacienteInterface;
  medico: MedicoInterface;
  data: Date;
  hora: Time;
  tipo: string
}
