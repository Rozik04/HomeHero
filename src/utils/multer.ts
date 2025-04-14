import { diskStorage } from 'multer';
import { extname } from 'path';

const createMulterStorage = (destination: string) => ({
  storage: diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${extname(file.originalname)}`);
    }
  })
});

export const multerCon = createMulterStorage('./uploads');
export const multerUp = createMulterStorage('./uploadTools');
export const multerPr = createMulterStorage('./uploadProducts');
export const multerMs = createMulterStorage('./uploadMasters');
export const multerPs = createMulterStorage('./uploadPassports');
export const multerPar = createMulterStorage('./uploadPartners');
export const multerShow = createMulterStorage('./uploadShowCases');