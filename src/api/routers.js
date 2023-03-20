import { Router } from "express";
import httpStatus from "http-status";
import file from "./file/router.js";

const router = Router();

router.use(file);

// router.use(admin);

router.use("*", (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    error: {
      message: "COMMON_ERR_018",
      errors: [
        {
          message: ["Server not found."],
        },
      ],
    },
  });
});

export default router;
