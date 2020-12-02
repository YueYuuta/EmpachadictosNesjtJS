import { NotFoundException, ConflictException } from '@nestjs/common';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import * as sharp from 'sharp';
import * as fs from 'fs';

//VALIDA SI NO EXISTE UN DIRECTORIO ENTONCES LO CREA, EL DIRECTORIO SE LE ENVIA DINAMICAMENTE COMO PARAMETRO
export async function validateDirectory(filePath) {
  const existsPath = await verifyExistFila(filePath);
  if (!existsPath.response) {
    fs.mkdirSync(existsPath.envFilePath);
  }
}

// VERIFICA SI EXISTE UN DIRECTORIO, EL DIRECTORIO SE LE ENVIA DINAMICAMENTE COMO PARAMETRO
export async function verifyExistFila(filePath) {
  let response: boolean = true;
  const envFilePath = path.join(__dirname + './../../../' + filePath);

  const existsPath = fs.existsSync(envFilePath);
  if (!existsPath) {
    response = false;
  }

  return { response, envFilePath };
}
//VALIDA SI EXISTE UN DIRECTORIO ENTONCES LO BORRA, EL DIRECTORIO SE LE ENVIA DINAMICAMENTE COMO PARAMETRO
export async function deleteDirectory(filePath) {
  const existsPath = await verifyExistFila(filePath);
  if (existsPath.response === true) {
    fs.unlinkSync(existsPath.envFilePath);
  }
}

export async function manejoDeImagenes(req, filepath): Promise<string> {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new NotFoundException('Ingrese una imagen !!');
  }
  const file = req.files.file;
  if (file.size > 5e6) {
    throw new NotFoundException('Tamaño maximo para imagenes 5MB !!');
  }

  // Procesar la imagen...

  const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Validar extension
  const extensionesValidas = [
    'png',
    'jpg',
    'jpeg',
    'gif',
    'PNG',
    'JPG',
    'JPEG',
    'GIF',
  ];
  if (!extensionesValidas.includes(extensionArchivo)) {
    throw new ConflictException(
      'Formato de Archivo invalido, los formatos validos son: jpg, jpeg, png',
    );
  }
  // Generar el nombre del archivo
  const nombreArchivo = `${uuid()}.${extensionArchivo}`;

  //validar el directorio si no esta lo crea
  validateDirectory(filepath);

  // Path para guardar la imagen
  await sharp(file.data, { failOnError: false })
    .resize(500, 500)
    .toFile(path.join(`${__dirname} /../../../${filepath}/${nombreArchivo}`));
  // Mover la imagen
  return nombreArchivo;
}
