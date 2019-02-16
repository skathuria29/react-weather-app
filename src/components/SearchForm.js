import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';

const RAPID_API_KEY = `${process.env.RAPID_API_KEY}`;

class SearchForm extends React.Component {

    state = {
        countries: [],
        cities: []
    }

    getCountryOptions = async () => {
        
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
                error : 'Data Not Found'
            }))
        }
    }

    getCityOptions = async (code) => {
        
        const getCountryCitiesURL = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}/regions?limit=100`
        const apiResponse = await fetch(getCountryCitiesURL, {
            headers: {
                "X-RapidAPI-Key": RAPID_API_KEY
            }
        });
        if (apiResponse.status === 200) {
            const apiData = await apiResponse.json();
            
            const citiesOptionsData = apiData.data.map((item) => ({ key: item.isoCode, value: item.name, text: item.name }));
            this.setState(() => ({
                cities: citiesOptionsData
            }))
        }
        else {
            this.setState(() => ({
                error: 'Data Not Found'
            }))
        }
    }

    componentDidMount() {
        this.getCountryOptions();
    }

    handleCountryChange = (e, data) => {
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