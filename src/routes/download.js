const router = require('express').Router()
const mime = require('mime-types')
const processPath = require('../lib/path')


router.get('/:path?', (req, res, err) => {
    try {
        
        var file

        const dirUrl = req.headers.referer.split('/')
        if (dirUrl.length < 5) {
            file = processPath(req.params.path).absolutePath
        } else {
            dirUrl.splice(0, 4)
            var concat
            for (let i = 0; i < dirUrl.length;) {
                concat = dirUrl[i] + '--'
                i++
            }
            file = processPath(concat + req.params.path).absolutePath
        }
        const mimetype = mime.lookup(file)
        res.setHeader('Content-Disposition', `attachment; filename=${file}`)
        res.setHeader('Content-Type', mimetype)
        res.download(file)

    } catch (err) {
        next(err)
    }
})

module.exports = router