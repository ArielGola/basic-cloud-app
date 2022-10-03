const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const processPath = require('../lib/path')


router.post('/:path?', async (req, res, next) => {
    try {
        
        var dirPath

        const dirUrl = req.headers.referer.split('/')

        var fullPath = req.params.path.split('--')

        var name = fullPath[fullPath.length-1]
        
        if (dirUrl.length < 5) {
            dirPath = processPath('')
        } else {
            dirUrl.splice(0, 4)
            var concat
            for (let i = 0; i < dirUrl.length;) {
                concat = dirUrl[i] + '--'
                i++
            }
            dirPath = processPath(concat)
        }

        await fs.promises.mkdir(path.join(dirPath.absolutePath, name))

        res.redirect('/content')
    } catch (err) {
        return next(err)
    }
})

module.exports = router