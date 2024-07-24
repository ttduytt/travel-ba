const image= require ('../model/image')

class imageController {

   async getAllimage (req, res){
    try {
        const listImage=await image.find({})
        if (listImage.length>0){
            res.json(listImage)
        }else{
            res.json('không có dữu liệu')
        }
    } catch (error) {
        console.log(error)
    }
   }

   async addimage (req, res){
        try {
            var newimage= new image(req.body)
            var result= await newimage.save()
            res.json(result)
        } catch (error) {
            console.log(error)
        }
   }

  async UpdateLike (req, res){
    try {
        var result= await image.findByIdAndUpdate(req.params.id, {$inc:{like:1}}, {new:true})
        res.json(result)
     } catch (error) {
         console.log(error)
     }
   }

   async deleteImage (req, res){
    try {
        var result= await image.deleteOne({_id:req.params.id})
        if(result.deletedCount>0){
            res.json('Xóa thành công')
        }
    } catch (error) {
        console.log(error)
    }
   }

}

module.exports = new imageController()