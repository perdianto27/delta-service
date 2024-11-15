const { StatusCodes } = require('http-status-codes');

const Logger = require('../helpers/logger');

const logName = 'API Product';

let products = [];

const postProduct = async (request, reply) => {
  try {
    const { name, description, price } = request.body;

    const newProduct = {
      id: Date.now(),
      name,
      price,
      description,
    };

    products.push(newProduct);

    return reply
    .status(StatusCodes.CREATED)
    .send({
      responseCode: StatusCodes.CREATED,
      responseDesc: "Data berhasil disimpan"
  });
  } catch (error) {
    Logger.log([logName, 'POST Product', 'ERROR'], {
      message: `${err}`,
    });
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
        responseDesc: "Data gagal disimpan"
    });
  }
};


const getProduct = async (request, reply) => {
  try {
    return reply
    .status(StatusCodes.OK)
    .send({
      responseCode: StatusCodes.OK,
      responseDesc: "Berhasil mengambil data",
      data: products
  });
  } catch (error) {
    Logger.log([logName, 'GET Product', 'ERROR'], {
      message: `${err}`,
    });
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
        responseDesc: "Gagal mengambil data"
    });
  }
};


const getProductById = async (request, reply) => {
  try {
    const productId = Number(request.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        responseCode: StatusCodes.NOT_FOUND,
        responseDesc: "Produk tidak ditemukan"
      });
    }
    return reply.status(StatusCodes.OK).send({
      responseCode: StatusCodes.OK,
      responseDesc: "Berhasil mengambil data",
      data: product
    });
  } catch (error) {
    Logger.log([logName, 'GET Product by ID', 'ERROR'], { message: `${error}` });
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
      responseDesc: "Gagal mengambil data"
    });
  }
};

const updateProductById = async (request, reply) => {
  try {
    const productId = Number(request.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        responseCode: StatusCodes.NOT_FOUND,
        responseDesc: "Produk tidak ditemukan"
      });
    }

    Object.assign(product, request.body);

    return reply.status(StatusCodes.OK).send({
      responseCode: StatusCodes.OK,
      responseDesc: "Data berhasil diperbarui",
      data: product
    });
  } catch (error) {
    Logger.log([logName, 'UPDATE Product by ID', 'ERROR'], { message: `${error}` });
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
      responseDesc: "Gagal memperbarui data"
    });
  }
};

const deleteProductById = async (request, reply) => {
  try {
    const productId = Number(request.params.id);
    const productExists = products.some(p => p.id === productId);

    if (!productExists) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        responseCode: StatusCodes.NOT_FOUND,
        responseDesc: "Produk tidak ditemukan"
      });
    }

    products = products.filter(p => p.id !== productId);

    return reply.status(StatusCodes.OK).send({
      responseCode: StatusCodes.OK,
      responseDesc: "Data berhasil dihapus"
    });
  } catch (error) {
    Logger.log([logName, 'DELETE Product by ID', 'ERROR'], { message: `${error}` });
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
      responseDesc: "Gagal menghapus data"
    });
  }
};


module.exports = {
  postProduct,
  getProduct,
  getProductById,
  updateProductById,
  deleteProductById
};