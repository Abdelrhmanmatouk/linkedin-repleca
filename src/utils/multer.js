import multer, { diskStorage } from 'multer';


export function uploadfile() {
  const storage = diskStorage({});
 
  const multerUploud = multer({ storage });
  return multerUploud;
}
