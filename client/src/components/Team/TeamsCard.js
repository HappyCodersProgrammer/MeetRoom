import React from "react";

const TeamsCard = ({ member }) => {
	return (
		<div className="p-1">
			{/* <!-- team block --> */}
			<div
				className="relative overflow-hidden bg-white dark:bg-gray-800"
				data-wow-delay=".1s"
			>
				<div className="relative overflow-hidden px-6 ">
					<img
						src={member.img}
						className="max-w-full h-auto mx-auto rounded-full bg-gray-50 grayscale img-fluid"
						alt="title"
					/>
				</div>
				<div className="pt-6 text-center">
					<p className="text-lg leading-normal font-bold mb-1">{member.name}</p>
					<p className="text-gray-500 leading-relaxed font-light">
						{member.specialty}
					</p>
					{/* <!-- social icon --> */}
					<div className="mt-2 mb-5 space-x-2">
						<a
							className="hover:text-blue-700"
							aria-label="Twitter link"
							href="#4"
						>
							<i className="fab fa-twitter text-twitter"></i>
						</a>
						<a
							className="hover:text-blue-700"
							aria-label="Facebook link"
							href="#5"
						>
							<i className="fab fa-facebook text-facebook"></i>
						</a>
						<a
							className="hover:text-blue-700"
							aria-label="Instagram link"
							href="#5"
						>
							<i className="fab fa-instagram text-instagram"></i>
						</a>
						<a
							className="hover:text-blue-700"
							aria-label="Linkedin link"
							href="#5"
						>
							<i className="fab fa-linkedin text-linkedin"></i>
						</a>
					</div>
				</div>
			</div>
			{/* <!-- end team block --> */}
		</div>
	);
};

export default TeamsCard;
