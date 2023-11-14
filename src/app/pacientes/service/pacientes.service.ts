import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteInterface } from '../types/pacientes.types';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private url = 'http://localhost:3000/pacientes';

  constructor(
    private httpClient: HttpClient
  ) {}

  getPacientes(): Observable<PacienteInterface[]> {
    return this.httpClient.get<PacienteInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getPaciente(id: number): Observable<PacienteInterface> {
    return this.httpClient.get<PacienteInterface>(`${this.url}/${id}`);
  }

  private addPaciente(paciente: PacienteInterface)  {
    return this.httpClient.post(this.url, paciente);
  }

  private updPaciente(paciente: PacienteInterface) {
    return this.httpClient.put(`${this.url}/${paciente.id}`, paciente);
  }

  salvar(paciente: PacienteInterface) {
    if(paciente.id) {
      return this.updPaciente(paciente);
    } else {
      return this.addPaciente(paciente);
    }
  }
}
