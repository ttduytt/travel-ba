const jwt = require('jsonwebtoken')

class middlewareController {

// kiểm tra admin trước khi thực hiện các thao tác thêm sửa xóa
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


    // kiểm tra nếu người dùng thực hiện đánh giá thì kiểm tra xem login chưa
    // nếu rồi thì cập nhật id người dùng lấy từ token
    verifyAndUpdate (req, res, next){  // dùng cho chức năng thêm đánh giá
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

    // kiểm tra
    verifyToken(req, res, next){
       
            const token= req.headers.authorization
            if(token){
                const accessToken= token.split(' ')[1]
                jwt.verify(accessToken ,process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
                    if(err){
                        console.log(err)
                        return res.json('Token hết hạn hoặc không hợp lệ');
                    }
                    req.user=user
                    next()
                });
            }else{
                res.json('vui lòng login lại')
            }
           
    }
    
}

module.exports = new middlewareController()