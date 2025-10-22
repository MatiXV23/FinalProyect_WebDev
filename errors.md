# 📘 Listado de Errores Personalizados

Este documento describe los errores personalizados definidos en el sistema.
Cada error hereda de la clase base `PC_Error` y contiene los siguientes campos:

* **message**: descripción del error.
* **statusCode**: código HTTP correspondiente.
* **error**: identificador interno del tipo de error.

---

## 🧩 Clase base: `PC_Error`

| Propiedad    | Tipo   | Descripción                    |
| ------------ | ------ | ------------------------------ |
| `message`    | string | Mensaje descriptivo del error. |
| `statusCode` | number | Código HTTP asociado al error. |
| `error`      | string | Nombre interno del error.      |

**Constructor:**

```ts
new PC_Error(message: string, statusCode: number, error: string)
```

---

## ⚠️ `PC_BadRequest`

| Campo                     | Valor                           |
| ------------------------- | ------------------------------- |
| **statusCode**            | `400`                           |
| **error**                 | `"PC_BadRequest"`               |
| **message (por defecto)** | `"Hay algo mal en la consulta"` |

**Descripción:**
El cliente realizó una solicitud inválida o mal formada.

---

## 🔒 `PC_NoAuthorized`

| Campo                     | Valor                                              |
| ------------------------- | -------------------------------------------------- |
| **statusCode**            | `401`                                              |
| **error**                 | `"PC_NoAuthorized"`                                |
| **message (por defecto)** | `"No tienes permisos para realizar esta consulta"` |

**Descripción:**
Indica que el cliente no está autenticado o carece de credenciales válidas.

---

## 🚫 `PC_Forbidden`

| Campo                     | Valor                  |
| ------------------------- | ---------------------- |
| **statusCode**            | `403`                  |
| **error**                 | `"PC_Forbidden"`       |
| **message (por defecto)** | `"Consulta Prohibida"` |

**Descripción:**
El cliente está autenticado pero no tiene permiso para acceder al recurso solicitado.

---

## 🔍 `PC_NotFound`

| Campo                     | Valor                     |
| ------------------------- | ------------------------- |
| **statusCode**            | `404`                     |
| **error**                 | `"PC_NotFound"`           |
| **message (por defecto)** | `"Recurso no encontrado"` |

**Descripción:**
El recurso solicitado no existe o no se pudo encontrar.

---

## 💥 `PC_InternalServerError`

| Campo                     | Valor                      |
| ------------------------- | -------------------------- |
| **statusCode**            | `500`                      |
| **error**                 | `"PC_InternalServerError"` |
| **message (por defecto)** | `"Error en el servidor"`   |

**Descripción:**
Ocurrió un error inesperado en el servidor.

---

## 🧪 `PC_NotImplemented`

| Campo                     | Valor                                    |
| ------------------------- | ---------------------------------------- |
| **statusCode**            | `501`                                    |
| **error**                 | `"PC_NotImplemented"`                    |
| **message (por defecto)** | `"Funcionalidad sin implementacion aun"` |

**Descripción:**
La funcionalidad solicitada no ha sido implementada todavía.

---