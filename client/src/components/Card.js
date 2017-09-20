import React, { Component } from "react";
import axios from "axios";
import _ from 'lodash';

class Card extends Component {
	constructor(props) {
		super(props);

		this.state = {
			qNumber: 1,
			qText:
				"We'd like to ask you a few in depth questions about your current mortgage",
			answerType: "",
			answers: "",
			inputValue: "",
			redirect: ""
		};

		this.getAnswers = this.getAnswers.bind(this);
		this.renderNextQ = this.renderNextQ.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	renderNextQ(answerType, chosenAnswer) {
		const callToRedirect = () => {
			axios.get("/api/surveys/" + this.state.redirect).then(res => {
				this.setState({
					qNumber: res.data.number,
					qText: res.data.text,
					answerType: res.data.answerType,
					answers: res.data.answers,
					redirect: res.data.redirect || ''
				});
			});
		};

		const callToNext = nextQ => {
			axios.get("/api/surveys/" + nextQ).then(res => {
				this.setState({
					qNumber: res.data.number,
					qText: res.data.text,
					answerType: res.data.answerType,
					answers: res.data.answers,
					redirect: res.data.redirect || ''
				});
			});
		};

		// NO ANSWER TYPE
		if (answerType === "") {
			if (this.state.redirect !== "") {
				callToRedirect();
			} else {
				const nextQ = this.state.qNumber + 1;
				callToNext(nextQ);
			}
		}

		// INPUT ANSWER TYPE
		if (answerType === "input") {
			if (this.state.redirect !== "") {
				const userInput = this.refs.answerInput.value;

				if (userInput === "0") {
					callToRedirect();
				} else {
					const nextQ = Number(this.state.qNumber) + 1;
					callToNext(nextQ);
				}
			} else {
				const nextQ = Number(this.state.qNumber) + 1;
				callToNext(nextQ);
			}
		}

		if (answerType === 'radio') {
			const answer = Number(chosenAnswer) - 1;
			const answerRedirect = this.state.answers[Object.keys(this.state.answers)[answer]].redirect;
			if (answerRedirect === false) {
				const nextQ = Number(this.state.qNumber) + 1;
				callToNext(nextQ);
			} else {
				const nextQ = answerRedirect;
				callToNext(nextQ);
			}
		}

		if (answerType === 'checkbox') {
			const nextQ = Number(this.state.qNumber) + 1;
			callToNext(nextQ);
		}
	}

	handleChange(e) {
		this.setState({
			inputValue: e.target.value
		});
	}

	getAnswers() {
		if (this.state.answerType === "dashboard") {

			return (
				<span></span>
			);
		}

		if (this.state.answerType === "") {
			return (
				<button
					onClick={() => {
						this.renderNextQ(this.state.answerType, null);
					}}
					className="waves-effect waves-light btn blue lighten-5 blue-text text-darken-1"
				>
					Next
				</button>
			);
		}

		if (this.state.answerType === "input") {
			return (
				<div className="input-field">
					<input
						placeholder="Input value"
						id="input_value"
						type="text"
						className="validate white-text"
						value={this.state.inputValue}
						onChange={this.handleChange}
						ref="answerInput"
					/>
					<button
						onClick={() => {
							this.renderNextQ(this.state.answerType, null);
						}}
						className="waves-effect waves-light btn blue lighten-5 blue-text text-darken-1"
					>
						Next
					</button>
				</div>
			);
		}

		if (this.state.answerType === "radio") {
			const answers = this.state.answers;
			const numberOfAnswers = _.size(this.state.answers);

			let rows = [];
			for (let i=0; i < numberOfAnswers; i++) {
					let answerItem = answers[Object.keys(answers)[i]];
			    rows.push(
						<p key={i}>
				      <input name="group1" type="radio" id={i+1} />
				      <label className="white-text" htmlFor={i+1}>{answerItem.text}</label>
				    </p>
					);

			}
			return (
				<div>
					{rows}
					<button
						onClick={() => {
							var radioAnswer = document.querySelector('input[name = "group1"]:checked').id;
							this.renderNextQ(this.state.answerType, radioAnswer);
						}}
						className="waves-effect waves-light btn blue lighten-5 blue-text text-darken-1"
					>Next
				</button>
				</div>
			)
		}

		if (this.state.answerType === "checkbox") {
			const answers = this.state.answers;
			const numberOfAnswers = _.size(this.state.answers);
			
			let rows = [];
			for (let i=0; i < numberOfAnswers; i++) {
					let answerItem = answers[Object.keys(answers)[i]];
			    rows.push(
						<p key={i}>
				      <input name="group2" type="checkbox" id={i+1} />
				      <label className="white-text" htmlFor={i+1}>{answerItem.text}</label>
				    </p>
					);

			}
			return (
				<div>
					{rows}
					<button
						onClick={() => {
							this.renderNextQ(this.state.answerType, null);
						}}
						className="waves-effect waves-light btn blue lighten-5 blue-text text-darken-1"
					>Next
				</button>
				</div>
			)
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
									{this.state.qNumber}
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
