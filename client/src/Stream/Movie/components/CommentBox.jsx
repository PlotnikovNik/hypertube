import React, { Component } from 'react';
import '../css/movie.css';

class CommentBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: this.props.commentsInfo
		};
	}

	render() {
		if (this.state.comment.length > 0) {
			return (
				<div className="comment-box">

				</div>
			);
		} else {
			return (
				<div className="comment-box empty-box">
					<p>This video doens't have any comment yet.</p>
					<p>Add yours !</p>
					<form onSubmit={this.props.postComment}>
						<div className="input-group">
							<input type="text" name="Add comment" className="form-control" placeholder="Your comment..." aria-label="Your comment..." />
							<span className="input-group-btn">
								<button className="btn btn-primary" type="submit">Add</button>
							</span>
						</div>
					</form>
				</div>
			);
		}
	}
}

export default CommentBox;