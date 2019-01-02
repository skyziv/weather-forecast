//for get API info
const xhr = new XMLHttpRequest()
const cardTexts = document.querySelectorAll('.cardText')
const cards = document.querySelectorAll('.card')
const imgs = document.querySelectorAll('img')
const date = document.querySelectorAll('.date')
const temp = document.querySelectorAll('.temp')
const describe = document.querySelectorAll('.describe')
const weatherIcon = document.querySelectorAll('.weatherIcon')
cardTexts.forEach(function (val) {
    val.onclick = function () {
        var cityName = this.textContent
        var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&APPID=af6978f2c228461fdc3412ed7bac3625&units=metric'
        xhr.open('GET', url)
        xhr.send()
        xhr.onload = function () {
            xhr.onreadystatechange = function () {
                if (this.status === 200) {
                    console.log('connecting')
                } else {
                    console.log('error:' + this.status)
                }
            }

            // actual date => data.list[0].dt_txt
            // temperature => data.list[0].main.temp
            // weather description => data.list[0].weather[0].description
            // setting info area
            var data = JSON.parse(xhr.responseText)
            function showDate() { 
                date[0].textContent =  data.list[0].dt_txt.slice(0,10) 
                date[1].textContent =  data.list[8].dt_txt.slice(0,10)
                date[2].textContent =  data.list[16].dt_txt.slice(0,10)  
            }
            function showTemp() {
                temp[0].textContent = Math.floor(data.list[0].main.temp)
                temp[1].textContent = Math.floor(data.list[8].main.temp)
                temp[2].textContent = Math.floor(data.list[16].main.temp)
            }
            function showDescribe() {
                describe[0].textContent = data.list[0].weather[0].description 
                describe[1].textContent = data.list[8].weather[0].description
                describe[2].textContent = data.list[16].weather[0].description
            }
            function showIcon() {
               var iconNum = [data.list[0].weather[0].icon, data.list[8].weather[0].icon,data.list[16].weather[0].icon]
               weatherIcon[0].src = 'http://openweathermap.org/img/w/'+iconNum[0]+'.png'
               weatherIcon[1].src = 'http://openweathermap.org/img/w/'+iconNum[1]+'.png'
               weatherIcon[2].src = 'http://openweathermap.org/img/w/'+iconNum[2]+'.png'

            }
            showDate()
            showTemp() 
            showDescribe() 
            showIcon()         
        }

        //for animation
        var myImg = this.parentElement.childNodes[1]
        myImg.className = 'animate'
        myImg.addEventListener('animationend', function () {
            myImg.className = ''
        })
        var thisFather = this.parentElement
        thisFather.classList.add('show')
        thisFather.addEventListener('animationend', function () {
            this.classList.remove('show')
        })
    }
})