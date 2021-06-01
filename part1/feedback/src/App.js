import React, { useState} from 'react';

const Button = ({handleClick, text}) => {
	return <button onClick={handleClick}>{text}</button>;
};
const Statistic = ({text, value}) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({good, neutral, bad}) => {
	const total = good + neutral + bad;
	const average = (good + -1 * bad) / total;
	const positive = (good * 100) / total;
	if (good || neutral || bad) {
		return (
			<>
				<h1>statistics</h1>
				<table>
					<tbody>
						<Statistic text='good' value={good} />
						<Statistic text='neutral' value={neutral} />
						<Statistic text='bad' value={bad} />
						<Statistic text='all' value={total} />
						<Statistic text='average' value={average} />
						<Statistic text='positive' value={`${positive} %`} />
					</tbody>
				</table>
			</>
		);
	}

	return <p>No feedback given</p>;
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGood = () => setGood(good + 1);
	const handleNeutral = () => setNeutral(neutral + 1);
	const handleBad = () => setBad(bad + 1);

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={handleGood} text={'good'} />
			<Button handleClick={handleNeutral} text={'neutral'} />
			<Button handleClick={handleBad} text={'bad'} />
			<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	);
};

export default App;
