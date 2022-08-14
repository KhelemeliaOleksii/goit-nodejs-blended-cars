const asyncHandler = require("express-async-handler");
const JWT = require('jsonwebtoken');
const User = require("../models/User");

module.exports = asyncHandler(async (req, res, next) => {
    // 1. Який метод запиту прийшов
    // 2-3. Зчитати токен з заголовка
    // 2-3. Перевірити, що це токен авторизації
    // 4. Якщо токен не передали або не токен авторизації - "Непереданий токен"
    // 5. Розпаршуємо токен
    // 6. Передаємо інформацію з токена для подальшого користування
    if (req.method === 'OPTIONS') {
        next();
    }
    if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
        res.status(400);
        throw new Error('Token authorization is not send');
    }
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const candidate = await User.findById(decoded.id).select('-userPassword -createdAt');
        if (!candidate) {
            res.status(403);
            throw new Error('Forbidden');
        }
        req.user = candidate;
        next();
    } catch (error) {
        res.status(403);
        throw new Error('Forbidden');
    }

})