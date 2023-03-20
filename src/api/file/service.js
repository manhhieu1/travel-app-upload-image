import httpStatus from "http-status";
import config from "../../config/index.js";
import { APIError } from "../../common/api-res.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import FileModel from "../../sequelize/model/file.js";
import imagemin from "imagemin";
import sharp from "sharp";
import mozjpeg from "imagemin-mozjpeg";
import isJpg from "is-jpg";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // console.log("directory-name 👉️", __dirname);

// const upload = async (image) => {
//   if (!image) throw new APIError("", httpStatus.BAD_REQUEST);

//   let res = {};
//   const imagePath = __dirname + "/../../../upload/";
//   res.url = `${config.END_POINT}/image/${image.name}`;

//   fs.readdirSync(imagePath).forEach((file) => {
//     if (file == image.name) return res;
//   });
//   image.mv(imagePath + image.name);

//   return res;
// };

const upload = async (name, data, size) => {
  if (!name || !data) throw new APIError("", httpStatus.BAD_REQUEST);

  // console.log(data);
  let res = {};

  //get file name and extend
  let ext = name.substring(name.lastIndexOf(".") + 1);
  let fname = name.slice(0, name.lastIndexOf("."));

  //convert buffer to jpeg
  if (!isJpg(data)) {
    data = await sharp(data).jpeg().toBuffer();
    ext = "jpeg";
  }

  //reduce image size
  const quality =
    size < config.COMPRESS_FILE_SIZE
      ? 100
      : (config.COMPRESS_FILE_SIZE / size) * 100;
  const miniBuffer = await imagemin.buffer(data, {
    plugins: [mozjpeg({ quality: quality })],
  });
  //convert to base64 string
  const base64Data = miniBuffer.toString("base64");

  let nameConflict = true;
  let count = 1;
  //check file name conflict
  while (nameConflict) {
    const file = await FileModel.findOne({ where: { name } });
    if (!file) nameConflict = false;
    else {
      name = fname + count++ + "." + ext;
    }
  }
  const fileUpload = await FileModel.create({
    name,
    data: base64Data,
  });
  if (fileUpload) res.url = config.END_POINT + "/files/" + name;

  return res;
};

const getImg = async (name) => {
  const image = await FileModel.findOne({
    attributes: ["name", "data"],
    where: { name },
  });
  if (!image) throw new APIError("Không tìm thấy ảnh", httpStatus.NOT_FOUND);

  return image;
};

export default { upload, getImg };
