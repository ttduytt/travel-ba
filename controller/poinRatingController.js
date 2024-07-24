const poinRating = require('../model/poinRating')
const post = require ('../model/post')
const user= require('../model/user')
class poinRatingController {
  async createPoinrating(req, res){
        try {
            const newrating= new poinRating(req.body)
           const result= await newrating.save()
            if(result){
                return res.json(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async statisticsRating(req, res) {
        try {
            // Bước 1: Thực hiện tổng hợp
            const aggregationResults = await poinRating.aggregate([
                {
                    $group: { 
                        _id: "$id_post",  // Nhóm theo id_post
                        totalPoinrating: { $sum: "$poinRating" },  // Tổng của poinRating
                        count: { $sum: 1 }  // Đếm số lượt đánh giá
                    } 
                },

            ]);
    
      // Bước 2: Lấy tiêu đề bài viết và kết hợp với kết quả tổng hợp
    const resultsWithTitles = await Promise.all(aggregationResults.map(async (result) => {
        const Post = await post.findById(result._id);
        if(Post){
            return {
                id_post: result._id,
                title: Post.title , 
                category:Post.category , 
                createdAt:Post.createdAt,
                totalPoinrating: result.totalPoinrating,
                count: result.count
            };
           
        }else{
            return res.json('bài viết không tồn tại')
        }
    
        }));
        
        resultsWithTitles.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

            res.json(resultsWithTitles);
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Lỗi khi xử lý yêu cầu' });
        }
    }

    async getAllRating (req, res){
        try {
            const listRating = await poinRating.find({id_post:req.params.id}).sort({ createdAt: -1 }).limit(10);
            const lastresult= await Promise.all(listRating.map(async(rating)=>{
                const User = await user.findById(rating.id_user);
                if (User) {
                    return {
                        id_post: rating.id_post,
                        id_user: rating.id_user,
                        name: User.name,
                        image: User.image, 
                        poinRating: rating.poinRating,
                        content: rating.content,
                        createdAt: rating.createdAt
                    };
                }
            }));
            res.json(lastresult.filter(item => item))
        } catch (error) {
            console.log(error)
        }
    }

    async getAllRatingWithLogin (req, res){
        try {
            const userRating = await poinRating.find({ id_post:req.params.id ,id_user:req.user.id }).sort({ createdAt: -1 })
            const ratings = await poinRating.find({ id_post:req.params.id , id_user: { $ne: req.user.id } }).sort({ createdAt: -1 }).limit(10);
            const allRating= userRating.concat(ratings)
            const lastResult = await Promise.all(allRating.map(async (rating) => {
                const User = await user.findById(rating.id_user);
                if (User) {
                    return {
                        _id:rating._id,
                        id_post: rating.id_post,
                        id_user: rating.id_user,
                        name: User.name,
                        image: User.image, 
                        poinRating: rating.poinRating,
                        content: rating.content,
                        createdAt: rating.createdAt
                    };
                }
            }));
          const CountUserRating= userRating.length
          const lastarr= lastResult.filter(item => item) // Lọc bỏ các giá trị null/undefined trong lastResult
            res.json({lastarr, CountUserRating}); 
        } catch (error) {
            console.log(error)
        }
    }

   async deleteRating(req, res){
        try {
           const result= await poinRating.deleteOne({_id:req.params.id})
           if(result.deletedCount>0){
            res.json('xóa thành công')
           }
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports= new poinRatingController()