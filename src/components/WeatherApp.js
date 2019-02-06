import React from 'react'
import Header from './Header';
import SearchForm from './SearchForm';
import WeatherInfo from './WeatherInfo';
import Config from '../../config/settings';

class WeatherApp extends React.Component{

    state = {
        city: undefined,
        country:undefined,
        temperature: undefined,
        error : undefined
    }
    

    getWeather = async(e)  => {
        
        e.preventDefault();
        
        const city = e.target.elements.city.value.trim();
        const country = e.target.elements.country.value.trim();

        if(city && country){
            const apikey = Config['API_KEY'];
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apikey}&units=metric`;
            const apiResponse = await fetch(url);
            const data = await apiResponse.json();
            
            if(data.code === "404"){
                //data not found
                this.setState(()=> ({
                    error : 'Data Not Found!'
                }))
            }
            else{
                this.setState(() => ({
                    city : data.name,
                    country : data.sys.country,
                    temperature: data.main.temp
                }))
            }

        }
        else{

            this.setState(()=> ({
                error : 'Enter Input Values'
            }))
        }
           

    }

    render(){
        return (
            <div className="wrapper">
               <Header />
               <SearchForm getWeather={this.getWeather}/>
               <WeatherInfo 
                    city= {this.state.city}
                    country ={this.state.country}
                    temperature ={this.state.temperature}
                    error ={this.state.error}
               />

            </div>
        )
    }
}

export default WeatherApp;