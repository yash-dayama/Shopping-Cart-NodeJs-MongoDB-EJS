const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
exports.getErrorMessage = (mongooseException) => {
  try {
    const mainJSONKeys = Object.keys(mongooseException.errors);
    if (mongooseException.errors[mainJSONKeys[0]].errors) {
      const jsonKeys = Object.keys(
        mongooseException.errors[mainJSONKeys[0]].errors
      );
      return {
        error:
          mongooseException.errors[mainJSONKeys[0]].errors[jsonKeys[0]]
            .properties.message,
      };
    } else {
      return {
        error: mongooseException.errors[mainJSONKeys[0]].message,
      };
    }
  } catch (e) {
    return {
      error: mongooseException.message,
    };
  }
};

exports.getRandomUUID = () => {
  return new mongoose.Types.ObjectId();
};

exports.useProductionSettings = () => {
  return process.env.isProduction == true || process.env.isProduction == "true";
};

exports.getBaseURL = () => {
  let baseURL = process.env.HOST;
  if (process.env.isProduction == "false") {
    baseURL += ":" + process.env.PORT;
  }
  return baseURL;
};

exports.generateRandomFileName = (filename) => {
  var ext = filename.split(".").pop();
  var random = Math.floor(Math.random() * 9000000000000000);
  let timestamp = new Date().getTime().toString();
  filename = timestamp + "_" + random + "." + ext;
  return filename;
};

exports.generateRandomPassword = (length) => {
  var result = "";
  // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.getDates = (start, end) => {
  var arr = new Array(),
    dt = new Date(start);
  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};

exports.getDate = () => {
  var d = new Date();
  return (
    d.getFullYear() +
    "-" +
    this.addZero(d.getMonth() + 1) +
    "-" +
    this.addZero(d.getDate()) +
    " " +
    this.addZero(d.getHours()) +
    ":" +
    this.addZero(d.getMinutes()) +
    ":" +
    this.addZero(d.getSeconds())
  );
};

exports.getDateFormat = (d) => {
  return (
    d.getFullYear() +
    "-" +
    this.addZero(d.getMonth() + 1) +
    "-" +
    this.addZero(d.getDate())
  );
};

exports.getDateTimeFormat = (d) => {
  return (
    d.getFullYear() +
    "-" +
    this.addZero(d.getMonth() + 1) +
    "-" +
    this.addZero(d.getDate()) +
    " " +
    this.addZero(d.getHours()) +
    ":" +
    this.addZero(d.getMinutes()) +
    ":" +
    this.addZero(d.getSeconds())
  );
};

exports.addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

exports.isImageFile = (fileOriginalname) => {
  return fileOriginalname
    .toLocaleLowerCase()
    .match(
      /\.(jpg|jpeg|jpe|jif|jfif|jfi|png|bmp|webp|tiff|tif|dib|svg|svgz)$/
    ) == undefined
    ? false
    : true;
};

exports.isImageOrPDFFile = (fileOriginalname) => {
  return fileOriginalname
    .toLocaleLowerCase()
    .match(
      /\.(jpg|jpeg|jpe|jif|jfif|jfi|png|bmp|webp|tiff|tif|dib|svg|svgz|pdf)$/
    ) == undefined
    ? false
    : true;
};

exports.isValidVideoFile = (fileOriginalname) => {
  return fileOriginalname
    .toLocaleLowerCase()
    .match(/\.(mp4|3gp|avi|webm|mov)$/) == undefined
    ? false
    : true;
};

exports.isValidPDFFile = (fileOriginalname) => {
  return fileOriginalname.toLocaleLowerCase().match(/\.(pdf)$/) == undefined
    ? false
    : true;
};

exports.replaceImagePath = (content, path) => {
  // storage.copyFile(storage.Folders.PageImage, path);
  return content;
};

exports.encodeId = async (content) => {
  let data = await bcrypt.hash(content, 8);
  return data;
};
