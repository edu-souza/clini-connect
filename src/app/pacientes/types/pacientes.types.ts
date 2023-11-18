import { sexoEnum } from "./sexo.enum";

export interface PacienteInterface {
    id?: number | null;
    nome: string;
    sexo: sexoEnum;
    dataNascto: Date;
    cidade: string;
    endereco: string;
  }