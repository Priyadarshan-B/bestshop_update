const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: async (req, file, cb) => {
    try {
      if (!req.body.name) {
        throw new Error('Original name not provided');
      }
      
      const original_name = req.body.name;
      const unique_identifier = Date.now(); 
      const file_name = `${unique_identifier}-${original_name}${path.extname(file.originalname)}`;
      cb(null, file_name);
    } catch (err) {
      cb(err);
    }
  }
});

const upload = multer({ storage: storage });

const image_uploader_middleware = (req, res, next) => {
  return new Promise((resolve, reject) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          req.body.image_path = '';
          resolve(next());
        } else {
          reject(err);
        }
      } else {
        if (!req.file) {
          req.body.image_path = '';
          resolve(next());
        } else {
          const image_path = path.join('uploads/images', req.file.filename);
          req.body.image_path = image_path; 
          resolve(next());
        }
      }
    });
  });
};

module.exports = image_uploader_middleware;
