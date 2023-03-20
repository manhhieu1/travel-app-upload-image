import Service from "./service.js";
import { APIError, APISuccess } from "../../common/api-res.js";
import httpStatus from "http-status";

const upload = async (req, res, next) => {
  const { image } = req.files;
  Service.upload(image.name, image.data, image.size)
    .then((data) => {
      return new APISuccess(res, {
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getImg = async (req, res, next) => {
  const { name } = req.params;
  Service.getImg(name)
    .then((image) => {
      res.ContentType = "application/octet-stream";
      res.attachment(image.name); // This is sails.js specific (in general you need to set headers)
      res.end(new Buffer.from(image.data, "base64"));
      // return new APISuccess(res, {
      //   data,
      // });
    })
    .catch((err) => {
      next(err);
    });
};

export default { upload, getImg };
