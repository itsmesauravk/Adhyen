import multer from "multer"

const uploader = multer({
  storage: multer.diskStorage({}),
})

export default multer
