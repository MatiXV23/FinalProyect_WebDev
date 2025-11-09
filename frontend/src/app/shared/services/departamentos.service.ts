import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { type Departamento } from '../types/departamentos';
import { baseApiURL } from '../../core/configs';

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService {
  private httpClient = inject(HttpClient);
  async getDepartamentos(): Promise<Departamento[]> {
    return await firstValueFrom(
      this.httpClient.get<Departamento[]>(baseApiURL+'/departamentos')
    );
  }
}
