module.exports = {
	host:'localhost',
	db:'reptile',
	port:"27017",
	getTime(){
		const cur = new Date()
		const year = cur.getFullYear()
		const month = cur.getMonth()+1
		const day = cur.getDate()
		const hour = cur.getHours()
		const minute = cur.getMinutes()
		const second = cur.getSeconds()
		console.log(`${year}-${month}-${day} ${hour}:${minute}`)
		return `${year}-${month}-${day} ${hour}:${minute}`
	}
}