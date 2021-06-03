import React, {useState, useEffect} from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const CountryWeather = ({weather}) => {
  console.log({weather});
  const {location, current} = weather 
  const {name} = location;
  const {temperature, weather_icons, wind_dir, wind_speed} = current;
	return (
		<>
			<h2>Weather in {name}</h2>
			<b>temperature:</b> <p>{temperature} Celcius</p>
			<img src={weather_icons} alt='weather' />
			<b>wind:</b>{' '}
			<p>
				{wind_speed} mph direcction {wind_dir}
			</p>
		</>
	);
};

const Country = ({name, population, capital, languages, flag, weather}) => {
 
	return (
		<div>
			<h1>{name}</h1>
			<div>
				<p>capital {capital}</p>
				<p>population {population}</p>
			</div>
			<h2>languages</h2>
			<ul>
				{languages.map(language => (
					<li key={language.name}>{language.name}</li>
				))}
			</ul>
			<img style={{height: 100, width: 100}} src={flag} alt='flag' />
			{weather && <CountryWeather weather={weather} />}
		</div>
	);
};

const WarningFilter = () => {
	return <p>Too many matches, specify another filter</p>;
};

const Countries = ({countries, showCountry}) => {
	return (
		<>
			{countries.map(country => (
				<div key={country.name}>
					{country.name}
          
					<button onClick={() => showCountry(country.name)}>show</button>
				</div>
			))}
		</>
	);
};

const App = () => {
	const [keyword, setKeyword] = useState('');
	const [countries, setCountries] = useState([]);
	const [selected, setSelected] = useState(null);
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		if (keyword) {
			axios.get(`https://restcountries.eu/rest/v2/name/${keyword}`).then(res => {
				setCountries(res.data);
				if (res.data.length === 1) {
					axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${keyword}`).then(res2 => {
						setWeather(res2.data);
					});
				}
			});
		}
	}, [keyword]);

	const showCountry = name => {
		const data = countries.filter(c => c.name === name)[0];
		setSelected(data);
	};

	const handleChange = e => {
		setKeyword(e.target.value);
		setSelected(null);
	};

	const show = countries.length > 10;
	const uniqueContry = countries.length === 1;
	const country = selected ? selected : countries[0];

	return (
		<div>
			<div>
				find countries <input type='text' value={keyword} onChange={e => handleChange(e)} />
			</div>
			{uniqueContry ? <Country {...country} weather={weather}/> : show ? <WarningFilter /> : <Countries countries={countries} showCountry={id => showCountry(id)} />}
			{selected && <Country {...country} />}
		</div>
	);
};

export default App;
