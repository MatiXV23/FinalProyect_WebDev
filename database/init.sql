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

-- ACA VAN LOS INSERT MANITOS, OJO AL GOL 

TRUNCATE TABLE articulos_carritos, carritos, articulos, categorias, credenciales, usuarios, ciudades RESTART IDENTITY CASCADE;

INSERT INTO ciudades (nombre) VALUES
('Salto'),
('Paysandú'),
('Bella Unión'),
('Artigas'),
('Rivera'),
('Tacuarembó'),
('Young'),
('Guichón'),
('Baltasar Brum'),
('Constitución'),
('Daymán'),
('Termas del Arapey'),
('San Antonio'),
('Colonia Lavalleja'),
('Tranqueras'),
('Vichadero'),
('Paso de los Toros'),
('Mercedes'),
('Fray Bentos');

insert into usuarios (is_admin, email, nombres, apellidos, id_ciudad, direccion, foto_url, nro_documento, reputacion) 
values 
(true, 'agu@gmail.com', 'Agustin', 'Cigaran', 3, 'calle 1', 'https://external-preview.redd.it/T1CjKMNYd4oViR3U1SHq7FRwM710QEnTyrboQRxuU0U.jpg?auto=webp&s=ae2c366ede78c8d798b0b78cb25cb9c5e951e088', '54812997', 3),
(false, 'brah@icloud.com', 'Brahian', 'Nuñez', 1, 'calle ABC', 'https://static.vecteezy.com/system/resources/previews/055/566/023/non_2x/cartoon-teacher-with-pointer-and-chalkboard-white-background-free-vector.jpg', '12345678', 5),
(false, 'mati@yahoo.net', 'Matias', 'Perez', 1, 'calle 56', 'https://www.vhv.rs/dpng/d/145-1454771_terrorist-csgo-png-transparent-png.png', '01001101', 1);

insert into credenciales (id_usuario, password_hash)
values
(1, 'cazaCurioso'),
(2, 'contraseñaSuperSecreta1'),
(3, 'contraseñaSuperSecreta2');

insert into categorias (nombre)
values 
('Computación'),
('Comestibles'),
('Plantas');

insert into articulos (id_categoria, id_vendedor, usado, con_envio, nombre, precio, moneda, descripcion, foto_url, cantidad)
values
(2, 1, true, false, 'Embutido de mortadela', '60', 'USD', 'Un embutido de mortadela, casi nuevo, comí un poco pero me llené', 'https://upload.wikimedia.org/wikipedia/commons/b/be/Mortadella.jpg', 1),
(1, 2, false, true, 'AirPods PRO', '3850', 'UYU', 'Auriculares nuevos en caja, importados de Miami', 'https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907_big.jpg.large.jpg', 64),
(3, 3, true, false, 'Paraiso canadiense', '650', 'UYU', 'Me regalaron este paraiso canadiense, pero en realidad vivo en un apartamento. Esta prácticamente nuevo', 'https://http2.mlstatic.com/D_NQ_NP_683954-MLU75782155351_042024-O.webp', 1);

insert into carritos (id_usuario)
values 
(1),
(2),
(3);

insert into articulos_carritos (id_carrito, id_articulo, cantidad)
values
(1, 3, 1),
(2, 1, 1),
(3, 2, 15);