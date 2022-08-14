const { Router } = require('express');
const Cars = require('../controllers/Cars');
const authMiddleware = require('../middlewares/authMiddleware');
const router = Router();

//getAll
//getOne
//add
//update
//remove
//localhost:5000/api/v1/cars

// router.post('/cars', authMiddleware, roleMiddleware(['admin', 'moderator']), Cars.add);

// router.get('/cars', authMiddleware, roleMiddleware(['admin']), Cars.getAll);
router.post('/cars', authMiddleware, Cars.add);

router.get('/cars', authMiddleware, Cars.getAll);

module.exports = router;

