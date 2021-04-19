import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
// <img src={`http://localhost:4000/video/${name}/poster`} alt={name} />

class PlayList extends Component {
	constructor() {
		super();
		this.state = {
			videoData: []
		};
	}

	async componentDidMount() {
		try {
			const response = await fetch('http://192.168.2.39:4000/video');
			const data = await response.json();
			this.setState({ videoData: [...data] });
		} catch (err) {
			console.log(err);
		}
	};

	getVideos() {
		return this.state.videoData.map(name => (
			<div className="playback" key={name}>
				<ul> 
					<li>
						<NavLink exact activeClassName="current" to={`/video/${name}`}>
							<img src={`http://192.168.2.39:4000/video/${name}/poster`} width="240" height="180" alt='No file' />
							<h3>{name}</h3>
						</NavLink>
					</li>
				</ul>
				
			</div>
			)
		);
	}

	render() {
		// console.log(this.state.videoData);
		return (
			<div className='menu'>
				<h3> Playlist 1</h3>
				{this.getVideos()}
			</div>
		);
	}
}

export default PlayList;
