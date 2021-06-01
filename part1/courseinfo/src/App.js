import React from 'react';

const App = () => {
	const course = 'Half Stack application development';
	const part1 = 'Fundamentals of React';
	const exercises1 = 10;
	const part2 = 'Using props to pass data';
	const exercises2 = 7;
	const part3 = 'State of a component';
	const exercises3 = 14;

	const Header = ({course}) => {
		return <h1>{course}</h1>;
	};

	const Part = ({part, excersice}) => {
		return (
			<p>
				{part} {excersice}
			</p>
		);
	};
	const Content = ({part1, part2, part3, exc1, exc2, exc3}) => {
		return (
			<>
				{' '}
				<Part part={part1} excersice={exc1} />
				<Part part={part2} excersice={exc2} />
				<Part part={part3} excersice={exc3} />
			</>
		);
	};
	const Total = ({exc1, exc2, exc3}) => {
		return <p>Number of exercises {exc1 + exc2 + exc3}</p>;
	};
	return (
		<div>
			<Header course={course} />
			<Content part1={part1} exc1={exercises1} part2={part2} exc2={exercises2} part3={part3} exc3={exercises3} />

			<Total exc1={exercises1} exc2={exercises2} exc3={exercises3} />
		</div>
	);
};

export default App;
