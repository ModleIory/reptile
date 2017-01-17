//链接的找寻从ajax或者地址栏观察关键参数规律
const db = require('./db/connection')
//请求发射器
const superagent = require('superagent')
//后台库
const cheerio = require('cheerio')
const Entry = require('./db/EntryModel')
const Son = require('./db/SonModel')


/*根据各个主页的链接来访问的子页面*/
const son_entity = new Son()
const son_page = (link)=>{
	superagent
	.get(link)
	.end((err,res)=>{
		// console.log(res.text)
		const $ = cheerio.load(res.text)
		let titles = []
		let links = []
		let type = $('.tab').text()
		let data_obj = {}
		data_obj.type = type
		data_obj.list = []
		$('#leftcolumn [target="_top"]').each((index,item)=>{
			// console.log(item.children[0]['data'])
			// titles.push(item.children[0]['data'])

			// console.log(item.attribs.href)
			// links.push(item.attribs.href)
			data_obj.list.push({title:item.children[0]['data'],link:item.attribs.href})
		})
		// console.log($('.tab').text())
		// console.log(titles)
		// console.log(links)
		son_entity.saveAllSon(data_obj)
		.then(()=>{
			console.log('son page is ok...................................')
			// db.close()
		})
	})
}
// son_page('www.runoob.com/html/html-tutorial.html')
/*存储主页面信息*/
	/*此篇有个方法不错,就是多个同index的数组合成一个对象,既可以统一遍历,又可以先开辟好对象,分别占据对象里的key来加入*/
const entry_page = ()=>{
	return new Promise((resolve,reject)=>{
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
					each_obj['list'][index]['link'] = item.attribs.href
					//存储子页面信息
					console.log(`http:${item.attribs.href}`)
					son_page(`http:${item.attribs.href}`)
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
			// console.log(save_data_arr)
			Entry.insertMany(save_data_arr)
			.then((res)=>{
				// console.log(res)
				resolve(true)
			})
			.catch((err)=>{
				console.log(err)
				reject(false)
			})
		})
	})
}
db.once('open',()=>{
	entry_page()
	.then(()=>{
		console.log('main page saving is ok')
	})
})