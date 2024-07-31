
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const next = require("next");

const { removeBackground } = require("@imgly/background-removal-node");

// const app = express();
const { v4: guid } = require("uuid");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

async function removeImageBackground(imgSource) {
  const blob = await removeBackground(imgSource, { debug: true });
  const buffer = Buffer.from(await blob.arrayBuffer());
  return buffer;
}



// Set up storage engine with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file ", file);
    console.log("req ", req);
    const uploadDir = path.resolve(__dirname, "public/uploads");
    console.log("uploadDir ", uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {

    cb(null, `${guid()}___${file.originalname}`);
  }
});

const upload = multer({ storage });

const uiAddress =  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "http://49.13.145.42";

nextApp.prepare()
  .then(() => {
    const app = express();
    app.use(cors({ origin: uiAddress }));



    // File upload endpoint
    app.post("/upload", upload.single("image"), async(req, res) => {
      try {
        console.log("req.file ", req.file);
        if (!req.file) {
          return res.status(400).send("No file uploaded");
        }
        const origFileName = req.file.filename;
        const uploadedFileDest = `${req.file.destination}/${req.file.filename}`;
        console.log("uploadedFileDest ", uploadedFileDest);
        const uploadedFile = fs.readFileSync(uploadedFileDest, "binary");
        const folderPath = uploadedFileDest.split("aura-bg\\")[1] || uploadedFileDest.split("aura-bg/")[1];
        console.log("folderPath ", folderPath);
        const result = await removeImageBackground(folderPath)
          .catch(error => console.error("Error removing background:", error));
        console.log("result ", result);
        const fileName = `${guid()}___${req.file.originalname}`;
        console.log("fileName ", fileName);
        const newPath = path.resolve(__dirname, `public/uploads/${fileName}`);
        console.log("newPath ", newPath);
        fs.writeFileSync(newPath, result);
        res.json({
          data: {
            message: "File uploaded successfully",
            imageUrl: fileName,
            origFileName
          }
        });
      }
      catch (err) {
        console.error("error", "server", err);
        return res.status(500).send("Internal server error");
      }
    });


    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });



// Serve uploaded files statically
// app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

//
// app.get('/file/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, 'uploads', filename);

//   if (fs.existsSync(filePath)) {
//     res.sendFile(filePath);
//   } else {
//     res.status(404).send('File not found');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
