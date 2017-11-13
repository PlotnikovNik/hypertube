import React, { Component } from 'react';
import Thumbnail from './thumbnail';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/catalog.css';
import InfiniteScroll from 'react-infinite-scroller';
import SearchBar from '../../../General/components/SearchBar';

class Catalog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catalog: [],
			pages: 1,
			searchField: '',
			hasMore: true,
			filterBy: 'like_count',
		}
		this.updateSearchInput = this.updateSearchInput.bind(this);
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
	}

	callMoreMovies() {
		this.setState((prevState) => ({
			catalog: prevState.catalog,
			pages: prevState.pages,
			searchField: prevState.searchField,
			filterBy: prevState.filterBy,
			hasMore: false
		}))
		callApi('/api/catalog/', 'post', { pages: this.state.pages, filterBy: this.state.filterBy, searchField: this.state.searchField })
		.then((catalogMovies) => {
			let catalogArray = this.state.catalog;
			if (catalogMovies.data.movies && catalogMovies.data.movies.length > 0) {
				catalogMovies.data.movies.map(
					(movieData) => {
						catalogArray.push(movieData);
					}
				)
				this.setState((prevState) => ({
					catalog: catalogArray,
					pages: prevState.pages + 1,
					searchField: prevState.searchField,
					filterBy: prevState.filterBy,
					hasMore: catalogMovies.data.movies.length < 16 ? false : true
				}))
			} else {
				this.setState((prevState) => ({
					catalog: [],
					pages: 1,
					searchField: prevState.searchField,
					filterBy: prevState.filterBy,
					hasMore: false
				}))
			}
		})
	}

	updateSearchInput(value) {
		this.setState((prevState) => ({
			catalog: [],
			pages: 1,
			searchField: value,
			filterBy: prevState.filterBy,
			hasMore: true
		}))
	}

	render() {
		let items = [];
		this.state.catalog.map((movieData, index) => {
			items.push(<Thumbnail key={index} infos={movieData} />);
			return undefined;
		})

		return (
			<div>
				<div className="row">
					<div className="col-sm-3">
						<SearchBar updateValue={this.updateSearchInput} />
					</div>
				</div>
				<div className="row">
					<InfiniteScroll
						loadMore={this.callMoreMovies.bind(this)}
						hasMore= {this.state.hasMore}
					>
						{items}
					</InfiniteScroll>
				</div>
			</div>
		);
	}
}

export default Catalog;