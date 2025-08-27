const express = require('express')
const upload = require('../middlewares/upload.js');


const validateEmail = require('../middlewares/validateEmail.js');
const verifyToken = require('../middlewares/verifyToken.js')
const {registerUser,forgotPassword,resetPassword, loginUser, getAUser,updateProfileImage, updateUser, changePassword} = require('../controllers/userController.js');




const router = express.Router();

router.route('/register').post(validateEmail,registerUser);
router.route('/login').post(validateEmail,loginUser);
router.route('/').get(validateEmail,verifyToken,getAUser);
router.route('/me').get(verifyToken,getAUser);
router.route('/update').patch(verifyToken,updateUser);
router.route('/change-password').put(verifyToken,changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.post('/upload', upload.single('profileImage'), updateProfileImage);

module.exports = router;