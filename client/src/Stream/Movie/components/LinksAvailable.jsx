
import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';

class LinksAvailable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			linksAvailable: undefined,
			seasonSelected: 0,
			seasonClassName: "season-button",
			seasonClassNameSelected: "season-button selected"
		}
		this.switchSeason = this.switchSeason.bind(this);
	}

	componentDidMount() {
		if (this.props.categorie === "tv_shows") {
			this.callInfosEpisodes(this.props.imdb);
		}
	}

	switchSeason(e) {
		this.setState({
			seasonSelected: e.target.id
		})
	}

	callInfosEpisodes(id) {
		callApi('/api/movie/getEpisodes', 'post', { imdb_id: id })
		.then((infoTorrent) => {
			this.setState({
				linksAvailable: infoTorrent
			});
		})
	}

	render() {
		console.log(this.state);
		let seasons = [];
		if (this.state.linksAvailable && this.props.categorie === "tv_shows") {
			Object.keys(this.state.linksAvailable).forEach(element => {
				seasons.push(
				<div 
					onClick={this.switchSeason} 
					id={element} 
					className={ element === this.state.seasonSelected ? this.state.seasonClassNameSelected : this.state.seasonClassName }
				>
					Season {element}
				</div>);
			})
		}
		let episodes = [];
		let json = this.state.linksAvailable;
		if (this.state.seasonSelected !== 0 && this.props.categorie === "tv_shows") {
			json[this.state.seasonSelected].forEach((element, index) => {
				episodes.push(<div className="episode_div" id={element.tvdb_id} key={index}>Episode {element.episode}: {element.title}</div>);
			});
		} else if (this.props.categorie === "movies" && this.props.movie.torrents) {
			this.props.movie.torrents.forEach((element, index) => {
				episodes.push(<div className="episode_div" id={element.quality} key={index}>{element.quality}</div> )
			});
		}
		if (this.props.categorie === "tv_shows") {
			return(
				<div className="col-md-4">
					<h3 id="available">Links</h3>
					{seasons}
					{ this.state.linksAvailable &&
 						<div className="links_available">
 							{ episodes }
 						</div>
 					}
				</div>
			)
		} else if (this.props.categorie === "movies") {
			return(
				<div className="col-md-4">
					<div>
						<h3 id="available">Links</h3>
						<div className="links_available">
							{ episodes }
						</div>
					</div>
				</div>
			)
		}
	}
}

export default LinksAvailable;