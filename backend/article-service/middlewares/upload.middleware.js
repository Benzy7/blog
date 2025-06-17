const multer = require('multer');
const path = require('path');

//TODO
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = file.fieldname + '-' + Date.now() + ext;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .jpeg, .png allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
