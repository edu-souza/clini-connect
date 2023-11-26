import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultaInterface } from '../types/consultas.types';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url = 'http://localhost:3000/consultas';

  constructor(
    private httpClient: HttpClient
  ) {}

  getConsultas(): Observable<ConsultaInterface[]> {
    return this.httpClient.get<ConsultaInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getMedico(id: number): Observable<ConsultaInterface> {
    return this.httpClient.get<ConsultaInterface>(`${this.url}/${id}`);
  }

  private addConsulta(consulta: ConsultaInterface)  {
    return this.httpClient.post(this.url, consulta);
  }

  private updConsulta(consulta: ConsultaInterface) {
    return this.httpClient.put(`${this.url}/${consulta.id}`, consulta);
  }

  salvar(consulta: ConsultaInterface) {
    if(consulta.id) {
      return this.updConsulta(consulta);
    } else {
      return this.addConsulta(consulta);
    }
  }
}
