let calendar = {
    calendar: document.querySelector('.calendar'),
    imageContainer: document.querySelector('.image-container'),
    next: document.querySelector('.next'),
    previous: document.querySelector('.previous'),
    smallpopUp: document.createElement('div'),
    note: document.createElement('textarea'),
    button: document.createElement('button'),
    notetitle: document.createElement('p'),
    days: document.getElementsByClassName('days'),
    date: new Date(),
    today: new Date(),
    notes: [],
    pressCount: 0,
    daysInMonth: (year, month) => {
        return new Date(year, month, 0).getDate();
    },

    insertImg() {
        this.calendar.innerHTML = `<div class="top-img calendar-img-` + this.date.getMonth() + `"></div>` + this.calendar.innerHTML
    },

    setMonth(month) {
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ] [month]
    },

    week: [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S",
    ],

    createDaysOfTheWeek() {
        this.insertImg(),
        month = document.createElement('span'),
        month.innerHTML = this.setMonth(this.date.getMonth())
        this.calendar.appendChild(month),
        weekUl = document.createElement('ul')
        weekUl.className = 'week'
        this.calendar.appendChild(weekUl)
        this.week.map(weekDay => {
            let day = document.createElement('li')
            day.innerHTML = weekDay
            weekUl.appendChild(day)
        })
        firstDay = this.date.setDate(1),
        ul = document.createElement('ul'),
        ul.className = 'days-container',
        this.calendar.appendChild(ul)
        year = document.createElement('span')
        year.className = "year"
        year.innerHTML = this.date.getFullYear()
        this.calendar.appendChild(year)
        console.log('string')
        for (let n = 0; n < this.date.getDay(); n++) {
            let blankDays = document.createElement('li')
            blankDays.className = "disabled"
            ul.appendChild(blankDays)
        }
        for (let i = 1; i <= this.daysInMonth(this.date.getFullYear(),this.date.getMonth() + 1); i++) {
            if ([i] == this.today.getDate() && this.date.getMonth() === this.today.getMonth() && this.date.getFullYear() === this.today.getFullYear()) {
            let activeDay = document.createElement('li')
            activeDay.className = "active-day days"
            activeDay.innerHTML = [i]
            ul.appendChild(activeDay)
            } else if (([i] < this.today.getDate() && this.date.getMonth() === this.today.getMonth() && this.date.getFullYear() === this.today.getFullYear()) ||
            (this.date.getMonth() < this.today.getMonth() && this.date.getFullYear() <= this.today.getFullYear())) {
                let disabledDays = document.createElement('li')
                disabledDays.className = "disabled-days days"
                disabledDays.innerHTML = [i]
                ul.appendChild(disabledDays)
            } else {
                let days = document.createElement('li')
                days.className = "future-days days"
                days.innerHTML = [i]
                ul.appendChild(days)
            } 
        }
        this.popup()
    },
    addControls() {
        var b = this
        this.next.addEventListener("click", function() {
            b.date.setMonth(b.date.getMonth() + 1)
            b.calendar.innerHTML = ''
            b.createDaysOfTheWeek()
        }),
        this.previous.addEventListener("click", function() {
            b.date.setMonth(b.date.getMonth() - 1)
            b.calendar.innerHTML = ''
            b.createDaysOfTheWeek()
        })
    },
    popup() {
        this.calendar.addEventListener("click", (e) => {
            if (e.target.className.includes('days') &&
                e.target !== document.querySelector('.pop-up')) {
            this.smallpopUp.className = "pop-up"
            e.target.appendChild(this.smallpopUp)
            this.smallpopUp.appendChild(this.note)
            this.note.setAttribute("Placeholder", "Put your notes in here")
            this.smallpopUp.appendChild(this.button)
            this.button.innerHTML = "Save"
            this.notesForSpecificDay = this.notes.filter((note) => note.selectedDay === e.target.firstChild.textContent)
            this.note.value = this.notesForSpecificDay[0] ? this.notesForSpecificDay.slice(-1)[0].inputText : ''
            } else if(e.target !== this.note) {
                this.smallpopUp.parentElement.removeChild(this.smallpopUp)
            } else {
                ""
            }
        })
        this.button.addEventListener("click", e => (this.note.value !== "" ? this.save(e) : ""))
    },
    save(e) {
        this.notes.push({
            selectedDay: e.target.parentElement.parentElement.firstChild.textContent,
            inputText: this.note.value 
        })
    }
}
document.addEventListener('load', calendar.createDaysOfTheWeek(), calendar.addControls())