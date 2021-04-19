import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Home, PlayList, Player } from "./components/views";


const Main = () => (
	<Switch>
		<Route exact path="/" component={Home}></Route>
		<Route exact path="/playlist1" component={PlayList}></Route>
		<Route exact path="/video/:id" component={Player}></Route>
	</Switch>
);

const App = () => {
	return (
		<div className="App">
			<div className='App-body'>
				<Main />
			</div>
		</div>
	);
}

export default App;
