const authService = require('../Services/authService');

class authController {
    constructor(){
        this.authService = AuthService;
    }

    //register
    async register({req, res, next}){
        const { body } = req;
        const result = await this.authService.register(body);
        console.log(result);
        return res.json(result);
    }
}

module.exports = new authController();