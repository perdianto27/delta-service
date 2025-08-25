const multer = require('multer');
const path = require('path');

const { StatusCodes } = require('http-status-codes');

const Logger = require('../helpers/logger'); // Sesuaikan path Logger sesuai struktur proyek Anda

const logName = 'API Upload';
const uploadsDir = path.resolve(process.cwd(), 'uploads');

const uploadImage = (request, reply) => {
  if (!request.file) {
    return reply.status(StatusCodes.BAD_REQUEST).send({
      responseCode: StatusCodes.BAD_REQUEST,
      responseDesc: "Tidak ada file yang diunggah"
    });
  }

  try {
    return reply.status(StatusCodes.CREATED).send({
      responseCode: StatusCodes.CREATED,
      responseDesc: "Upload berhasil",
      data: {
        filePath: path.join('uploads', request.file.originalname)
      }
    });
  } catch (error) {
    console.log("Err", error.toString());
    Logger.log([logName, 'Upload Image', 'ERROR'], {
      message: `${error}`
    });
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
      responseDesc: "Upload image gagal"
    });
  }
};

const getFile = (request, reply) => {
  try {
    const { filename } = request.params;
    const filePath = path.join(uploadsDir, filename);

    reply.sendFile(filePath, (err) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).send({
          responseCode: StatusCodes.NOT_FOUND,
          responseDesc: "File tidak ditemukan"
        });
      }
    });
  } catch (error) {
    console.log("Err", error.toString());
    Logger.log([logName, 'Upload Image', 'ERROR'], {
      message: `${error}`
    });
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
      responseDesc: "Gagal mendapatkan file"
    });
  }
};

module.exports = {
  uploadImage,
  getFile
};