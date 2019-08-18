const User = require('../Models/userModel');

class authService{
    constructor(){
        this.userModel = UserModel;
    }

    async register(body){
        if(!body.name || !body.email){
            return {
                message: 'name_or_password_is_require!',
                data: 0
            }
        }
        try
        {
            const user = new User(body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(200).send({user, token})
        }
        catch(error){
            res.status(400).send(error)
        }
    
    }
    
}

module.exports = new authService();