if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod')
}else{
    module.exports=require('./dev')
}

//JZdHi7WBjanhmRkM
//mongodb+srv://suryajeet_123:<password>@cluster0.ujkyc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority