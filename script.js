/* 
   =====
   targeting elements
   =====
*/
let body=document.getElementsByTagName('body');
const btn=document.getElementById('btn');
const cityName=document.querySelector('.city h3');
const date=document.querySelector('.city h4');
const temperature=document.querySelector('.temp h1');
const suitation=document.querySelector('.sutation p');
const today=document.querySelectorAll('.today p');
const tomorrow=document.querySelectorAll('.tomorrow p');
const next=document.querySelectorAll('.next p');
const card=document.querySelector('.card');
const wind=document.querySelectorAll('.wind p');
const humidity=document.querySelectorAll('.humidity p');
const sunrise=document.querySelectorAll('.sunrise p');
const sunset=document.querySelectorAll('.sunset p');

let city="";


/*
====
  get current date and day
====
*/
function setDate()
{
   const weaks=['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
   const currentDate=new Date();
   const year=currentDate.getFullYear();
   const months=['January','February','March','April',
               'May','June','July','August','September','October',
               'November','December'];
   const month=currentDate.getMonth();
   const todayDate=currentDate.getDate();
   const num=currentDate.getDay();
   date.innerHTML=`${weaks[num]},${months[month]} ${todayDate}, ${year}`;
}

 
/*
 ====
 receving city name
 ====
*/
function getCityName()
{
   cityName.innerHTML=document.getElementById('search').value;
   if(cityName.innerHTML==='')
   {
      card.style.display='none';
      alert('Please enter city name');
   }
   else{
      card.style.display='block';
   }
}



async function currentWeather()
{
   const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName.innerHTML}&appid=f08a684020f99e5f75a3090ec802256d`;

   const response=await fetch(url);
   const weatherData = await response.json();
   const getTemp= ( weatherData.main.temp)-273.15;
    temperature.innerHTML=`${getTemp.toFixed(1)}°C`;
    /*
     to get weather icon
   */
    let id= weatherData.weather[0].icon;
    today[0].innerHTML=`<img src='http://openweathermap.org/img/wn/${id}@2x.png'/>`
    /*
      to get weather condition e.g. cloudy,sunny
   */
    suitation.innerHTML= weatherData.weather[0].main;

     if( suitation.innerHTML==='Clouds')
     {
        card.style.backgroundImage="url('cloud.jpg')";
        body[0].style.color='#ffffff';
     }
     else if(suitation.innerHTML==='Rain')
     {
        card.style.backgroundImage="url('rain.jpg')";
        body[0].style.color='#ffffff';
     }
     else if(suitation.innerHTML==='Clear')
     {
        card.style.backgroundImage="url('sunny.jpg')"
        body[0].style.color='#000000';
     }
     else
     {
      card.style.backgroundImage="url('mist.jpg')"
      body[0].style.color='#ffffff';

     }
     /* Wind speed */
     wind[1].innerHTML=`${ weatherData.wind.speed}m/s `;
     /* humidity level */
      humidity[1].innerHTML=`${ weatherData.main.humidity}%`;
    /* Sunrise */
      const sunRise= weatherData.sys.sunrise;
      const riseDate=new Date(sunRise*10);
      const riseHour=riseDate.getUTCHours().toString().padStart(2,0);
      const riseMinute=riseDate.getUTCMinutes().toString().padStart(2,0);
      sunrise[1].innerHTML=`${riseHour}:${ riseMinute}AM`;
      
     /* sunset */
      const sunSet= weatherData.sys.sunset;
      let setDate=new Date(sunSet*100);
      let setHour=setDate.getUTCHours().toString().padStart(2,0);
      let setMinute=setDate.getUTCMinutes().toString().padStart(2,0);
      sunset[1].innerHTML=`${setHour}:${setMinute}PM`;
}



btn.addEventListener('click',()=>{
    
    getCityName();
    setDate();
   currentWeather();
})






 
 
 

