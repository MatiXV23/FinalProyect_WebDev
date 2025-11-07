import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuariosFormComponent } from '../../components/usuarios-form/usuarios-form.component';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { MainStore } from '../../../../shared/stores/main.store';
import { UsuarioConPwd, Usuario } from '../../../../shared/types/usuario';
import { UsuariosService } from '../../../../shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios-edit',
  imports: [UsuariosFormComponent, IonCard, IonCardHeader, IonCardTitle],
  templateUrl: './usuarios-edit.page.html',
  styleUrl: './usuarios-edit.page.css',
})
export class UsuariosEditPage implements OnInit{
 
  private mainStore = inject(MainStore)
  private usuariosService = inject(UsuariosService)
  private router = inject(Router)

  user = structuredClone(this.mainStore.user())
  
  id_persona = input<string>()

  async ngOnInit() {
    const id_persona = this.id_persona()

    if (id_persona)
    this.user = await this.usuariosService.getUserById(id_persona)
  }

  async updateUser(modUser: UsuarioConPwd) {
    console.log(modUser)

    const data: Partial<Usuario> = {
      id_usuario: this.user!.id_usuario,
      email: modUser.email,
      nombres: modUser.nombres,
      direccion: modUser.direccion,
      apellidos: modUser.apellidos,
      is_admin: modUser.is_admin,
      id_departamento: modUser.id_departamento,
      nro_documento: modUser.nro_documento,
    }
    try {
      await this.usuariosService.updateUsuario(data)
      await this.usuariosService.updateUserPwd(this.user!.id_usuario, modUser.password)
      this.router.navigate(['/cuenta'])
    }catch (e) {
      console.log(e)
    }
  }
}
