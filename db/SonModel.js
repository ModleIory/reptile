//son这个collection专门的model和视图
const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const config = require("./config")

//这里是第一级的结构,就是说,每个document包含着这几个字段,也还是有秩序的mongoose让mong的设计
const SonSchema = new Schema({
	type:{
		type:String,
		default:'没有获取到数据'
	},
	list:{
		type:Array,
		default:"没有获取到数组数据"
	},
	time:{
		type:String,
		default:config.getTime()
	}
})

SonSchema.methods.saveAllSon = function(data){
	return new Promise((resolve,reject)=>{
		this.model('son').insertMany(data,(err,res)=>{
			if(err){
				console.log('error happen at line 24 of document SonModel.js')
				reject(false)
			}
			resolve(true)
		})
	})
}

const Son  = mongoose.model('son',SonSchema)

module.exports = Son