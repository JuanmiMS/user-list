import React, { useEffect, Fragment, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Axios from 'axios';
import NoImage from 'Images/no-image.png';

const UserCard = ({ userData }) => {
	const [user, setUser] = useState();

	const { firstName, lastName, userId } = userData;

	useEffect(() => {
		Axios.get(`https://hr.oat.taocloud.org/v1/user/${userId}`)
			.then((res) => {
				setUser(res.data);
			})
			.catch((e) => console.error(e));
	}, []);

	return (
		<div className="card">
			{user ? (
				<Fragment>
					<div className="top-card"></div>
					<section className="information">
						<img src={user.picture ? user.picture : NoImage} alt="Avatar" />
						<h2>
							{firstName} {lastName}
						</h2>
						<ReactTooltip
							className="tooltip-info"
							delayHide={100}
							effect="solid"
							place="bottom"
						/>
						<button data-tip={user.email} className="button button--primary">
							See email
						</button>
					</section>
				</Fragment>
			) : (
				<Fragment>
					<div className="top-card"></div>
					<section className="information">
						<img src={NoImage} alt="Avatar" />
						<h2>Error</h2>
					</section>
				</Fragment>
			)}
		</div>
	);
};

export default UserCard;
