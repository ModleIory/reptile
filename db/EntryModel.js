//entry这个collection专门的model和视图
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const assert = require('assert')
const config = require('./config')


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
			db.close()
			y(res)
		})	
	})
}

const Entry = mongoose.model('entry',EntrySchema)

module.exports = Entry