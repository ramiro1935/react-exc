import React from 'react';
const Header = ({name}) => {
	return <h1>{name}</h1>;
};

const Total = ({parts}) => {
	const sum = parts.reduce((sum, act) => sum+=act.exercises, 0)
	return <p>Number of exercises {sum}</p>;
};

const Part = props => {
	return (
		<p>
			{props.part.name} {props.part.exercises}
		</p>
	);
};

const Content = ({parts}) => {
	return (
		<div>
			{parts.map(part => <Part key={part.id} part={part} />)}
		</div>
	);
};
function Course({ name, parts }) {
	return (
		<div>
			<Header name={name} />
			<Content parts={parts} />
			<Total parts={parts} />
		</div>
	);
}

export default Course;
