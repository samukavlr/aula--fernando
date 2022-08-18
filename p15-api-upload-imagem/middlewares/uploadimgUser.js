const multer = require('multer')

module.exports = ( multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/upload/users')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + '_' + file.originalname)
        }
    }),
    fileFilter: (req, file, cb) =>{
        const extentionImg =['image/png', 'image/jpeg', 'image/jpng']
        .find(formatoAceito => formatoAceito == file.mimetype)

        if(extentionImg){
            return cb(null , true)
        }
        return cb(null, false)
    }
}))