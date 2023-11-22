import { especialidadeEnum } from "./especialidade.enum";

export interface MedicoInterface {
  id: number;
  nome: string;
  dataAdmissao: Date;
  turno: string;
  crm: string;
  especialidade: especialidadeEnum;
}