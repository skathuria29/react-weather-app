import React from 'react';
import { Input, Button, Dropdown } from 'semantic-ui-react';

const JSON_DATA = require('../../config/countries.json');
const RAPID_API_KEY = `${process.env.RAPID_API_KEY}`;

class SearchForm extends React.Component {

    state = {
        countries: [],
        cities: []
    }

    getJSONCountryOptions() {
        debugger
        const countries = Object.keys(JSON_DATA);
        const countOptions = countries.map((item) => ({ key: item, value: item, text: item }));
        return countOptions;
    }

    getJSONCityOptions() {
        debugger

    }

    getCountryOptions = async () => {
        debugger
        const getCountriesURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=250";
        const apiResponse = await fetch(getCountriesURL, {
            headers: {
                "X-RapidAPI-Key": RAPID_API_KEY
            }
        });

        if (apiResponse.status === 200) {
            const apiData = await apiResponse.json();
            const countriesOptionsData = apiData.data.map((item) => ({ key: item.code, value: item.wikiDataId, text: item.name }));
            this.setState(() => ({
                countries: countriesOptionsData
            }))
        }
        else {
            this.setState(() => ({
                countries: this.getJSONCountryOptions()
            }))
        }
    }

    getCityOptions = async (code) => {
        debugger
        const getCountryCitiesURL = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}/regions?limit=100`
        const apiResponse = await fetch(getCountryCitiesURL, {
            headers: {
                "X-RapidAPI-Key": RAPID_API_KEY
            }
        });
        if (apiResponse.status === 200) {
            const apiData = await apiResponse.json();
            debugger
            const citiesOptionsData = apiData.data.map((item) => ({ key: item.isoCode, value: item.name, text: item.name }));
            this.setState(() => ({
                cities: citiesOptionsData
            }))
        }
        else {
            this.setState(() => ({
                cities: this.getJSONCountryOptions()
            }))
        }
    }

    componentDidMount() {
        this.getCountryOptions();
    }

    handleCityChange = (e, data) => {
        if (data.value) {
            // this.props.city = data.value;
        }
    }

    handleCountryChange = (e, data) => {
        debugger
        if (data.value) {
            const countryCode = data.value.trim();
            // this.props.country = data.value;
            this.getCityOptions(countryCode);

        }


    }

    render() {

        return (
            <div className="search-form-wrapper">
                <div className="form-container">
                    <form onSubmit={this.props.getWeather} className="search-form">
                        <Dropdown onChange={this.handleCountryChange} name="country" className="search-form__item" placeholder="Select Country" fluid search selection options={this.state.countries} />
                        <Dropdown name="city" className="search-form__item" placeholder="Select City" fluid search selection options={this.state.cities} />
                        <Button className="search-form__item btn" content='Get Weather' />
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchForm;

// <Input name="city" className="search-form__item" placeholder='City' />
// <Input name="country" className="search-form__item" placeholder='Country' />