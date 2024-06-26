// viết code backend
const post = require ('../model/post')

class hompageController {
    // ham render cac bai viet ra giao dien
   async renderHome (req, res){
        try {
           var adressPost= await post.find({ category: 'diadiem' }).exec();
           var eventPost= await post.find({ category: 'sukien' }).exec();
            res.json(adressPost,eventPost)
        
        } catch (error) {
            console.log(error)
        }
   }

   // ham lay ra noi dung bai viet 
   async getConten (req, res){
        try {
            var content= await post.find({ slug: req.params.slug }).exec();
            res.json(content)
        } catch (error) {
            console.log(error)
        }
   }

   
}

module.exports = new hompageController ();