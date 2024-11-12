const multer = require('multer');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const fs = require('fs');

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

const uploadSingle = (allowedFormats, fieldName, maxFileSize = MAX_SIZE) => {
  const fileFilter = (req, file, callback) => {
    const isAllowed = allowedFormats.includes(file.mimetype);
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("File type not allowed"), false);
    }
  };

  const uploadsDir = path.join(__dirname, '../../uploads');

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadsDir)
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    }),
    fileFilter,
    limits: { fileSize: maxFileSize }
  });

  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        const statusCode = StatusCodes.BAD_REQUEST;
        const message = err instanceof multer.MulterError ? err.message : err.toString();
        
        return res.status(statusCode).send({
          responseCode: statusCode,
          responseDesc: message
        });
      }
      next();
    });
  };
};

module.exports = {
  uploadSingle
};