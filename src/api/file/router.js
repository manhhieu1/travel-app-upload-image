import Router from "express";
import controller from "./controller.js";
import validation from "./validation.js";
import validate from "../../express/middleware/validate.js";
// import { validate } from "express-validation";

const router = Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Uploads a file.
 *     tags:
 *     - Accounts
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: upfile
 *         type: file
 *         description: The file to upload
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/upload").post(controller.upload);

router.route("/files/:name").get(controller.getImg);

export default router;
