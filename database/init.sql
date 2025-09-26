CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

DROP TYPE IF EXISTS moneda_enum;
CREATE TYPE moneda_enum AS ENUM ('UYU', 'USD');

DROP TABLE IF EXISTS ciudades CASCADE;
CREATE TABLE IF NOT EXISTS ciudades (
    id_ciudad SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS usuarios CASCADE;
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    is_admin BOOLEAN NOT NULL,
    email CITEXT NOT NULL UNIQUE,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    id_ciudad INTEGER NOT NULL REFERENCES ciudades(id_ciudad) ON DELETE CASCADE,
    direccion VARCHAR(50) NOT NULL,
    foto_url VARCHAR(520),
    nro_documento CHAR(8) UNIQUE NOT NULL CHECK (nro_documento ~ '^[0-9]{8}$'),
    reputacion INTEGER CHECK (reputacion >= 1 AND reputacion <= 5)
);

-- Tabla con solo el hash
DROP TABLE IF EXISTS credenciales CASCADE;
CREATE TABLE IF NOT EXISTS credenciales (
    id_usuario INTEGER NOT NULL PRIMARY KEY REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    password_hash TEXT NOT NULL
);

DROP TABLE IF EXISTS categorias CASCADE;
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS articulos CASCADE;
CREATE TABLE IF NOT EXISTS articulos (
    id_articulo SERIAL PRIMARY KEY,
    id_categoria INTEGER NOT NULL REFERENCES categorias(id_categoria) ON DELETE CASCADE,
    id_vendedor INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    usado BOOLEAN NOT NULL,
    con_envio BOOLEAN NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    precio VARCHAR(50) NOT NULL,
    moneda moneda_enum NOT NULL,
    descripcion VARCHAR(180) NOT NULL,
    foto_url VARCHAR(520),
    cantidad INTEGER CHECK (cantidad >= 1 AND cantidad <= 64)
);

DROP TABLE IF EXISTS resenias CASCADE;
CREATE TABLE IF NOT EXISTS resenias (
    id_resenia SERIAL PRIMARY KEY,
    comentario VARCHAR(120) NOT NULL,
    reputacion INTEGER CHECK (reputacion >= 1 AND reputacion <= 5)
);

DROP TABLE IF EXISTS compras CASCADE;
CREATE TABLE IF NOT EXISTS compras (
    id_compra SERIAL PRIMARY KEY,
    id_articulo INTEGER NOT NULL REFERENCES articulos(id_articulo) ON DELETE CASCADE,
    id_comprador INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_resenia INTEGER REFERENCES resenias(id_resenia) ON DELETE CASCADE,
    fecha_compra TIMESTAMP NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS chats CASCADE;
CREATE TABLE IF NOT EXISTS chats (
    id_chat SERIAL PRIMARY KEY,
    id_comprador INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_vendedor INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_articulo INTEGER NOT NULL REFERENCES articulos(id_articulo) ON DELETE CASCADE
);

DROP TABLE IF EXISTS carritos CASCADE;
CREATE TABLE IF NOT EXISTS carritos (
    id_carrito SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

DROP TABLE IF EXISTS articulos_carritos CASCADE;
CREATE TABLE IF NOT EXISTS articulos_carritos (
    id_articulos_carritos SERIAL PRIMARY KEY,
    id_carrito INTEGER NOT NULL REFERENCES carritos(id_carrito) ON DELETE CASCADE,
    id_articulo INTEGER NOT NULL REFERENCES articulos(id_articulo) ON DELETE CASCADE,
    cantidad INTEGER CHECK (cantidad >= 1 AND cantidad <= 64)
);
