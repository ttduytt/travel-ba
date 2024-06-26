const user= require('../model/user')



class userController {
   async getUser (req,res){
        try {
            var listUser= await user.find({ deleted: {$ne: true} }).exec()
            if(listUser){
                res.json(
                    listUser
                )
            }else{
                res.json({
                    'message':'chưa có dữ liệu',
                })
            }
        } catch (error) {
            console.log(error)
        }
   }

   async getBlockUser(req, res) {
    try {
      // Sử dụng findDeleted để lấy tất cả các tài liệu bị xóa mềm
      var result = await user.find({ deleted: true });
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json({
          message: 'chưa có dữ liệu',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

   async addUser (req, res){
    try {
        console.log(req.body)
        const nguoidung = new user(req.body)
        var ketqua= await nguoidung.save()
        if (ketqua){
            res.json(nguoidung)
        }else{
            res.json({

                'data':ketqua
            })
        }
    } catch (error) {
        console.log(error)
    }
   }

   async deleteUser (req, res){
        try {
           var result= await user.deleteOne({ _id:req.params.id});
           if(result){
            res.json('xoa thanh cong')
           }else{
            res.json('xoa that bai')
           }
        } catch (error) {
            console.log(error)
        }
    
   }

   // hàm soft delete
   async blockUser (req, res){
    try {
       var result= await user.delete({ _id:req.params.id});
       if(result){
        res.json('chặn thanh cong')
       }else{
        res.json('chặn that bai')
       }
    } catch (error) {
        console.log(error)
    }

}

// hàm restore 
async restoreUser (req, res){
    try {
       var result= await user.restore({ _id:req.params.id});
       if(result){
        res.json('khôi phục thành công')
       }else{
        res.json('khôi phục thất bại')
       }
    } catch (error) {
        console.log(error)
    }
}


   async updateUser(req,res){
     try {
        await user.updateOne({ _id: req.params.id },req.body);
     } catch (error) {
        console.log(error)
     }
   }
}

module.exports = new userController()