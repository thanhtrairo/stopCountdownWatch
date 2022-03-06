

// bai1
const $ = document.querySelector.bind(document)
const btnStart = $('.start')
const number1 = $('.number1')

let seconds = '00'
let minutes = '00'
let hours = '00'
let milliseconds = '000'
let stopwatch
let start = false
function startTimer() {
  seconds = Number(seconds) + 1

  if (seconds < 10) {
    seconds = '0' + seconds
  } else if (seconds === 60) {
    seconds = '00'
    minutes = Number(minutes) + 1
  }

  if (typeof minutes === 'number' && Number(minutes) < 10) {
    minutes = '0' + minutes
  }

  if (Number(minutes) === 60) {
    minutes = '00'
    hours = Number(hours) + 1
  }

  if (typeof hours === 'number' && Number(hours) < 10) {
    hours = '0' + hours
  }

  number1.textContent = `${hours}:${minutes}:${seconds}`;
}

btnStart.onclick = function () {
  if(start == false) {
    start = true
    if(stopwatch) {
      clearInterval(stopwatch)
    }
    btnStart.innerText = 'Pause'
    stopwatch = setInterval(startTimer, 1000)
  }else {
    start = false
    btnStart.innerText = 'Continue'
    clearInterval(stopwatch)
  }
}

$('.reset').onclick = function () {
  clearInterval(stopwatch)
  start = false;
  btnStart.innerText = 'Start'
  seconds = '00'
  minutes = '00'
  hours = '00'
  number1.innerText = '00:00:00'
}

// bai2
const numberCoundowns = document.querySelectorAll('.setCoundown button')
const number2 = $('.number2')
let fakecountdown = ''
let Countdown = ''

let countdownArr
let sec = '00'
let minute = '00'
let hour = '00'
let clearIntervalCoundown
let startCoundown = false
const btnStartCoundown = $('.startcoundown')
const back = $('.back')
const btnCoundown = $('.countdown .buttons')
const btnNumber = $('.setCoundown')

for(let item of numberCoundowns) {
  item.onclick = function() {
    fakecountdown += item.innerText
    if(fakecountdown.length == 1) {
      Countdown = `00:00:0${fakecountdown}`
    }else if(fakecountdown.length == 2) {
      Countdown = `00:00:${fakecountdown}`
    }
    else if(fakecountdown.length == 3) {
      Countdown = `00:0${fakecountdown.slice(0,1)}:${fakecountdown.slice(1)}`
    }
    else if(fakecountdown.length == 4) {
      Countdown = `00:${fakecountdown.slice(0,2)}:${fakecountdown.slice(2)}`
    }
    else if(fakecountdown.length == 5) {
      Countdown = `0${fakecountdown.slice(0,1)}:${fakecountdown.slice(1,3)}:${fakecountdown.slice(3)}`
    }
    else if(fakecountdown.length == 6) {
      Countdown = `${fakecountdown.slice(0,2)}:${fakecountdown.slice(2,4)}:${fakecountdown.slice(4)}`
    }      
    number2.innerText = Countdown
  }
}

back.onclick = function() {
  btnCoundown.style.display = 'none'
  btnNumber.style.display = 'block'
  back.style.display = 'none'
}

function setCoundown() {
  btnCoundown.style.display = 'flex'
  btnNumber.style.display = 'none'
  if(Countdown) {
    countdownArr = Countdown.replace(/:/g,'').split('').reverse()
    sec = (countdownArr[1] + countdownArr[0])
    minute = (countdownArr[3] + countdownArr[2])
    hour = (countdownArr[5] + countdownArr[4])
  } else {
    sec = '10'
  }
  number2.innerText = `${hour}:${minute}:${sec}`
}

function clearCoundown() {
  back.style.display = 'block'
  setCoundown()
  btnStartCoundown.innerText = 'Start'
  startCoundown = false
  number2.innerText = `${hour}:${minute}:${sec}`
  clearInterval(clearIntervalCoundown)
}

function clearNumber() {
  fakecountdown = ''
  Countdown = ''
  number2.innerText = '00:00:00'
}

function Startcoundown() {
  if(startCoundown == false) {
    back.style.display = 'none'
    startCoundown = true
    if(clearIntervalCoundown) {
      clearInterval(clearIntervalCoundown)
    }
    btnStartCoundown.innerText = "Pause"
    clearIntervalCoundown = setInterval(function() {
      number2.innerHTML =`${hour}:${minute}:${sec}`
      sec--
      if (sec == 0) {
        minute --
        sec = 60
        if(hour <= 0 && minute < 0) {
          minute = '00'
          sec = '00'
        }else if(hour <= 0 && minute == 0) {
          minute = '00'
          sec = 60
        }
         else if (minute < 10 && minute >= 0) {
          minute = '0' + minute
        }
      }else if (sec < 10 && sec > 0) {
        sec = '0' + sec
      }else if(sec < 0) {
        sec = '00'
      }
      
      if (minute == 0) {
        hour --
        if(hour < 0) {
          hour = '00'
        }else if(hour < 10 && hour >=0) {
          hour = '0' + hour
          minute = 60
        }
      }
    }, 1000)
  }else {
    startCoundown = false
    btnStartCoundown.innerText = "Continue"
    clearInterval(clearIntervalCoundown)
  }
}


// bai3

const content = $('#content')
async function getData() {
  const response = await fetch('https://randomuser.me/api/').then(res => res.json())
  console.log(response)
  const datas = response.results
  const htmls = datas.map(item =>{
    const {first, last, title} = item.name
    return (
      `
        <tr>
          <td>${first} ${last} ${title}</td>
          <td>${item.email}</td>
          <td>${item.dob.date}</td>
          <td>${item.location.city}</td>
          <td>${item.phone}</td>
        </tr>
      `
    )
  }).join('')
  content.innerHTML = htmls
}

getData()

