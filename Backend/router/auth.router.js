const router = require("express").Router();
// const { postSignup, postLogin } = require("../controllers/auth.controller.js");
const { postSignup, postLogin } = require("../controllers/auth.controller");

// const { userValidationSchema } = require("../validations/user.validator");
const { userValidationSchema } = require("../validation/user.validator");

// const { loginBodyValidationSchema } = require("../validations/auth.validator");
const { loginBodyValidationSchema } = require("../validation/auth.validator");

// const { validateSchema } = require("../middlewares/validate.middleware");
const { validateSchema } = require("../middleware/validate.middleware");

const middleware = validateSchema(userValidationSchema);

const loginMiddleware = validateSchema(loginBodyValidationSchema);

router.post("/signup", middleware, postSignup);
router.post("/login", loginMiddleware, postLogin);

module.exports = router;
