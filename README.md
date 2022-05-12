# Covid-19 Vaccination count prediction based on arima model

<p> This project is used to predict a covid vaccination count take by people everyday

<br>

### `Main.js` predicts value after generating the data.json using data_import.js

### `Data_import.js` collects the data from the source of the vaccination counts made by [owid](https://github.com/owid)

<br>

To install dependencies :

`cd Arima_model-Covid_vaccination-Count-Prediction-`

`npm i`

To initialize for the dataset

`npm run build`

Also the dataset can be updated every 12hours (set in milliseconds):

`npm run serve`

To predict count from the generated data

`npm run start`

## The **_[source ](https://ourworldindata.org/covid-vaccinations)_** is made by an open source project, Check out this [repo](https://github.com/owid/covid-19-data)

<p> This project will be hosted as an api to make a frontend for university project
