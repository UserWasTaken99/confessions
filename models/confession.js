const mongoose=require('mongoose');

const schema=mongoose.Schema;
const confessionSchema=new schema({
    enc_ip:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
}, { timestamps:true });

const replySchema=new mongoose.Schema({
    to:{
        type: String,
        required: true
    },
    reply_txt:{
        type: String,
        required: false
    }
}, { timestamps:true });


const Confession=mongoose.model('Confession', confessionSchema);
const Reply=mongoose.model('Reply', replySchema);

module.exports={Confession, Reply};