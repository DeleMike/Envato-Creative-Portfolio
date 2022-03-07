const express = require('express')
const router = express.Router()

const {
   getHomePage,
   sendContactDetails,
} = require('../controllers/homeController')

router.route('/').get(getHomePage)
router.route('/send').post(sendContactDetails)

module.exports = router