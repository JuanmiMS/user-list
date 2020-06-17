import React, { useState, useEffect, Fragment } from 'react';
import UserCard from 'Components/user-card.jsx';
import Axios from 'axios';

const UserView = () => {
	const [data, setData] = useState([]);
	const [name, setName] = useState('');
	const [end, setEnd] = useState(false);
	const [hadError, setHadError] = useState(false);
	const [offSet, setOffset] = useState(0);

	useEffect(() => {
		Axios.get(`https://hr.oat.taocloud.org/v1/users?name=${name}&limit=12&offset=${offSet}`)
			.then((res) => {
				setData(data.concat(res.data));
				!res.data.length ? setEnd(true) : setEnd(false);
			})
			.catch(() => setHadError(true));
	}, [offSet, name]);

	function handleScroll(event) {
		const target = event.target;

		if (target.scrollHeight - target.scrollTop === target.clientHeight) {
			setOffset(offSet + 12);
		}

		if (target.scrollTop < 50) {
			document.getElementById('scroll-down-info').style.visibility = 'visible';
			document.getElementById('scroll-down-info').style.opacity = 1;
		} else {
			document.getElementById('scroll-down-info').style.visibility = 'hidden';
			document.getElementById('scroll-down-info').style.opacity = 0;
		}
	}

	function search(value) {
		if (value.length > 2) {
			resetSearch();
			setName(value);
		}
		if (value.length === 0) {
			resetSearch();
			setName('');
		}
	}

	function resetSearch() {
		setOffset(0);
		setData([]);
	}

	return (
		<Fragment>
			<div className="header">
				<div className="logo" />
			</div>
			<div className="container">
				<input
					className="search-user"
					type="text"
					name="user"
					onChange={(e) => search(e.target.value)}
					placeholder="Search user"
				/>
				<div className="wrap" onScroll={(e) => handleScroll(e)}>
					<section className="cards">
						{data && data.map((user) => <UserCard key={user.userId} userData={user} />)}
					</section>
					<div id="scroll-down-info">
						<p>Scroll down to load more</p>
					</div>
					{end ? <h1 className="no-results">End of results</h1> : null}
					{hadError ? (
						<h1 className="no-results">An error ocurred while retrieving the data</h1>
					) : null}
				</div>
			</div>
		</Fragment>
	);
};

export default UserView;
