import multer from 'multer';
import path from 'node:path';

const TEMP_PATH = path.join(process.cwd(), 'temp');

const storage = multer.diskStorage({
    destination: TEMP_PATH,
});

const upload = multer({ storage });

export default upload;
