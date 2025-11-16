import { Component, inject, resource, signal } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../../shared/types/usuario';
import { IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-usuarios',
  imports: [IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardTitle, RouterLink],
  templateUrl: './usuarios.page.html',
  styleUrl: './usuarios.page.css',
})
export class UsuariosPage {
  private router = inject(Router);

  private usuariosService = inject(UsuariosService);

  public usuarios = resource({
    loader: () => this.usuariosService.getUsuarios() 
  });

  

  public async handleDelete(event: any, id_usuario: number) {
    event.stopPropagation()
    await this.usuariosService.eliminarUsuario(id_usuario);
    console.log('Eliminado');
    this.router.navigate(['home']);
  }

  public handleEdit(event: any, id_usuario: number) {
    event.stopPropagation()
    this.router.navigate([`usuarios/${id_usuario}/edit`]);
  }

  public viewProfile(id_usuario: number) {
    this.router.navigate([`usuarios/${id_usuario}`]);
  }
}
