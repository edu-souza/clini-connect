import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultasInterface } from '../types/consultas.types';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private url = 'http://localhost:3000/consultas';

  constructor(
    private httpClient: HttpClient
  ) {}

  getConsultas(): Observable<ConsultasInterface[]> {
    return this.httpClient.get<ConsultasInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getMedico(id: number): Observable<ConsultasInterface> {
    return this.httpClient.get<ConsultasInterface>(`${this.url}/${id}`);
  }

  private addConsulta(consulta: ConsultasInterface)  {
    return this.httpClient.post(this.url, consulta);
  }

  private updConsulta(consulta: ConsultasInterface) {
    return this.httpClient.put(`${this.url}/${consulta.id}`, consulta);
  }

  salvar(consulta: ConsultasInterface) {
    if(consulta.id) {
      return this.updConsulta(consulta);
    } else {
      return this.addConsulta(consulta);
    }
  }
}
