


const apiTheSecond = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/metadata';
//API URL
const apiURL = 'https://corona.lmao.ninja/v2/countries';
const apiURLcontinents = "https://corona.lmao.ninja/v2/continents"

//fetch and return data from the API



const select = document.querySelector("select");

async function getCases(){

    const apiResponse = await fetch(apiURL);
    const data = await apiResponse.json();
    return data;
    
    

}

async function CountrySelection(){
    
    const responce = await getCases();
    let countryArray = [];

    
    for (data of responce){
        countryArray.push(data.country);

    }
    console.log(countryArray);

    for(i = 0; i<countryArray.length; i++){
        
        var option = document.createElement("option");
        option.textContent = countryArray[i];
        select.appendChild(option)

    }
    console.log(select)
}

function optionValue(e){
    
    optionSelected = event.target.value
   return optionSelected
    
    
}

async function sortByStateCases(e){

optionValue(e);
    
    
    const responce = await getCases();
    const select = document.querySelector("select");
    const optionChoosen = document.querySelector(".optional");
    const optionHeading = document.querySelector("#optional")

    let optionCases = 0;
    let optionDeaths = 0;
    let optionRecovered = 0;
    
    for(data of responce){
        
        if(data.country === optionSelected){
            console.log(data.cases);
            
            optionalCases = {
                
                cases: optionCases += data.cases,
                deaths: optionDeaths += data.deaths,
                recovered: optionRecovered += data.recovered
            }
            
            
                      optionChoosen.innerHTML = `

<tr>
<th scope="row" id="oCases">${optionalCases.cases}</th>
<td id="oDeaths">${optionalCases.deaths}</td>
<td id="oRecovered">${optionalCases.recovered}</td>
<td id="oFlag"><img  <img class ="w-50"src=" ${data.countryInfo.flag}" alt="national flag of ${data.country}"></td>

</tr>
`;


            animateNumber({oCases, oDeaths, oRecovered}, data);
            function animateNumber(id, data){

                const oCases = new CountUp(id.oCases, 0, optionalCases.cases);
                const oDeath = new CountUp(id.oDeaths, 0, optionalCases.deaths);
                const oRecovered = new CountUp(id.oRecovered, 0, optionalCases.recovered);

                oCases.start();
                oDeath.start();
                oRecovered.start()

            }
            
            optionHeading.textContent = data.country +  " " + "Covid_19 Data";
        }
    }

}

//Australia cases
async function australiaCases(){

    const response = await getCases();
    const australia = document.querySelector(".australia");

    let australiaCases = 0;
    let australiaDeaths = 0;
    let australiaRecovered = 0;

    for(data of response){

        if(data.country === "Australia"){
            console.log(data.countryInfo.flag)

            australiaData = {

                cases: australiaCases += data.cases,
                deaths: australiaDeaths += data.deaths,
                recovered: australiaRecovered += data.recovered

            }


            australia.innerHTML = `

<tr>
<th scope="row" id="aCases">${australiaData.cases}</th>
<td id="aDeaths">${australiaData.deaths}</td>
<td id="aRecovered">${australiaData.recovered}</td>
<td id="aFlag"><img class ="w-50"  src=" ${data.countryInfo.flag}" alt="#"></td>

</tr>
`;


            animateNumber({aCases, aDeaths, aRecovered}, data);
            function animateNumber(id, data){

                const aCases = new CountUp(id.aCases, 0, australiaData.cases);
                const aDeath = new CountUp(id.aDeaths, 0, australiaData.deaths);
                const aRecovered = new CountUp(id.aRecovered, 0, australiaData.recovered);

                aCases.start();
                aDeath.start();
                aRecovered.start()

            }
        }




    }






}
//Worldwide Cases

async function worldWideCases(){

    const response = await getCases();
    const worldWide = document.querySelector(".worldWide");

    let worldCases = 0;
    let worldDeath = 0;
    let worldRecovered = 0;
    let worldData = "";



    //return worldwide cases  
    for(data of response){

        worldData = {
            cases: worldCases += data.cases,
            deaths: worldDeath += data.deaths,
            recovered: worldRecovered += data.recovered
        }


    }

    //output world cases into html
    worldWide.innerHTML = 

        `<tr>
<th scope="row" id="wcases">${worldData.cases}</th>
<td id="wdeaths">${worldData.deaths}</td>
<td id="wrecovered">${worldData.recovered}</td>

</tr>`;

    animateNumber({wcases, wdeaths, wrecovered}, data);
    function animateNumber(id, data){

        const wcases = new CountUp(id.wcases, 0, worldData.cases);
        const wdeaths = new CountUp(id.wdeaths, 0, worldData.deaths);
        const wrecovered = new CountUp(id.wrecovered, 0, worldData.recovered);

        wcases.start();
        wdeaths.start();
        wrecovered.start();

    }




}



document.addEventListener('DOMContentLoaded',   worldWideCases)
document.addEventListener('DOMContentLoaded',   australiaCases)
document.addEventListener('DOMContentLoaded',   CountrySelection)
select.addEventListener('change', (event) =>{
sortByStateCases(event)  
})
