import React, { Component } from "react";
import axios from "axios";

class Card extends Component {
	constructor(props) {
		super(props);

		this.state = {
			qNumber: 1,
			qText:
				"We'd like to ask you a few in depth questions about your current mortgage",
			nextQ: 2,
			answerType: "",
			answers: "",
			inputValue: ""
		};

		this.getAnswers = this.getAnswers.bind(this);
		this.renderNextQ = this.renderNextQ.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidUpdate() {
		if (this.refs.answerInput) {
			// this.setState({
			//   inputValue: this.refs.answerInput.value
			// });
			console.log(this.refs.answerInput.value);
		}
	}

	renderNextQ(next) {
		axios.get("/api/surveys/" + next).then(res => {
			this.setState({
				qNumber: res.data.number,
				qText: res.data.text,
				answerType: res.data.answerType,
				answers: res.data.answers
			});
		});
	}

	handleChange(e) {
		this.setState({
			inputValue: e.target.value
		});
	}

	getAnswers() {
		if (this.state.answerType === "") {
			return (
				<button
					onClick={() => {
						this.renderNextQ(this.state.nextQ);
					}}
					className="waves-effect waves-light btn blue lighten-5 blue-text text-darken-1"
				>
					Next
				</button>
			);
		}

		if (this.state.answerType === "input") {
			return (
				<div className="input-field col s6">
					<input
						placeholder="Input value"
						id="input_value"
						type="text"
						className="validate white-text"
						value={this.state.inputValue}
						onChange={this.handleChange}
						ref="answerInput"
					/>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="container">
				<div className="row valign-wrapper">
					<div className="col s6 offset-s3 valign">
						<div className="card blue darken-1 question-card">
							<div className="card-content white-text">
								<span className="card-title">
									Question number {this.state.qNumber}
								</span>
								<p>{this.state.qText}</p>
							</div>
							<div className="card-action">{this.getAnswers()}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Card;
