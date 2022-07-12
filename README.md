
## 林凯卡卡波题目

 ### 1. 打开方式
 #### 1）直接点击打开dist/index.html文件
 #### 2）在vscode中打开kakabo文件，用live server打开dist/index.html
 ### 2. 首先是左边菜单组件
![在这里插入图片描述](https://img-blog.csdnimg.cn/114beb78b8da43a9a56be2fbb6537702.png#pic_center)
左边menu点击‘消息中转’、‘自动化测试管理’可以展开该类目下的菜单，点击菜单，可以创建对应的页面，如果已经创建了该页面，右边会直接跳转到先前打开的页面。
 ### 3. 右边显示页面（模板管理页面、模板编辑页面、消息管理页面）
 模板管理页面：复刻视频要求，表格显示，操作框三个按钮（可切换图片、可编辑、可删除）左上角创建可创建新模板
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/5b2fa4f4051144f496cc53aafe5d2553.png#pic_center)

 模板编辑页面：输入数据点击提交即成功创建或者更新模板
![在这里插入图片描述](https://img-blog.csdnimg.cn/266bb3dea03a497ea161c845315d7f75.png#pic_center)
消息管理页面：视频展示的功能，都做进去了，新建分组，编辑分组名字，删除分组，分组内添加消息，创建消息
![在这里插入图片描述](https://img-blog.csdnimg.cn/ccb54d1e28d143978d7adc62680e21e7.png#pic_center)

 ### 4. 数据请求使用mock.js进行拦截模拟返回，数据的修改等目前用localstorage保存，所以关闭文件再次进入的时候会继续使用上传处理的数据。

