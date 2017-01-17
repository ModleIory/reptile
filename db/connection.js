//专门给应用开一个链接的,当被require了就回执行的哟so wonderful
const mongoose = require('mongoose')
const config = require('./config')

const url = `mongodb://${config.host}:${config.port}/${config.db}`

mongoose.connect(url)


const db = mongoose.connection
db.on('error',(err)=>{
	console.log('在连接数据库的时候报错了! at line 10 of EntryModel.js')
})

module.exports = db

