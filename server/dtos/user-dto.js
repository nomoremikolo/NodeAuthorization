module.exports = class UserDto{
    id
    email
    phone

    constructor(model){
        this.email = model.email
        this.phone = model.phone
        this.id = model._id
    }
}