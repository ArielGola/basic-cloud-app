require('dotenv').config()

const storage = process.env.HOME_CLOUD_STORAGE

if (!storage) {
    console.error('Storage path not defined')
    process.exit(1)
}

module.exports = storage