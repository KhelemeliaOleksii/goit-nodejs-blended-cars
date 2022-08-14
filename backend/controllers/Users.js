const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');
class UserController {
    registration = asyncHandler(async (req, res) => {
        // 1. Отримуємо дані від користувача
        // 2. Валідуємо дані
        // 3. Перевіряємо, чи є користувач в базі даних
        // 4. Якщо є, то пишемо, що користувач вже є
        // 5. Хешуємо пароль
        // 6. Зберігаємо коритувача з хешованим паролем
        const { userName, userEmail, userPassword } = req.body;
        if (!(userName && userEmail && userPassword)) {
            res.status(400)
            throw new Error("Input all fields!")
        }

        const oldUser = await User.findOne({ userEmail });
        if (oldUser) {
            res.status(409)
            throw new Error("User already exists. Please login")
            //redirect to login
        }

        const hashPassword = await bcrypt.hash(userPassword, 5);

        const candidate = await User.create({ userName, userEmail, userPassword: hashPassword });
        if (!candidate) {
            res.status(400)
            throw new Error("Error of registration")
        }

        res.status(201).json({
            status: "success",
            code: 201,
            data: candidate,
        });
    })

    login = asyncHandler(async (req, res) => {
        // 1. Отримуємо дані від користувача
        // 2. Валідуємо дані
        // 3. Перевіряємо, чи є користувач в базі даних
        // 4. Якщо немає користувача з таким email, то просимо зареєструватися
        // 5. Порівнюємо логін пароль, передані користувачем, з тим що є в базі даних
        // 6. Якщо непраильно: " Неправильний логін або пароль"
        // 7. Якщо все гараз - генеруэмо токен 
        const { userEmail, userPassword } = req.body;
        if (!(userEmail && userPassword)) {
            res.status(400)
            throw new Error("Input all fields!")
        }
        const candidate = await User.findOne({ userEmail });
        if (!candidate) {
            return res.status(404).json({
                message: "Please register"
            });
        }
        if (!(candidate && (await bcrypt.compare(userPassword, candidate.userPassword)))) {
            res.status(400)
            throw new Error("Invalid login or password!");
        }
        const payload = {
            id: candidate._id,
            food: "pizza",
            drink: "beer",
        }

        candidate.token = this.generateToken(payload);
        candidate.hobbies = ['read', 'play piano'];

        await candidate.save();

        if (!candidate) {
            res.status(400)
            throw new Error("Login error")
        }

        res.status(200).json({
            status: "Login success",
            code: 200,
            data: {
                userName: candidate.userName,
                userEmail: candidate.userEmail,
                token: candidate.token,
            }
        })
    })

    logout = asyncHandler(async (req, res) => {
        // 1. Зчитуємо req.user._id
        // 2. Шукаємо користувача по Id
        // 3. записуємо користувачеві token = null
        console.log(req.user);
        const { _id } = req.user;
        const candidate = await User.findById(_id);
        if (!candidate) {
            res.status(400)
            throw new Error("Logout error")
        }
        candidate.token = null;
        await candidate.save();
        res.status(200).json({
            status: `Logout success with ${_id}`,
        })
    })

    getAllUsers = asyncHandler(async (req, res) => {
        console.log(req.user);
        const { _id } = req.user;
        const candidate = await User.findById(_id);
        if (!candidate.token) {
            res.status(401)
            throw new Error("Not Authorized")
        }
        const users = await User.find({});
        res.status(200).json(users);
    })

    generateToken = (payload) => {
        return JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
    }
}


module.exports = new UserController();