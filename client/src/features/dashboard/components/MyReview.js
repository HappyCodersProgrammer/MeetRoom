import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

import auth from "../../../firebase.init";

const MyReview = () => {
	const [user] = useAuthState(auth);
	const handleSubmit = (event) => {
		event.preventDefault();

		const purchase = {
			patient: user.email,

			review: event.target.review.value,

			rating: event.target.rating.value,
		};

		if (event.target.rating.value > 5 || event.target.rating.value < 1) {
			toast("Please give a valid rating");
			return;
		}
		fetch(`https://meetroom-server.onrender.com/review`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(purchase),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.acknowledged) {
					toast(`Review is set for`);
				} else {
					toast.error(`Already Review `);
				}
			});
	};

	return (
		<div>
			<h2 className="text-center">Please Provide Your Review</h2>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 gap-5 justify-items-center mt-3"
			>
				<textarea
					name="review"
					className="textarea textarea-accent"
					placeholder="Bio"
				></textarea>

				<input
					type="text"
					name="rating"
					placeholder="Give Your Rating(Out of 5)"
					className="input input-bordered w-full max-w-xs"
				/>

				<input
					type="submit"
					value="Add Review"
					className="btn btn-secondary w-full max-w-xs"
				/>
			</form>
		</div>
	);
};

export default MyReview;
