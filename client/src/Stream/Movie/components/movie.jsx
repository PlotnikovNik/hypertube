import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';
import Moviedescription from './moviedescription';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieInfos: {}
		}
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
	}

	componentWillMount() {
		this.callInfoMovie()
		this.callInfoTorrent()
	}

	callInfoMovie() {
		callApi('/api/movie/', 'post', {imdb_code: this.props.match.params.imdb})
		.then((infoMovie) => {
			console.log(infoMovie);
			this.setState({
				movieInfos: infoMovie
			})
		})
	}

	callInfoTorrent() {
		callApi('/api/torrent/', 'post', {id: this.props.match.params.id})
		.then((infoTorrent) => {
			this.setState({
				infoTorrent: infoTorrent
			});
		})
	}

	render() {
		return(
			<div className="container">
				<h1 className="movie-title">{this.state.movieInfos.original_title}</h1>
				<div className="MovieInfos">
					<video width="1125" controls>
						<source src="http://localhost:3001/api/downloadTorrent" type="video/mp4"/>>
					</video>
				</div>
				<Moviedescription movieInfos={this.state.movieInfos}/>
			</div>
		)
	}
}

export default Movie;