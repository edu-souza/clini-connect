import { especialidadeEnum } from "./especialidade.enum";

export interface MedicoInterface {
  id: number;
  nome: string;
  email: string;
  dataAdmissao: Date;
  turno: string;
  endereco: string;
  especialidade: especialidadeEnum;
  crm: string;
}