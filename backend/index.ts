const multer = require('multer')
const multerS3 = require('multer-s3')

// Initialize multers3 with our s3 config and other options
const upload = multer({
	storage: multerS3({
		acl: 'public-read',
		metadata(req: any, file: any, cb: any) {
			cb(null, { fieldName: file.fieldname })
		},
		key(req: Request, file: File, cb: any) {
			cb(null, Date.now().toString() + '.png')
		},
	}),
})

// Expose the /upload endpoint
const app = require('express')()
const http = require('http').Server(app)

app.post('/upload', upload.single('photo'), (req: any, res: any, next: any) => {
	res.json(req.file)
})

let port = process.env.PORT || 3000
http.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
