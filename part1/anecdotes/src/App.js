import React, {useState} from 'react';

const App = () => {
	const data = [
		{ text: 'If it hurts, do it more often', votes: 0},
		{ text: 'Adding manpower to a late software project makes it later!', votes: 0},
		{ text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
		{ text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
		{ text: 'Premature optimization is the root of all evil.', votes: 0},
		{ text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
		{ text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients', votes: 0},
	];

  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(data)
	

	const handleRandomNumber = () => {
		const random = Math.floor(Math.random() * anecdotes.length) ;
    setSelected(random);
    console.log({random});
  };
  

	const handleVote = () => {
		const newVotes = [...anecdotes];
    newVotes[selected] = { ...newVotes[selected], votes: newVotes[selected].votes + 1};
    setAnecdotes(newVotes)
  };
  

  const qvotes = anecdotes[selected].votes;
  const mostVoted = [...anecdotes].sort((a,b) => b.votes - a.votes)[0]
  
	return (
		<div>
			<h1>Anecdote of the day</h1>
			{anecdotes[selected].text}
			<p>has {qvotes} votes</p>
			<button onClick={handleVote}>vote</button>
			<button onClick={handleRandomNumber}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {mostVoted.text}
      <p>has {mostVoted.votes}</p>
		</div>
	);
};

export default App;
