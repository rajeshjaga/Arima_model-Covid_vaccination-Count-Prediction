# Covid-19 Vaccination count prediction based on arima model

<p> This project is used to predict a covid vaccination count take by people everyday

<br>

### `Main.js` predicts value after generating the json files

### `index.js` combines everything with an timer to execute all the task from server side

### `Data_import.js` collects the data from the source of the vaccination counts made by [owid](https://github.com/owid)

<br>

To install dependencies :

`cd Arima_model-Covid_vaccination-Count-Prediction`

To install dependencies :
`npm i`

To predict count from the generated data and caches in json formatted files

`npm run start`

**_note: the timer has to be changed according to the time required default is 08:00pm_**

## The **_[source ](https://ourworldindata.org/covid-vaccinations)_** is made by an open source project, Check out this [repo](https://github.com/owid/covid-19-data)

### all the atrributive values to consider from fetching that on specific json

- total_vaccinations
- people_vaccinated
- daily_vaccinations or daily_people_vaccinated
- people_fully_vaccinated

<p> This project will be hosted as an api to make a frontend for university projects
