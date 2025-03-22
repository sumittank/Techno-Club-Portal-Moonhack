const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fire_noc_documents",
    allowed_formats: ["jpg", "png", "pdf"],
  },
});

const upload = multer({ storage });

module.exports = upload;
