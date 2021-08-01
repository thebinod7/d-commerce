import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../../partials/header';
import Footer from '../../partials/footer';
import Sidebar from '../../partials/sidebar';
import Home from './home';

export default function Index() {
	return (
		<div style={{ padding: 30 }}>
			<Header />
			<Sidebar />
			<div className="container">
				<Switch>
					<Route exact path="/" component={Home} />
					{/* OTHER DASHBOARD ROUTES GOES HERE */}
				</Switch>
				<Footer />
			</div>
		</div>
	);
}
