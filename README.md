# net-reptile---- for future convennient usage------抓取www.runoob.com的信息  

# principles  
**原理很简单,就是利用请求,无论是地址栏的还是ajax的,找寻规律,然后去请求页面,得到返回的html,然后利用工具,得到一些关键词或者链接等等,用来进行分析**

# structure state about mongoose  
* 整个项目,公用一个链接就好,在入口处初始化链接一次就好了,那个文件写了执行的方法,导入后就会执行哪些方法,说起来还有点像javascript标签哇  
* 最后项目要结束的时候不要忘记断开链接,链接对象跟随着connection暴露给入口文件以便于操作

```
	mongodump -h localhost:27017 -d dbName -o outPutFile  

	mongorestore -h localhost:27017 -d dbName TheBackupDirectory
```

# build tool  
> `node+mongoodb`  

# directory introduce

> `mongo to save backup mongo data`  
> `db to save mongo method and function`  

# goal  
> `to analyse my favorate runoob and save in mongodb`  

# test  
> node app.js

# github address  
> `[modle's github](https://github.com/ModleIory/reptile)`


