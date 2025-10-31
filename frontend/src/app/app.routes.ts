import { Routes } from '@angular/router';
import { HomePage } from './routes/home/home.page';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage, title: 'Home' },
  {
    path: 'usuarios',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios/usuarios.page')).UsuariosPage,
    title: 'Usuarios',
  },

  {
    path: 'usuarios/edit',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-edit/usuarios-edit.page')).UsuariosEditPage,
    title: 'Editar usuarios',
  },

  {
    path: 'usuarios/login',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-login/usuarios-login.page'))
        .UsuariosLoginPage,
    title: 'Logear usuario',
  },

  {
    path: 'usuarios/register',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-register/usuarios-register.page'))
        .UsuariosRegisterPage,
    title: 'Regsitrar usuario',
  },

  {
    path: 'chats/enviar',
    loadComponent: async () =>
      (await import('./routes/chats/pages/mensajes-enviar/mensajes-enviar.page'))
        .MensajesEnviarPage,
    title: 'Enviar chat',
  },

  {
    path: 'chats/listar',
    loadComponent: async () =>
      (await import('./routes/chats/pages/mensajes-listar/mensajes-listar.page'))
        .MensajesListarPage,
    title: 'Listar chats',
  },
];
