const multer = require('multer')
const path = require('path')


const uploadFolder = 'uploadedFiles/'

const storage = multer.diskStorage({
    destination: uploadFolder,
    filename: (req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload= multer({storage:storage})

module.exports = upload