const pendingPost = require('../model/pendingPost')
const mongoose= require('mongoose')

class pendingPostController {
    async addPendingPost (req, res){
        try {
            var newpendingPost= new pendingPost(req.body)
            var result= await newpendingPost.save()
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }

    async getPendingPostNotAccept (req, res){
        try {
            const listPendingPost=await pendingPost.find({accept:false})
            if (listPendingPost.length>0){
                res.json(listPendingPost)
            }else{
                res.json('không có dữ liệu')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async refusePendingPost(req, res){
        try {
          var result= await pendingPost.deleteOne({_id: req.params.id}) 
          if(result.deletedCount===1){
            res.json('xóa thành công')
          }else{
            res.json('không tìm thấy tài liệu phù hợp')
          }
        } catch (error) {
            console.log(error)
        }
    }

    async getOnePendingPost (req, res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.json('giá trị tìm kiếm không hợp lệ')
            }
            const post= await pendingPost.findById(req.params.id)
            if(post){
                res.json(post)
            }else{
                res.json('không tìm thấy dữ liệu khớp')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getPendingPostByType (req, res){
        try {
            const listPost= await pendingPost.find({kindService: req.params.type, accept:true})
            if(listPost.length>0){
                res.json(listPost)
            }else{
                res.json('không tìm thấy dữ liệu phù hợp')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async acceptPendingPost (req, res){
        try {
           if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.json('id không hợp lệ')
           }
           const result= await pendingPost.findByIdAndUpdate(req.params.id, req.body, { new: true })
           if (result){
            res.json('đã duyệt bài viết')
           }else{
            res.json('không tìm thấy dữ liệu phù hợp')
           }
        } catch (error) {
            console.log(error)
        }
    }

    async updateView(req, res){
        try {
           var result= await pendingPost.findByIdAndUpdate(req.params.id, {$inc:{view:1}}, {new:true})
           res.json(result)
        } catch (error) {
            console.log(error)
        }
    }

    async updateLike (req, res){
        try {
            var result= await pendingPost.findByIdAndUpdate(req.params.id, {$inc:{like:1}}, {new:true})
            res.json(result)
         } catch (error) {
             console.log(error)
         }
    }

    async getPendingPostAccept (req, res){
        try {
            const listservice=await pendingPost.find({accept:true})
            if (listservice.length>0){
                res.json(listservice)
            }else{
                res.json('không có dữ liệu')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteService (req, res){
        try {
            var result= await pendingPost.deleteOne({_id: req.params.id}) 
            if(result.deletedCount===1){
              res.json('xóa thành công')
            }else{
              res.json('không tìm thấy tài liệu phù hợp')
            }
          } catch (error) {
              console.log(error)
          }
    }
}

module.exports = new pendingPostController()