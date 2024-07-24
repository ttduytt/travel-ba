const category= require ('../model/category')

class categoryController {
    async addcategory (req, res){
        try {
            var newCategory = new category(req.body)
            var result = await newCategory.save()
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }

    async getAllcategory (req,res){
     try {
        const categorys= await category.find()
        res.json(categorys)
     } catch (error) {
        console.log(error)
     }
    }

    async Deletecategory (req, res){
        try {
           const result= await category.deleteOne({_id:req.params.id})
           if(result.deletedCount>0){
            res.json('xóa thành công')
           }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports= new categoryController()