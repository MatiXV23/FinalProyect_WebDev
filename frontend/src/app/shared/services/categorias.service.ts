import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment'; 
import { Categoria } from '../types/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private httpClient = inject(HttpClient);
  async getCategorias(): Promise<Categoria[]> {
    return await firstValueFrom(this.httpClient.get<Categoria[]>(environment.apiUrl + '/categorias'));
  }
}
