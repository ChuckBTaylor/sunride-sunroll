window.onload = function(){
  addEventListeners()
  drawNight()
  let lng, lat;
}

function addEventListeners(){
  $('#button-location').on('click', () =>{
    handleButton()
  })

  $('#location-form').submit(ev => {
    ev.preventDefault();
    handleForm()
  })

  $('#table-holder').mouseover(ev => {
    if (ev.target && ev.target.nodeName === "TD" && ev.target.classList[0] !== "ignore-mouse"){
      handleMouseover(ev.target)
    }
  })
  $('#table-holder').mouseout(ev => {
    if (ev.target && ev.target.nodeName === "TD" && ev.target.classList[0] !== "ignore-mouse"){
      handleMouseout()
    }
  })
}


function handleButton(){
  getLocation().then(res => {
    lat = res[0]
    lng = res[1]
    fetchSunInfo(lat, lng)
  })
}

function getLocation(){
  return new Promise ((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function (position){
      resolve([position.coords.latitude, position.coords.longitude]);
    })
  })
}

function fetchSunInfo(lat, lng) {
  fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`)
  .then(resp => resp.json())
  .then(sunInfo => {

    getTimeZone(lat, lng).then(timeInfo => {
      addRow(doCalculations(timeInfo, sunInfo.results), lat, lng)
    })
  });
}

function getTimeZone(lat, lng){
  return fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(Date.now()/1000)}&key=AIzaSyDODC9E1OJs0z6HhK38RuaId8dnePChvWA`)
  .then(gRes => gRes.json());
}

function doCalculations(timeInfo, sunInfo) {
  let rise, set, sMoon, dayLength;
  if(timeInfo.status !== "ZERO_RESULTS"){
    rise = getOffSetTime(sunInfo.sunrise, timeInfo)
    set = getOffSetTime(sunInfo.sunset, timeInfo)
    sMoon = getOffSetTime(sunInfo.solar_noon, timeInfo)
    dayLength = sunInfo.day_length
  }else{
    rise = sunInfo.sunrise
    set = sunInfo.sunset
    sMoon = sunInfo.solar_noon
    dayLength = sunInfo.day_length
  }
  return {rise, set, sMoon, dayLength}
}

function getOffSetTime(timeString, timeInfo){
  const reg = new RegExp(/^\d{1,2}/)
  const offSet = Math.floor((timeInfo.rawOffset + timeInfo.dstOffset)/3600)
  let offSetHour = (+timeString.match(reg)[0]) + offSet
  if (offSetHour < 1){
    offSetHour += 12
  }else if (offSetHour >= 12){
    offSetHour -= 12
  }

  return timeString.replace(reg, offSetHour)
}

function addRow(sunObj, lat, lng){
  let table = document.getElementById('sun-table-body')

  if (!table){
    addTable()
    table = document.getElementById('sun-table-body')
  }

  let row = document.createElement('tr')
  row.innerHTML = `
    <td class='ignore-mouse'>${Math.round(lat*10000)/10000}</td>
    <td class='ignore-mouse'>${Math.round(lng*10000)/10000}</td>
    <td>${sunObj.rise}</td>
    <td>${sunObj.set}</td>
    <td>${sunObj.sMoon}</td>
    <td class='ignore-mouse'>${sunObj.dayLength}</td>`
  table.prepend(row)

}

function addTable(){
  const table = document.createElement('table')
  table.setAttribute('id', 'sun-table')
  table.innerHTML =       `
    <tr>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Sunrise</th>
      <th>Sunset</th>
      <th>Sailor Noon</th>
      <th>Length of Day</th>
      <tbody id='sun-table-body'></tbody>
    </tr>`
  document.getElementById('table-holder').appendChild(table)
}

function handleMouseover(target){
  ap = target.textContent.slice(-2,-1)
  let hour = parseInt(target.textContent.match(/^\d{1,2}/)[0])
  if (ap === "P"){
    if (hour !== 12){
      hour += 12
    }
  } else {
    if (hour === 12){
      hour -= 12
    }
  }
  fromMouseOver(hour)

}

function handleForm(){
  const form = $('#location-form')
  const lat = santizeUserInput(form[0][0].value)
  const lng = santizeUserInput(form[0][1].value)
  if (parseFloat(lat) > 90 || parseFloat(lat) < -90 || parseFloat(lng) > 180 || parseFloat(lng) < -180){
    return displayError()
  }
  fetchSunInfo(lat, lng)
}

function santizeUserInput(number){
  if (!number.match(/\./)){
    number += "."
  }
  return number
}

function handleMouseout(){
  drawNight()
}

function displayError(){
  console.log("Your coordinates suck");
}
