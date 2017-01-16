const superagent = require('superagent')
const cheerio = require('cheerio')
const Entry = require('./db/EntryModel')

/*存储主页面信息*/
	/*此篇有个方法不错,就是多个同index的数组合成一个对象,既可以统一遍历,又可以先开辟好对象,分别占据对象里的key来加入*/
const entry_page = ()=>{
	superagent
	.get('http://www.runoob.com')
	.end((err,res)=>{
		// console.log(res.text)
		const $ = cheerio.load(res.text)
		const save_data_arr = []
		//循环每个box的id,菜鸟教程总共10个栏目
		for(let i=1;i<=10;i++){

			let each_obj = {}

			//大标题分类别
			const types = $(`.cate${i} .fa-list`)[0]['next']['data']
			// console.log(types)
			each_obj['type'] = types

			each_obj['list'] = []
			//各个子项目
			const titles = $(`.cate${i} h4`).each((index,item)=>{
				// console.log(item['children'][0]['data'])
				each_obj['list'].push({title:item['children'][0]['data']})
			})

			//各个项目的链接
			const links = $(`.cate${i} .item-top`).each((index,item)=>{
				// console.log(item.attribs.href)
				each_obj['list'][index]['link'] = item.attribs.href
			})

			//各个项目图标
			const figures = $(`.cate${i} img`).each((index,item)=>{
				// console.log(item.attribs.src)
				each_obj['list'][index]['img'] = item.attribs.src
			})

			//各个描述
			const describes = $(`.cate${i} .item-top strong`).each((index,item)=>{
				// console.log(item['children'][0]['data'])
				each_obj['list'][index]['desc'] = item.attribs.src
			})

			save_data_arr.push(each_obj)
			// console.log(each_obj)			

		}
		console.log(save_data_arr)
		Entry.insertMany(save_data_arr)
		.then((res)=>{
			console.log(res)
		})
		.catch((err)=>{
			console.log(err)
		})
	})
}
entry_page()