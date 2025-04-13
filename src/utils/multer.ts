import { diskStorage } from "multer";
import { extname } from "path";

export let multerCon = ({
    storage: diskStorage({
        destination:'./uploads',
        filename:(req,file,cb)=>{
            cb(null, `${Date.now()}${extname(file.originalname)}`)
        }
    })
})


export let multerUp = ({
    storage: diskStorage({
        destination:'./uploadTools',
        filename:(req,file,cb)=>{
            cb(null, `${Date.now()}${extname(file.originalname)}`)
        }
    })
})


export let multerPr = ({
    storage: diskStorage({
        destination:'./uploadProducts',
        filename:(req,file,cb)=>{
            cb(null, `${Date.now()}${extname(file.originalname)}`)
        }
    })
})