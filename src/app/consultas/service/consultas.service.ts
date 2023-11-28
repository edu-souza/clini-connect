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

  getConsultaById(id: number): Observable<ConsultaInterface | undefined> {
    return this.httpClient.get<ConsultaInterface | undefined>(`${this.url}/${id}`);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  private addConsulta(consulta: ConsultaInterface): Observable<ConsultaInterface> {
    return this.httpClient.post<ConsultaInterface>(this.url, consulta);
  }

  private updConsulta(consulta: ConsultaInterface): Observable<ConsultaInterface> {
    return this.httpClient.put<ConsultaInterface>(`${this.url}/${consulta.id}`, consulta);
  }

  salvar(consulta: ConsultaInterface): Observable<ConsultaInterface> {
    if (consulta.id) {
      return this.updConsulta(consulta);
    } else {
      return this.addConsulta(consulta);
    }
  }
}
