export type Usuario = {
  id_usuario: number;
  email: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  is_admin: boolean;
  id_departamento: number;
  nro_documento: string;
  foto_url: string;
  reputacion: number;
  articulos_carrito: number[];
};

export type UsuarioSinId = Omit<Usuario,"id_usuario">     

export type UsuarioConPwd= {
  email: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  is_admin: boolean;
  id_departamento: number;
  nro_documento: string;
  password: string;
};
