const jwt = require("jsonwebtoken")

module.export = (req, res, next) => {
    try {
        const token = req.header.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userID = decodedToken.userId;
        req.auth = {
            userId: userId
        }
    } catch(error){
        res.status(401).json({error})
    }
}