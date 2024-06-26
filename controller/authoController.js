const jwt =require('jsonwebtoken')
const User = require('../model/user')
require ('dotenv').config()
class authController {


    getAccessToken (user){
       return jwt.sign({
            id:user._id,
            admin:user.admin
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'300s'}
    )
    }

    getRfreshToken (user){
        return jwt.sign({
             id:user._id,
             admin:user.admin
         },
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn:'1d'}
     )
     }
    // login
    async login (req, res){
        try {
            const user= await User.findOne({username:req.body.username})
            if(user){
                const validator=  user.password===req.body.password
                if(user && validator){
                    const accessToken= jwt.sign({
                        id:user._id,
                        admin:user.admin
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'300s'}
                ) 
                    const refreshToken=jwt.sign({
                        id:user._id,
                        admin:user.admin
                    },
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn:'600s'}
                )
                // thêm refreshtoken và db
                await User.findOneAndUpdate({_id:user._id}, {refreshtoken:refreshToken})
                // Gửi token về phía client
                res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path:'/',
                secure: false, // Chỉ sử dụng trong môi trường production với HTTPS
                sameSite:'strict'
                });
                
                 res.status(200).json({ accessToken, user});
                }else{
                res.json('sai mk')
            }
            }else{
                res.json('sai tài khoản')
            }

        } catch (error) {
            console.log(error)
        }
    }

    async requestRefreshToken (req, res){
       try {
        const refreshToken = req.cookies.refreshToken;
         if(!refreshToken){
            return res.json('bạn cần phải đăng nhập')
         }
          
            if(!await User.findOne({ refreshtoken: refreshToken })){
                return res.json('refresh token đã hết hạn')
            }
       
     
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user)=>{
            if (err){
                return res.json(err)
            }else{
                const newAccessToken= jwt.sign({
                    id:user.id,
                    admin:user.admin
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'300s'}
            )
                const newRefreshToken= jwt.sign({
                    id:user.id,
                    admin:user.admin
                },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
            )
                await User.findOneAndUpdate({_id:user.id}, {refreshtoken:newRefreshToken})
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    path:'/',
                    secure: false, // Chỉ sử dụng trong môi trường production với HTTPS
                    sameSite:'strict'
                });
                res.json(newAccessToken)
            }
         })
         
       } catch (error) {
        console.log(error)
       }

    }
}

module.exports = new authController()