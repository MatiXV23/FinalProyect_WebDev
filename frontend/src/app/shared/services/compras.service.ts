import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Compras } from '../types/compras';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private httpClient = inject(HttpClient);

  async getComprasByUserId(id: number) {
    try {
      return await firstValueFrom(
        this.httpClient.get<Compras[]>(`${environment.apiUrl}/usuarios/${id}/compras`)
      );
    } catch (e) {
      throw e;
    }
  }
}
