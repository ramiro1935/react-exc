import React, {useState} from 'react';
import {useEffect} from 'react';
import personService from './services/people';

const Filter = ({filter, handleFilter}) => {
	return (
		<div>
			filter shown with <input type='text' value={filter} onChange={e => handleFilter(e.target.value)} />
		</div>
	);
};

const PersonForm = ({newName, newPhone, handleName, handlePhone, addPhone}) => {
	return (
		<form>
			<div>
				name: <input value={newName} onChange={e => handleName(e.target.value)} />
			</div>
			<div>
				number: <input value={newPhone} onChange={e => handlePhone(e.target.value)} />
			</div>
			<div>
				<button type='submit' onClick={addPhone}>
					add
				</button>
			</div>
		</form>
	);
};

const Persons = ({persons, removePerson}) => {
	return (
		<>
			{persons.map(p => (
				<div key={p.name}>
					{p.name} {p.number} <button onClick={() => removePerson(p)}>delete</button>
				</div>
			))}
		</>
	);
};
const Notification = ({message, type}) => {
	const style = type === "info"? "notification": "error";
	if (message == null) {
		return null;
	}
	
	return <div className={style}>{message}</div>;
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const [filter, setFilter] = useState('');
	const [createMessage, setCreateMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then(initialNotes => {
			setPersons(initialNotes);
		});
	}, []);

	const removePerson = ({id, name}) => {
		if (window.confirm(`Delete ${name} ?`)) {
			personService.drop(id).then(() => {
				setPersons(persons.filter(person => person.id !== id));
			});
		}
	};

	const addPhone = e => {
		e.preventDefault();
		const exist = persons.find(p => p.name === newName);
		if (!exist) {
			const newPerson = {
				name: newName,
				number: newPhone,
			};
			personService.create(newPerson).then(person => {
				setPersons([...persons, person]);
				setNewName('');
				setNewPhone('');
			});
			setCreateMessage(`Added ${newName}`);
			setTimeout(() => {
				setCreateMessage(null);
			}, 3000);
		} else {
			if (newPhone !== exist.number) {
				const newPerson = {
					...exist,
					number: newPhone,
				};
				if (window.confirm(`${exist.name} is already added to phonebook, replace the old number with a new one?`)) {
					personService
						.update(exist.id, newPerson)
						.then(personUpdated => {
							setPersons(persons.map(person => (person.id === exist.id ? personUpdated : person)));
							setNewPhone('');
							setNewName('');
						})
						.catch(err => {
							setErrorMessage(`Information of ${exist.name} has already been removed from server`);
						});
				}
			} else {
				alert(`${newName} is already added to phonebook`);
			}
		}
	};

	const data = filter.length > 0 ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : persons;
	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={createMessage} type={"info"} />
			<Notification message={errorMessage} type={"error"} />
			<Filter filter={filter} handleFilter={e => setFilter(e)} />
			<PersonForm newName={newName} newPhone={newPhone} addPhone={addPhone} handleName={e => setNewName(e)} handlePhone={e => setNewPhone(e)} />
			<h2>Numbers</h2>
			<Persons persons={data} removePerson={person => removePerson(person)} />
		</div>
	);
};

export default App;
