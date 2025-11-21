import { MultipartFile } from "@fastify/multipart";
import { PC_BadRequest } from "../errors/errors.js";
import path from "path";
import fs from "fs/promises";

const PORT = Number(process.env.PORT) || 3000;
const ENVIRONMENT = process.env.NODE_ENV || "develpment";
const conection_type = ENVIRONMENT === "production" ? "https" : "http";
const API_URL = `${conection_type}://[::]:${PORT}`;

export async function saveFoto(
  id: number,
  type: "usuario" | "articulo",
  file?: MultipartFile
): Promise<{ foto_url: string }> {
  if (!file) throw new PC_BadRequest();

  const { filename } = file || "foto.jpg";

  const extension = filename.includes(".") ? filename.split(".").pop() : "jpg";

  const fileName = `${type}-${id}.${extension}`;
  const dir = path.join(process.cwd(), "fotos", type);

  const fotoPath = path.join(dir, fileName);

  const foto_url = `${API_URL}/fotos/${type}/${fileName}`;

  await fs.mkdir(dir, { recursive: true });

  const buffer = await file.toBuffer();
  await fs.writeFile(fotoPath, buffer);

  return { foto_url };
}
