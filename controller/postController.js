const { json } = require('express')
const post = require('../model/post')
const poinRating = require('../model/poinRating')

class postController{

    // lấy ra danh sách bài viết
    async getPost (req, res){
        try {
            const posts= await post.find().exec()
            res.json(posts)
        } catch (error) {
            console.log(error)
        }
    }
    // ham them bai viet
    async addPost (req, res){
        try {
            const baiviet = new post(req.body)
            var ketqua= await baiviet.save()
            if (ketqua){
                res.json({
                    'status':200,
                    'tin message':'them thanh cong',
                    'data':ketqua
                })
            }else{
                res.json({
                    'status':400,
                    'tin message':'them that bai',
                    'data':ketqua
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // xóa bài viết
   async deletePost (req,res){
        try {
          const result=  await post.deleteOne({_id: req.params.id} )
          if(result.deletedCount>0){
            await this.deleteAllPoinRatingWithPost(req.params.id);
            res.json('Xóa thành công')
          }
        } catch (error) {
            console.log(error)
        }
    }

    // xóa bỏ các bài đánh giá nếu như bài viết bị xóa bỏ
    async deleteAllPoinRatingWithPost(idPost){
        try {
            await poinRating.deleteMany({id_post:idPost})
        } catch (error) {
            console.log(error)
        }
    }

    // update posst

   async updatePost (req,res){
    try {
        const result= await post.updateOne({_id:req.params.id},req.body)
        if (result.nModified === 0) {
            // Không có bản ghi nào được cập nhật
            return res.status(400).json('Cập nhật thất bại');
          }
      
          // Thành công
          return res.json('Cập nhật thành công');
    } catch (error) {
        console.log(error)
    }
   }

   // lấy ra bài viết theo thể loại
   async getPostType(req, res) {
    try {
        const posts = await post.find({ category: req.params.type }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

    async getOnePost (req,res){
        try {
            const Post= await post.findOne({title: req.params.keyword})
            res.json(Post)
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async updateView (req, res){
        try {
            await post.findByIdAndUpdate(req.params.id, {$inc:{view:1}} , {new:true})
            
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    // lấy ra các bàu viết và sắp sếp lượt view theo chiều đi xuống
    async getPostDown (req, res){
        try {
            const Posts= await post.find().sort({view:-1}).exec()
           
            res.json(Posts)
        } catch (error) {
            console.log(error)
        }
    }

    async getdynamicSearch (req, res){
        try {
            const query = {};
            const sort = {};
    
            const dynamicSearch= req.body
            for(let key in dynamicSearch){
                if(dynamicSearch.hasOwnProperty(key)){
                    if (key==='category'){
                        query[key]=dynamicSearch[key]
                    }else{
                        sort[key]=dynamicSearch[key]
                    }
                }
            }
           const posts= await post.find(query).sort(sort).exec()
           res.json(posts)
    
        } catch (error) {
            console.log(error)
        }
      
    }

    async getSuggestPost(req, res){
        try {
            const suggestPosts= await post.find({category:req.params.kind, _id:{$ne:req.params.id} })
            if (suggestPosts){
                res.json(suggestPosts)
            }else{
                res.json('ko tim thay dl')
            }
        } catch (error) {
            console.log(error)
        }
        
    }


    async getPostByKeyWord(req, res){
        try {
            const keyword= new RegExp(req.params.keyword,'i')
            const listPost= await post.find({
                $or:[
                    {title:keyword},
                    {category:keyword}
                ]
            });
            listPost.length>0? res.json(listPost) : res.json('Không tìm thấy dữ liệu phù hợp')
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new postController()

