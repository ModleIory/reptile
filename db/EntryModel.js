const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('./config')
const assert = require('assert')

const url = `mongodb://${config.host}:${config.port}/${config.db}`

mongoose.connect(url)
const db = mongoose.connection
db.on('error',(err)=>{
	console.log('在连接数据库的时候报错了! at line 10 of EntryModel.js')
})
db.once('open',()=>{
	console.log('数据库连接成功!')
})

const EntrySchema = new Schema({
	type:{
		type:String,
		default:'没有得到数据',
	},
	list:{
		type:Array,
		default:null
	},
	time:{
		type:String,
		default:config.getTime()
	}
})

EntrySchema.methods.insertMany = function(data){
	return new Promise((y,n)=>{
		this.model('entry').insertMany(data,(err,res)=>{
			try{
				assert.ifError(err)
			}catch(e){
				n(false)
				console.log('在插入许多时候报错! at EntryModel.js line 50')
			}
			y(res)
			db.close()
		})	
	})
}

const Entry = mongoose.model('entry',EntrySchema)

module.exports = Entry