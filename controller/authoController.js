const jwt =require('jsonwebtoken')
const User = require('../model/user')


require ('dotenv').config()
class authController {

    // kiểm tra xem người dùng có được phép vào các page của admin không: trả về dữ liệu cho guard
    verifyIsAdmin(req, res){
        const token= req.headers.authorization
        if(token){
            const accessToken= token.split(' ')[1]
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
                if(err){
                    console.log(err)
                    return res.json(false);
                }
                
                if(user.admin){
                    res.json(true)
                }else{
                    return res.json(false);
                }

            })
        }else{
            return res.json(false);
        }
    }


    // getAccessToken (user){
    //    return jwt.sign({
    //         id:user._id,
    //         admin:user.admin
    //     },
    //     process.env.ACCESS_TOKEN_SECRET,
    //     {expiresIn:'300s'}
    // )
    // }

    // getRfreshToken (user){
    //     return jwt.sign({
    //          id:user._id,
    //          admin:user.admin
    //      },
    //      process.env.REFRESH_TOKEN_SECRET,
    //      {expiresIn:'1d'}
    //  )
    //  }



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
                    {expiresIn:'15s'}
                ) 
                    const refreshToken=jwt.sign({
                        id:user._id,
                        admin:user.admin
                    },
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn:'7d'}
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
                res.json('Tài khoản hoặc mật khẩu không chính xác')
            }
            }else{
                res.json('Tài khoản hoặc mật khẩu không chính xác')
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
                {expiresIn:'15s'}
            )
                const newRefreshToken= jwt.sign({
                    id:user.id,
                    admin:user.admin
                },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'7d'}
            )
                await User.findOneAndUpdate({_id:user.id}, {refreshtoken:newRefreshToken})
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    path:'/',
                    secure: false, // Chỉ sử dụng trong môi trường production với HTTPS
                    sameSite:'strict'
                });
                res.json({newAccessToken})
            }
         })
         
       } catch (error) {
        console.log(error)
       }

    }

    getcktoken (){
        const user = req.user;
        const token = jwt.sign({
            id:user.id,
            admin:user.admin
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1h'}
    );
        res.json({ token });
    }

    async logOut(req, res){
        try {
            var rfToken= req.cookies.refreshToken
            if(rfToken){
                res.clearCookie('refreshToken')
                // xóa refreshtoken khỏi db
               var logoutok= await User.findOneAndUpdate({refreshtoken:req.cookies.refreshToken}, {refreshtoken:''},{new:true}) 
               if (logoutok){
                res.json('đăng xuất thành công')
               }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new authController()