const app = Vue.createApp({
	data() {
		return {
			currentDate: new Date(),
			yearAndMonth: '',
			days: [
				// { dayDate: 1, todos: ['todo1', 'todo2'] },
			],
		}
	},
	computed: {
		getYearAndMonthTitle() {
			return `${this.currentDate.getFullYear()} - ${this.currentDate.getMonth() + 1}`
		},
		getDayBlockData() {
			// 拿到本月1號是星期幾
			let startingDateOfMonth = new Date(new Date(this.currentDate).setDate(1))
			let startingDayOfMonth = startingDateOfMonth.getDay()
			// 計算出第一個格子的日期
			let startingDateOfCalendar =
				new Date(new Date(startingDateOfMonth).setDate(1 - startingDayOfMonth))
			console.log(`this.startingDayOfMonth : ${startingDayOfMonth}`)
			console.log(`this.startingDateOfCalendar : ${startingDateOfCalendar}`)
			console.log(`this.currentDate : ${this.currentDate}`)

			// 判斷days陣列的內容
			// 當月份大於這個月且陣列長度可以被7整除時離開迴圈
			while (!(startingDateOfCalendar.getMonth() > this.currentDate.getMonth() && this.days.length % 7 === 0)) {
				
				// 判斷block是不是這個月的，設定相應的class
				let className = ''
				if (startingDateOfCalendar.getMonth() === this.currentDate.getMonth()) {
					className = 'this-month-block'
				} else {
					className = 'not-this-month-block'
				}

				this.days.push({
					dayDate: startingDateOfCalendar.getDate(),
					class:className,
				})
				startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() + 1)
			}
		}
	},
	mounted() {
		console.log(`this.currentDate : ${this.currentDate}`)
		this.yearAndMonth = this.getYearAndMonthTitle
		this.getDayBlockData
	},
})

app.component('day-block', {
	template: '#day-block-template'
})

app.mount('#app')

