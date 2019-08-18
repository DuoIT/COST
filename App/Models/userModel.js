const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true, trim: true},
    password: {type: String, required: true, minlength: 7},
    email: {type: String, required: true,  unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            require: true
        }
    }],
    phone: {type: Number, required: true},
    dateCreate: {type: Date, required: true}
})

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if (!user)
    {
        throw new Error({error: 'Invalid login credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        throw new Error({error: 'Invalid login credentials'})
    }
    return user
}

const User = mongoose.model('User', userSchema);
module.exports = User;