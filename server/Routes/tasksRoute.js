const express = require('express')
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken.js');

const {getTasks, updateATask, deleteATask,addATask}=   require('../controllers/taskController.js');


router.route('/').get(verifyToken,getTasks);
router.route('/add').post(verifyToken,addATask);
router.route('/update/:id').put(verifyToken,updateATask);
router.route('/delete/:id').delete(verifyToken,deleteATask);


module.exports = router;