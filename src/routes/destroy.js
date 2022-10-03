const router = require('express').Router()
const fs = require('fs')
const processPath = require('../lib/path')


router.get('/:path?', (req, res, next) => {
    try {
      
        var file

        const dirUrl = req.headers.referer.split('/')
        if (dirUrl.length < 5) {
            file = processPath(req.params.path).absolutePath
        } else {
            var concat
            for (let i = 0; i < dirUrl.length;) {
                concat = dirUrl[i] + '--'
                i++
            }
            file = processPath(concat + req.params.path).absolutePath
        }
        fs.unlink(file, (err) => {
            if (err) {
                next(err)
            }
        })
        res.redirect('/content')
        
    } catch (err) {
        next(err)
    };
})

module.exports = router