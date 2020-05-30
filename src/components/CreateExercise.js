import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateExercise extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: '',
			description: '',
			duration: '',
			date: new Date(),
			users: []
		}
	}

	componentDidMount() {
        axios.get('http://localhost:8080/api/user')	
			.then(res => {
				this.setState({
					users: res.data.map(e => e.username),
					username: this.state.users[0]
				});
			})
			.catch(err => console.error(err));
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	onChangeDescription(e) {
		this.setState({
			description: e.target.value
		});
	}

	onChangeDuration(e) {
		this.setState({
			duration: e.target.value
		});
	}

	onChangeDate(date) {
		this.setState({
			date
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date
		}

		axios.post('http://localhost:8080/api/exercise', exercise)
			.then(res => console.log(res.data))
			.catch(err => console.error(err));

		this.setState({
			username: '',
			description: '',
			duration: '',
			date: new Date()
		})
	}

	render() {
		return (
			<div>
				<h3>Create New Exercise Log</h3>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<label htmlFor='username'>Username: </label>
						<select //ref='userInput'
							id='username'
							required
							className='form-control'
							value={this.state.username}
							onChange={this.onChangeUsername}>
							{
								this.state.users.map(user => {
									return (
										<option key={user} value={user}>
											{user}
										</option>
									);
								})
							}
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='description'>Description: </label>
						<input 
							type='text'
							id='description'
							className='form-control'
							placeholder='Enter description'
							value={this.state.description}
							onChange={this.onChangeDescription}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='duration'>Duration: </label>
						<input
							type='number'
							id='duration'
							className='form-control'
							placeholder='Enter duration (in minutes)'
							value={this.state.duration}
							onChange={this.onChangeDuration}
						/>
					</div>
					<div className='form-group'>
						<label>Date: </label>
						<div>
							<DatePicker
								selected={this.state.date}
								onChange={this.onChangeDate}
							/>
						</div>
					</div>

					<div className='form-group'>
						<input type='submit' value='Create Exercise Log' className='btn btn-primary'/>
					</div>
				</form>
			</div>
		);
	}
}