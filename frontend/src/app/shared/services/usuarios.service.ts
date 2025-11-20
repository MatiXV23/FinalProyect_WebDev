import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../types/usuario';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Resenia } from '../types/resenia';
import { Compras } from '../types/compras';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private httpClient = inject(HttpClient);

  public async getUserById(id_usuario: string): Promise<Usuario> {
    return await firstValueFrom(
      this.httpClient.get<Usuario>(`${environment.apiUrl}/usuarios/${id_usuario}`)
    );
  }

  public async postUsuario(datos: Partial<Usuario>): Promise<Usuario[]> {
    return await firstValueFrom(
      this.httpClient.post<Usuario[]>(environment.apiUrl + '/usuarios', datos)
    );
  }
  public async getUsuarios() {
    return await firstValueFrom(this.httpClient.get<Usuario[]>(environment.apiUrl + '/usuarios'));
  }

  public async eliminarUsuario(id: number) {
    await firstValueFrom(this.httpClient.delete(`${environment.apiUrl}/usuarios/${id}`));
  }

  public async updateUsuario(datos: Partial<Usuario>): Promise<void> {
    await firstValueFrom(
      this.httpClient.put(`${environment.apiUrl}/usuarios/${datos.id_usuario}`, datos)
    );
  }

  public async updateUserPwd(id_usuario: number, password: string): Promise<void> {
    await firstValueFrom(
      this.httpClient.put(`${environment.apiUrl}/usuarios/${id_usuario}/pwd`, {
        password: password,
      })
    );
  }

  // RESENIAS
  public async getUserResenias(id_usuario: string): Promise<Resenia[]> {
    return await firstValueFrom(
      this.httpClient.get<Resenia[]>(`${environment.apiUrl}/usuarios/${id_usuario}/resenias`)
    );
  }

  // CARRITO
  public async updateCarrito(id_usuario: number, articulos_carrito: number[]): Promise<void> {
    await firstValueFrom(
      this.httpClient.patch(`${environment.apiUrl}/usuarios/${id_usuario}`, { articulos_carrito })
    );
  }

  public async comprarArticulo(id_usuario: number, id_articulo: number) {
    console.log({ compra: { id_usuario, id_articulo } });
    await firstValueFrom(
      this.httpClient.post(`${environment.apiUrl}/usuarios/${id_usuario}/compras`, {
        id_articulo,
      })
    );
  }

  public async postResenia(id_user_logeado: number, id_compra: number, datos: any) {
    try {
      return await firstValueFrom(
        this.httpClient.post<Resenia>(
          `${environment.apiUrl}/usuarios/${id_user_logeado}/compras/${id_compra}/resenia`,
          datos
        )
      );
    } catch (e) {
      throw e;
    }
  }
}
