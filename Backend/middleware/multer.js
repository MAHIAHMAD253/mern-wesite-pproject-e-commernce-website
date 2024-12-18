import multer from "multer";

 const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage})
export default upload









// import fs from 'fs';
// import multer from 'multer';

// // Ensure 'uploads/' directory exists
// if (!fs.existsSync('uploads')) {
//     fs.mkdirSync('uploads');
// }

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'uploads/');
//     },
//     filename: (req, file, callback) => {
//         const uniqueSuffix = `${Date.now()}-${file.originalname}`;
//         callback(null, uniqueSuffix);
//     }
// });

// const upload = multer({ storage });
// export default upload;







