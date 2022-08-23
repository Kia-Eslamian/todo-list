const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {type: String, minLength: 3, maxLength: 20, required: true},
    lastName: {type: String, minLength: 3, maxLength: 30, required: true},
    password: {type: String, minLength: 8, required: true},
    email: {type: String, required: true, unique: true},
    isActive: {type: Boolean, default: false},

}, {timestamps: true});


userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
    } else {
        return next();
    }
});

userSchema.pre(['updateOne', 'findOneAndUpdate'], async function (next) {
    if (this._update['password']) {
        const salt = await bcrypt.genSalt()
        this._update.password = await bcrypt.hash(this._update.password, salt);
    } else {
        return next();
    }
});

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

const UserModel = model('user', userSchema);

module.exports = UserModel;
