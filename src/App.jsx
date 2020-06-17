import React from 'react';
import ReactDOM from 'react-dom';
import 'Scss/style.scss';
import UserView from 'Components/user-view.jsx';

const App = () => {
	return (
		<UserView />
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
