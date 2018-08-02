import * as React from "react";
import { connect } from "react-redux";
import Chart from "../components/Chart";

interface WeatherListProps {
  weather: any;
}

interface WeatherListState {
  term: string;
}

class WeatherList extends React.Component<WeatherListProps, WeatherListState> {
  constructor(props: WeatherListProps) {
    super(props);
    this.state = {
      term: '',
    };
  }

  public renderWeather(cityData: any) {
    // tslint:disable-next-line:no-console
    // console.log(cityData);
    const name = cityData.city.name;
    const temps = cityData.list.map((weather: any) => weather.main.temp);
    const pressures = cityData.list.map((weather: any) => weather.main.pressure);
    const humidities = cityData.list.map((weather: any) => weather.main.humidity);

    return (
      <tr key={name}>
        <td>{name}</td>
        <td><Chart data={temps} color="orange" units="K" /></td>
        <td><Chart data={pressures} color="green" units="hPa" /></td>
        <td><Chart data={humidities} color="black" units="%" /></td>
      </tr>
    );
  }

  public renderWeatherList() {
    // tslint:disable-next-line:no-console
    // console.log(this.props.weather);
    if (this.props.weather.error === false) {
      if(this.state.term === '' && this.props.weather.data === null) {
        return <h1>Please enter city</h1>;
      }
      else if (this.props.weather.loading === true) {
        return <h1>Loading...</h1>;
      } else {
        return (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>City</th>
                <th>Temperature (K)</th>
                <th>Pressure (hPa)</th>
                <th>Humidity (%)</th>
              </tr>
            </thead>
            <tbody>
              {this.props.weather.data.map(this.renderWeather)}
            </tbody>
          </table>
        );
      }
    } else {
      return <h1>Something went wrong</h1>;
    }
  }

  public render() {
    // tslint:disable-next-line:no-console
    console.log(this.props.weather);
    return this.renderWeatherList();
  }
}

function mapStateToProps({ weather }: any) {
  return {
    weather,
  };
}

export default connect(mapStateToProps)(WeatherList);