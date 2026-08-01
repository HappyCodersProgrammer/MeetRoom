import React from "react";
import user from "../../assets/images/user.png";

const SignleChat = ({ text, handleChange, renderMessage, sendMessage }) => {
	return (
		<div className="w-full border-x border-b border-green-700">
			<div className="rounded-lg mb-2 tab-bar overflow-y-auto max-h-96 h-80">
				<div className="flex items-center py-1 mb-1 justify-start gap-y-1">
					<img
						src={user}
						alt="Main user"
						className="w-12 h-12 p-1 border border-slate-600 mr-1 rounded-full"
					/>
					<div>
						<h2 className="text-md font-medium text-slate-200">Hasan Rafi</h2>
						<p className="text-sm bg-slate-200 p-1 rounded">
							Guys did i join late?
						</p>
					</div>
				</div>

				<div className="flex items-center py-1 mb-1 flex-row-reverse text-right pr-1 gap-y-1">
					<img
						src={user}
						alt="Main user"
						className="w-12 h-12 p-1 border border-slate-600 ml-1 rounded-full"
					/>
					<div>
						<h2 className="text-md font-medium text-slate-200">You</h2>
						<p className="text-sm bg-slate-200 p-1 rounded">
							Guys did i join late?
						</p>
					</div>
				</div>

				<div className="flex items-center py-1 mb-1 justify-start gap-y-1">
					<img
						src={user}
						alt="Main user"
						className="w-12 h-12 p-1 border border-slate-600 mr-1 rounded-full"
					/>
					<div>
						<h2 className="text-md font-medium text-slate-200">Hasan Rafi</h2>
						<p className="text-sm bg-slate-200 p-1 rounded">
							Guys did i join late?
						</p>
					</div>
				</div>

				<div className="flex items-center py-1 mb-1 flex-row-reverse text-right pr-1 gap-y-1">
					<img
						src={user}
						alt="Main user"
						className="w-12 h-12 p-1 border border-slate-600 ml-1 rounded-full"
					/>
					<div>
						<h2 className="text-md font-medium text-slate-200">You</h2>
						<p className="text-sm bg-slate-200 p-1 rounded">
							Guys did i join late?
						</p>
					</div>
				</div>

				<div className="flex items-center py-1 mb-1 justify-start gap-y-1">
					<img
						src={user}
						alt="Main user"
						className="w-12 h-12 p-1 border border-slate-600 mr-1 rounded-full"
					/>
					<div>
						<h2 className="text-md font-medium text-slate-200">Hasan Rafi</h2>
						<p className="text-sm bg-slate-200 p-1 rounded">
							Guys did i join late?
						</p>
					</div>
				</div>

				<div className="flex items-center py-1 mb-1 flex-row-reverse text-right pr-1 gap-y-1">
					<img
						src={user}
						alt="Main user"
						className="w-12 h-12 p-1 border border-slate-600 ml-1 rounded-full"
					/>
					<div>
						<h2 className="text-md font-medium text-slate-200">You</h2>
						<p className="text-sm bg-slate-200 p-1 rounded">
							Guys did i join late?
						</p>
					</div>
				</div>
			</div>

			{/* ======Botton==== */}
			<div className="flex items-center gap-2 bg-green-600 rounded p-2 mt-4">
				<button>
					<i className="far fa-image text-3xl text-gray-200"></i>
				</button>
				<input
					type="text"
					placeholder="Type here"
					className="p-2 rounded-md border border-slate-600-none w-full px-2"
				/>
				<button>
					<i className="far fa-paper-plane text-2xl font-medium text-gray-200"></i>{" "}
				</button>
			</div>
		</div>
	);
};

export default SignleChat;
