import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Chat, ChatNombres, Mensaje } from '../types/chats';
import { MainStore } from '../stores/main.store';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private httpClient = inject(HttpClient)
  private mainStore = inject(MainStore)
  private usuarioService = inject(UsuariosService)

  public async getAll(): Promise<Chat[]> {
    try {
      const id_usuario = this.mainStore.user()?.id_usuario

      return await firstValueFrom(this.httpClient.get<Chat[]>(`${environment.apiUrl}/usuarios/${id_usuario}/chats`))
    } catch (e: any) {
      console.log('Error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }

  public async getAllChatsNombres(): Promise<ChatNombres[]> {
    const chats: Chat[] = await this.getAll()
    const id_usuario = this.mainStore.user()?.id_usuario

    const chatsNombres: ChatNombres[] = []

    for (const chat of chats) {
      const id_persona = id_usuario === chat.id_comprador? chat.id_vendedor: chat.id_comprador
      const user = await this.usuarioService.getUserById(String(id_persona))

      chatsNombres.push({
        id_chat: chat.id_chat,
        id_comprador: chat.id_comprador,
        id_vendedor: chat.id_vendedor,
        id_otro: id_persona,
        nombre_otro: user.nombres,
        apellido_otro: user.apellidos,
        foto_url: user.foto_url || "/assets/imgs/avatar.png"
      })
    }
    return chatsNombres
  }

  public async getChatById(id_chat: string): Promise<Chat> {
    try {
      const id_usuario = this.mainStore.user()?.id_usuario

      return await firstValueFrom(this.httpClient.get<Chat>(`${environment.apiUrl}/usuarios/${id_usuario}/chats/${id_chat}`))
    } catch (e: any) {
      console.log('Error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }

  public async getChatNombresById(id_chat: string): Promise<ChatNombres> {
    const chat: Chat = await this.getChatById(id_chat)
    const id_usuario = this.mainStore.user()?.id_usuario
  
    const id_persona = id_usuario === chat.id_comprador? chat.id_vendedor: chat.id_comprador
    const user = await this.usuarioService.getUserById(String(id_persona))

    const chatsNombres = {
      id_chat: chat.id_chat,
      id_comprador: chat.id_comprador,
      id_vendedor: chat.id_vendedor,
      id_otro: id_persona,
      nombre_otro: user.nombres,
      apellido_otro: user.apellidos,
      foto_url: user.foto_url || "/assets/imgs/avatar.png"
    }

    return chatsNombres
  }

  public async getMensajes(id_chat: string): Promise<Mensaje[]> {
    try {
      const id_usuario = this.mainStore.user()?.id_usuario

      return await firstValueFrom(this.httpClient.get<Mensaje[]>(`${environment.apiUrl}/usuarios/${id_usuario}/chats/${id_chat}/mensajes`))
    } catch (e: any) {
      console.log('Error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }

  public async getChatId(id_comprador: number, id_vendedor: number): Promise<number> {
    try {
      const id_usuario = this.mainStore.user()?.id_usuario

      const chats = await firstValueFrom(this.httpClient.get<Chat[]>(`${environment.apiUrl}/usuarios/${id_usuario}/chats`))

      const chat = chats.find((c)=> (c.id_comprador===id_comprador && c.id_vendedor===id_vendedor) || (c.id_comprador===id_vendedor && c.id_vendedor===id_comprador))

      if (chat) return chat.id_chat

      const nuevo_chat = await firstValueFrom(this.httpClient.post<Chat>(`${environment.apiUrl}/usuarios/${id_usuario}/chats`, {id_comprador, id_vendedor}))
      return nuevo_chat.id_chat

    } catch (e: any) {
      console.log('Error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }

  public async sendMessage(id_chat: string, contenido: string) {
    try {
      const id_usuario = this.mainStore.user()?.id_usuario

      await firstValueFrom(this.httpClient.post(`${environment.apiUrl}/usuarios/${id_usuario}/chats/${id_chat}/mensajes`, {contenido}))
    } catch (e: any) {
      console.log('Error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }
}

