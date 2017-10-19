import React, { Component } from 'react';

class Landing extends Component {
	render() {
		return (
			<div>
				<div>
					<h1>Welcome to OERK V4</h1>
				</div>
				<div>
					<div>Step1</div>
					<div>Step2</div>
					<div>Step3</div>
				</div>
				<div>
					<h2>Get Started</h2>
					<button>
						<a href="/auth/google">SignIn with Google</a>
					</button>
				</div>
			</div>
		);
	}
}

export default Landing;
