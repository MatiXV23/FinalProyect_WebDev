import { Routes } from '@angular/router';
import { isLoggedGuard } from './core/guards/is-logged-guard';
import { ArticuloListarPage } from './routes/articulos/pages/articulo-listar/articulo-listar.page';
import { isNotLoggedGuard } from './core/guards/is-not-logged-guard';
import { isAdminGuard } from './core/guards/is-admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ArticuloListarPage, title: 'CNP Market' },

  {
    path: 'usuarios',
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./routes/usuarios/pages/usuarios/usuarios.page')).UsuariosPage,
        title: 'CNP Market | Usuarios',
        canActivate: [isLoggedGuard, isAdminGuard],
      },
      {
        path: ':id_usuario',
        loadComponent: async () =>
          (await import('./routes/usuarios/pages/usuario-detalle/usuario-detalle.page'))
            .UsuarioDetallePage,
        title: 'CNP Market | Usuarios',
      },
      {
        path: ':id_usuario/edit',
        loadComponent: async () =>
          (await import('./routes/usuarios/pages/usuarios-edit/usuarios-edit.page'))
            .UsuariosEditPage,
        title: 'CNP Market | Editar usuarios',
        canActivate: [isLoggedGuard, isAdminGuard],
      },

      {
        path: ':id_usuario/articulos',
        loadComponent: async () =>
          (
            await import(
              './routes/articulos/pages/articulos-usuario-listar/articulos-usuario-listar.page'
            )
          ).ArticulosUsuarioListarPage,
        title: 'CNP Market | Publicaciones',
      },
    ],
  },

  {
    path: 'cuenta',
    canActivateChild: [isLoggedGuard],
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./routes/usuarios/pages/usuario-detalle/usuario-detalle.page'))
            .UsuarioDetallePage,
        title: 'CNP Market | Mi Cuenta',
      },
      {
        path: 'edit',
        loadComponent: async () =>
          (await import('./routes/usuarios/pages/usuarios-edit/usuarios-edit.page'))
            .UsuariosEditPage,
        title: 'CNP Market | Editar Cuenta',
      },

      {
        path: 'compras',
        canActivateChild: [isLoggedGuard],
        children: [
          {
            path: '',
            loadComponent: async () =>
              (
                await import(
                  './routes/articulos/pages/compras-usuario-listar/compras-usuario-listar.page'
                )
              ).ComprasUsuarioListarPage,
            title: 'CNP Market | Mis Compras',
          },
        ],
      },

      {
        path: 'ventas',
        canActivateChild: [isLoggedGuard],
        children: [
          {
            path: '',
            loadComponent: async () =>
              (
                await import(
                  './routes/articulos/pages/ventas-usuario-listar/ventas-usuario-listar.page'
                )
              ).VentasUsuarioListarPage,
            title: 'CNP Market | Mis Ventas',
          },
        ],
      },
    ],
  },

  {
    path: 'login',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-login/usuarios-login.page'))
        .UsuariosLoginPage,
    canActivate: [isNotLoggedGuard],
    title: 'CNP Market | Log In',
  },

  {
    path: 'registro',
    loadComponent: async () =>
      (await import('./routes/usuarios/pages/usuarios-register/usuarios-register.page'))
        .UsuariosRegisterPage,
    canActivate: [isNotLoggedGuard],
    title: 'CNP Market | Regsitrarse',
  },

  {
    path: 'carrito',
    canActivateChild: [isLoggedGuard],
    children: [
      {
        path: '',
        loadComponent: async () => (await import('./routes/carrito/carrito.page')).CarritoPage,
        title: 'CNP Market | Mi Carrito',
      },
      {
        path: 'comprar',
        loadComponent: async () =>
          (await import('./routes/articulos/pages/articulo-comprar/articulo-comprar.page'))
            .ArticuloComprarPage,
        title: 'CNP Market | Pago',
      },
    ],
  },

  {
    path: 'chats',
    canActivate: [isLoggedGuard],
    loadComponent: async () =>
      (await import('./routes/chats/pages/mensajes-listar/mensajes-listar.page'))
        .MensajesListarPage,
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./routes/chats/pages/no-chat/no-chat.page')).NoChatPage,
        title: 'CNP Market | Chats',
      },
      {
        path: ':id_chat',
        loadComponent: async () =>
          (await import('./routes/chats/pages/mensajes-detalle/mensajes-detalle.page'))
            .MensajesDetallePage,
        title: 'CNP Market | Chats',
      },
    ],
  },

  {
    path: 'articulos',
    children: [
      {
        path: 'crear',
        canActivate: [isLoggedGuard],
        loadComponent: async () =>
          (await import('./routes/articulos/pages/articulo-crear/articulo-crear.page'))
            .ArticuloCrearPage,
        title: 'CNP Market | Crear Articulo',
      },
      {
        path: 'usuario',
        canActivate: [isLoggedGuard],
        loadComponent: async () =>
          (
            await import(
              './routes/articulos/pages/articulos-usuario-listar/articulos-usuario-listar.page'
            )
          ).ArticulosUsuarioListarPage,
        title: 'CNP Market | Publicaciones',
      },

      {
        path: ':id_articulo',
        children: [
          {
            path: '',
            loadComponent: async () =>
              (await import('./routes/articulos/pages/articulo-detalle/articulo-detalle.page'))
                .ArticuloDetallePage,
            title: 'CNP Market | Articulo',
          },
          {
            path: 'comprar',
            canActivate: [isLoggedGuard],
            loadComponent: async () =>
              (await import('./routes/articulos/pages/articulo-comprar/articulo-comprar.page'))
                .ArticuloComprarPage,
            title: 'CNP Market | Pago',
          },
          // ##TODO: Crear Guard, isAdminOrOwner, para entrar y crear un boton que verifique lo mismo en el template de articulo
          {
            path: 'editar',
            canActivate: [isLoggedGuard],
            loadComponent: async () =>
              (
                await import(
                  './routes/articulos/pages/articulos-usuario-editar/articulos-usuario-editar.page'
                )
              ).ArticulosUsuarioEditarPage,
            title: 'CNP Market | Edita articulos',
          },
        ],
      },
    ],
  },

  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.page').then((m) => m.NotFoundPage),
    title: 'CNP Market | No encontrado',
  },
];
