export type Resenia = {
  id_resenia: number;
  id_vendedor: number;
  id_articulo: number;
  comentario: string;
  reputacion: number;
};

export type ReseniaPost = Omit<Resenia, 'id_resenia'>;
