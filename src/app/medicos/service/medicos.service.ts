import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicoInterface } from '../types/medicos.types';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private url = 'http://localhost:3000/medicos';

  constructor(
    private httpClient: HttpClient
  ) {}

  getMedicos(): Observable<MedicoInterface[]> {
    return this.httpClient.get<MedicoInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getMedico(id: number): Observable<MedicoInterface> {
    return this.httpClient.get<MedicoInterface>(`${this.url}/${id}`);
  }

  private addMedico(autor: MedicoInterface)  {
    return this.httpClient.post(this.url, autor);
  }

  private updMedico(autor: MedicoInterface) {
    return this.httpClient.put(`${this.url}/${autor.id}`, autor);
  }

  salvar(paciente: MedicoInterface) {
    if(paciente.id) {
      return this.updMedico(paciente);
    } else {
      return this.addMedico(paciente);
    }
  }
}
