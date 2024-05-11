const app = Vue.createApp({
	data() {
		return {
			currentDate: new Date(),
			yearAndMonth: '',
			days: [
				// 結構如下
				// {
				// 	id: 20240510,
				// 	dayDate: 10,
				// 	class: 'this-month-block',
				// 	todos: [fromLocalStorage]
				// },
			],
			todoInModalId: '',
			todoInModal: {
				time: '',
				content: '',
			},
			allTodos: [
				// 結構如下
				// {
				// 	id: 20240510,
				// 	todos: [
				// 		{ time: '01:49', content: 'aaa' },
				// 		{ time: '02:50', content: 'bbb' }]
				// }
			],
			isAddingTodo: true,
			objectToEdit: {
				time: '',
				content: '',
			}
		}
	},
	methods: {
		saveToLocalStorage() {
			localStorage.setItem('daysInLocalStorage', JSON.stringify(this.allTodos))
		},
		loadFromLocalStorage() {
			return JSON.parse(localStorage.getItem('daysInLocalStorage'))
		},
		// 拿到被點擊的day-block的id，下面addTodo()要用的
		openModalForAddingTodo(input) {
			// 確保model裡面的值是空的，不要跟updateTodo()衝到
			this.todoInModalId = ''
			this.todoInModal.time = ''
			this.todoInModal.content = ''

			this.isAddingTodo = true
			console.log(`this.isAddingTodo : ${this.isAddingTodo}`)

			// 打開modal
			const todoModalTemplate = document.querySelector('#exampleModal')
			const todoModal = new bootstrap.Modal(todoModalTemplate)
			todoModal.show()

			this.todoInModalId = input
			console.log(`this.todoInModalId : ${this.todoInModalId}`)
		},
		addTodo() {
			// 將todoFromModal推入allTodos
			// 找找看是否這個日期已經有資料了
			let singleObjectFromAllTodos = this.allTodos.find(singleObject => singleObject.id == this.todoInModalId)

			console.log('singleObjectFromAllTodos :')
			console.log(singleObjectFromAllTodos)

			// 這個日期已經有資料的話
			if (singleObjectFromAllTodos) {
				singleObjectFromAllTodos.todos.push({
					time: this.todoInModal.time,
					content: this.todoInModal.content,
				})
			}
			// 這個日期沒有資料，創一個新的
			else {
				this.allTodos.push({
					id: this.todoInModalId,
					todos: [{
						time: this.todoInModal.time,
						content: this.todoInModal.content,
					}]
				})
			}

			console.log('this.allTodos in addTodo()')
			console.log(this.allTodos)

			this.saveToLocalStorage()

			// 清空格子重新render
			this.days = []
			this.getDayBlockData
		},
		openModalForUpdatingTodo(e, todo, day) {
			// 防止冒泡出去，會同時呼叫openModalForAddingTodo(input)那個方法
			e.stopPropagation()

			// 打開modal
			const todoModalTemplate = document.querySelector('#exampleModal')
			const todoModal = new bootstrap.Modal(todoModalTemplate)
			todoModal.show()

			this.isAddingTodo = false
			console.log(`this.isAddingTodo : ${this.isAddingTodo}`)
			console.log(day.id)
			console.log(todo.time)
			console.log(todo.content)

			// 讓modal的input框顯示todo原本的資訊
			this.todoInModalId = day.id
			this.todoInModal.time = todo.time
			this.todoInModal.content = todo.content

			// 同時把要原本的todo資訊暫存到一個物件上，讓modal的資訊被修改也不影響查詢
			this.objectToEdit.time = todo.time
			this.objectToEdit.content = todo.content

			console.log(`this.objectToEdit :`)
			console.log(this.objectToEdit)
		},
		updateTodo() {
			console.log('updateTodo()')
			

			// 找到對應的那筆todo
			let editingTodo = (this.allTodos.find(todo => todo.id === this.todoInModalId)).todos.find(todo => todo.time == this.objectToEdit.time && todo.content == this.objectToEdit.content)

			console.log(editingTodo)

			// 把新的值給對應的那筆todo
			editingTodo.time = this.todoInModal.time
			editingTodo.content = this.todoInModal.content

			this.saveToLocalStorage()

			// 清空格子重新render
			this.days = []
			this.getDayBlockData

		},
		deleteTodo() {
			console.log('deleteTodo()')

			// 找到對應的那筆todo所在的陣列
			let deletingTodoArray = (this.allTodos.find(todo => todo.id === this.todoInModalId)).todos
			// 找到對應的那筆todo在陣列的第幾個
			let deletingTodoIndex = deletingTodoArray.findIndex(todo => todo.time == this.objectToEdit.time && todo.content == this.objectToEdit.content)
			// 用splice刪除掉
			deletingTodoArray.splice(deletingTodoIndex, 1)

			this.saveToLocalStorage()

			// 清空格子重新render
			this.days = []
			this.getDayBlockData
		}
	},
	computed: {
		getYearAndMonthTitle() {
			return `${this.currentDate.getFullYear()} - ${String(this.currentDate.getMonth() + 1).padStart(2, 0)}`
		},
		getDayBlockData() {
			// 拿到本月1號是星期幾
			let startingDateOfMonth = new Date(new Date(this.currentDate).setDate(1))
			let startingDayOfMonth = startingDateOfMonth.getDay()
			// 計算出第一個格子的日期
			let startingDateOfCalendar =
				new Date(new Date(startingDateOfMonth).setDate(1 - startingDayOfMonth))

			// 填入days陣列的內容
			// 當月份大於這個月且陣列長度可以被7整除時離開迴圈
			while (!(startingDateOfCalendar.getMonth() > this.currentDate.getMonth() && this.days.length % 7 === 0)) {

				// 設定id為yyyyMMdd
				idString = `${startingDateOfCalendar.getFullYear()}${String(startingDateOfCalendar.getMonth() + 1).padStart(2, 0)}${String(startingDateOfCalendar.getDate()).padStart(2, 0)}`

				// 判斷block是不是這個月的，設定相應的class
				let className = ''
				if (startingDateOfCalendar.getMonth() === this.currentDate.getMonth()) {
					className = 'this-month-block'
				} else {
					className = 'not-this-month-block'
				}

				let todos = []
				if (this.allTodos.length !== 0) {
					for (const todoData of this.allTodos) {
						if (todoData.id == idString) {
							todos = todoData.todos
						}
					}
				}

				// 產生days的內容
				this.days.push({
					id: idString,
					dayDate: startingDateOfCalendar.getDate(),
					class: className,
					todos: todos,
				})

				// 將日期+1。繼續跑迴圈
				startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() + 1)
			}
		}
	},
	mounted() {
		console.log(`this.currentDate : ${this.currentDate}`)
		// 設定行事曆年份月份標題
		this.yearAndMonth = this.getYearAndMonthTitle

		// 把todos從local storage拿出來放到this.allTodos
		this.allTodos = this.loadFromLocalStorage() || []
		console.log('this.allTodos in mounted')
		console.log(this.allTodos)

		// 產生每天的block
		this.getDayBlockData
		// 驗證block格式
		console.log('First item of this.days')
		console.log(this.days[0])
	},
})

app.component('day-block', {
	template: '#day-block-template'
})

app.mount('#app')

