import React, { Component } from "react";

class Player extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videoId: this.props.match.params.id
		};
	}

	async componentDidMount() {
		try {
			const vid = document.getElementById('vid1');
			vid.volume = 0.4;
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<div className='player'>
				<h4> {this.state.videoId} </h4>
				<video id="vid1" autoPlay controls>
					<source src={`http://192.168.2.39:4000/video/${this.state.videoId}`} type="video/mp4"></source>
				</video>
			</div>
		)
	};
}

export default Player;
