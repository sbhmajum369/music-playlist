import React from "react";
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
	root: {
		background: 'linear-gradient(50deg, #F5FB42 40%, #07F9C6 80%)',
		borderRadius: 3,
		border: 0,
		color: 'black',
		fontSize: '1.5rem',
		height: 60,
		padding: '0 30px',
		boxShadow: '0 3px 5px 2px rgba(190, 245, 232, .3)',
	},
	label: {
		textTransform: 'capitalize',
	},
})(Button);

const Navigation = () => (
	<nav>
		<ul>
			<li> 
				<NavLink exact activeClassName="current" to='/playlist1'>
					<StyledButton> <h4> Playlist 1 </h4> </StyledButton>
				</NavLink>
			</li>
			<li> 
				<NavLink exact activeClassName="current" to='/playlist2'>
					<StyledButton> <h4> Playlist 2 </h4> </StyledButton>
				</NavLink>
			</li>
		</ul>
	</nav>
);

const Home = () => {
	return (
	<div className='home'>
		<h2> Welcome to your Personal Playlist </h2>
		<br/>
		<Navigation />
	</div>
	);
}

export default Home;
