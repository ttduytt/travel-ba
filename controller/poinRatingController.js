const poinRating = require('../model/poinRating')
const post = require ('../model/post')

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
        if(post){
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



}

module.exports= new poinRatingController()