new Vue ({
	name: 'notebook',
	el: '#notebook',

	data(){
		return {
			//content: 'This is a note.',
			content: localStorage.getItem('content') || 'You can write in **markdown**',
		}
	},
	// 计算属性 
	computed: {
		notePreview () {
		// Markdown 渲染为 HTML 
			return marked(this.content)
		},
	},

	 watch: {
	 	content: 'saveNote',
  	},

	methods: {
	    saveNote (val, oldVal) {
	      console.log('new note:', val, 'old note:', oldVal)
	      console.log('saving note:', this.content)
	      localStorage.setItem('content', this.content)
	      this.reportOperation('saving')
    	},
    	reportOperation (opName) {
      		console.log('The', opName, 'operation was completed!')
    	},
  	},
  	/* 当实例准备就绪会调用这个钩子 
  	created() {
	// 将 content 设置为存储的内容
	// 如果没有保存任何内容则设置为一个默认字符串
		this.content = localStorage.getItem('content') || 'You can write in
** markdown ** '
  },*/


})