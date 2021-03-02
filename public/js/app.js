console.log('client side js file')



const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent="Please wait"
    messageThree.textContent=""
    messageFour.textContent=""
    messageFive.textContent=""

    fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
             messageOne.textContent = data.error
             messageTwo.textContent=""
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.descriptions
            messageThree.textContent=data.temperature +"° Celsius"
            messageFour.textContent="Feels Like "+data.feelslike +"° "+ " Humidity " + data.humidity + "%"
            messageFive.textContent = "Pressure " + data.pressure +"hPa "+ " Wind Speed "+ data.windSpeed +"Kph"
        
            
        }

       

    })
})

})