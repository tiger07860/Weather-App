const locationForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')


locationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(searchLocation.value)
    messageOne.textContent = 'Loading...'

    fetch(`/weather?location=${searchLocation.value}`).then((response)=>{
    response.json().then((data) => {
        if (data.error) {
            // console.log(data.error)
            messageOne.textContent = 'Error'
            messageTwo.textContent = data.error
        } else {
            // console.log(data.location)
            // console.log(data.data.main.temp+' celsius')
            messageOne.textContent = data.location
            messageTwo.textContent = data.data.main.temp+' celsius'
        }
    })
})
})