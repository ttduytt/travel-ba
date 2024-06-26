const jwt = require('jsonwebtoken')

class middlewareController {

    verifyTokenAdmin (req, res, next){
       const token= req.headers.authorization
        if(token){
            const accessToken= token.split(' ')[1]
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
                if(err){
                    console.log(err)
                    return res.status(403).json('Token hết hạn hoặc không hợp lệ');
                }
                if(user.admin){
                    req.user=user
                    next()
                }
            })
        }else{
            return res.status(401).json('Bạn chưa đăng nhập');
        }
    }

    verifyAndUpdate (req, res, next){
        const token= req.headers.authorization
        if(token){
            const accessToken= token.split(' ')[1]
            jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
                if(err){
                    return res.json('token đã hết hạn bạn cần đăng nhập lại')
                }
            req.body.id_user= user.id
            next()
            })
        }else{
            return res.json('bạn cần đăng nhập lại')
        }
    }
}

module.exports = new middlewareController()