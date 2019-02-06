import React from 'react';

const WeatherInfo = (props) => {
    return (
        <div className="weather-info-wrapper">
            {props.error && <div> {props.error}</div>}
            {props.temperature &&
                <div className="weather-info__temperature">
                    <div>{props.temperature} &deg;C </div>
                </div>
            }
        </div>
    )
}

export default WeatherInfo;