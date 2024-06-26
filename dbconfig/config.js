const mongoose = require ('mongoose')

const atlat='mongodb+srv://truongtrongduy10:aQnvDL2tDwxav38u@travel.f6ykx3l.mongodb.net/myDB?retryWrites=true&w=majority&appName=travel'
const connect = async () => {
    try {
        await mongoose.connect(atlat,{

        })
        console.log('connect successfuly')
    } catch (error) {
        console.log('connect faild')
        console.log(error)
    }
}

module.exports ={connect}