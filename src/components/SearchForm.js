import React from 'react';
import { Input, Button} from 'semantic-ui-react';

class SearchForm extends React.Component{

    render(){
        debugger
        return (
            <div className="search-form">
                <div className="form-container">
                <form onSubmit={this.props.getWeather}>
                    <Input name="city" className="search-form__item" placeholder='City' />
                    <Input name="country" className="search-form__item" placeholder='Country' />
                    <Button className="search-form__item btn" content='Get Weather' />
                </form>
                </div>
            </div>
        )
    }
}

export default SearchForm;