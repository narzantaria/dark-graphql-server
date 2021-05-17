//Обработчик файлов (изображений)
import express from "express";
import path from "path";
import fs from "fs";
import fileUpload from "express-fileupload";
require("dotenv/config");

const OUTPUT_FOLDER = process.env.OUTPUT_FOLDER;

const router = express.Router();

const filesPath = path.join(__dirname, `../${OUTPUT_FOLDER}/files`);

router.use(fileUpload());

router.get("/", (req, res) => {
  // console.log('aaaaaaaaaaaaaa');
  fs.readdir(filesPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    res.json(files);
  });
});

router.post("/", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const sampleFile = req.files.file;
  const { name } = sampleFile;
  const uploadpath = process.cwd() + `/${OUTPUT_FOLDER}/files/` + name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadpath, function (err) {
    if (err) return res.status(500).send(err);
    res.json({ msg: "File uploaded!" });
  });
});

router.delete("/", async (req, res) => {
  const file = req.headers.filename;
  const removePath = process.cwd() + `/${OUTPUT_FOLDER}/files/` + file;
  try {
    await fs.unlink(removePath, (err) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      res.json({ msg: `File \"${file}\" has been removed from server` });
    });
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
