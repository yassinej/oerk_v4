import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Landing extends Component {
	render() {
		return (
			<div>
				<section className="jumbotron text-center mb-0 pb-2">
					<div className="container">
						<h1 className="jumbotron-heading">Welcome to OERK V4</h1>
						<p className="lead text-muted">
							Something short and leading about the collection below—its
							contents, the creator, etc. Make it short and sweet, but not too
							short so folks don't simply skip over it entirely. Something short
							and leading about the collection below—its contents, the creator,
							etc. Make it short and sweet, but not too short so folks don't
							simply skip over it entirely. Something short and leading about
							the collection below—its contents, the creator, etc. Make it short
							and sweet, but not too short so folks don't simply skip over it
							entirely.
						</p>
						<p>
							<NavLink className="btn btn-info" to="/items">
								Pack your Gear
							</NavLink>
							<NavLink className="btn btn-warning" to="/profile">
								Access Profile
							</NavLink>
						</p>
					</div>
				</section>
				<section>
					<div className="container-fluid p-0">
						<div className="row equal " style={{ height: '20rem' }}>
							<div className="col-md-4 bg-warning">
								<div className="">
									<p className="text-center">STEP 1</p>
								</div>
							</div>
							<div className="col-md-4 bg-secondary">
								<div className="">
									<p className="text-center">STEP 2</p>
								</div>
							</div>
							<div className="col-md-4 bg-info">
								<div className="">
									<p className="text-center">STEP 3</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Landing;
