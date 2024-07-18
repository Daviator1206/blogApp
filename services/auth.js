const jwt = require("jsonwebtoken")
const secret = "Krishna$2003"

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
    }
    const token = jwt.sign(payload, secret)
    return token
}

function validateToken(token){
    const payload = jwt.verify(token, secret)
    return payload
}


module.exports = {createTokenForUser, validateToken}