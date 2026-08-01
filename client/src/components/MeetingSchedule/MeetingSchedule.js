import { format } from "date-fns";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const MeetingSchedule = () => {
	const [selectedDay, setSelectedDay] = useState(new Date());

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		const url = `https://meetroom-server.onrender.com/schedule`;
		fetch(url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
			});
	};

	return (
		<div className="card w-full mx-auto shadow-xl">
			<div className="pr-2 py-2">
				<div className="card-actions flex justify-between lg:justify-end">
					<Link to="/conference" className="btn rounded btn-sm">
						Cancel
					</Link>
				</div>
				<div className="card-actions justify-center lg:justify-start">
					<h1 className="text-lg lg:text-2xl text-gray-200 font-bold text-center lg:text-left mt-4 lg:mt-0">
						Schedule Meeting
					</h1>
				</div>
				<div className="flex flex-col lg:flex-row lg:gap-x-2">
					<div className="w-full lg:w-6/12">
						<div className="rounded-lg my-2 flex justify-center lg:justify-start">
							<DayPicker
								mode="single"
								required
								selected={selectedDay}
								onSelect={setSelectedDay}
								className="text-gray-200 border border-slate-600 p-2 rounded lg:text-lg mt-0 lg:mt-4"
							/>
						</div>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full mx-auto ml-0 lg:ml-4"
					>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text font-semibold text-gray-200">
									Meeting Purpose
								</span>
							</label>
							<input
								className="input input-bordered w-full"
								{...register("meetingPurpose")}
							/>
						</div>
						<div className="form-control w-full pb-2">
							<label className="label">
								<span className="label-text font-semibold text-gray-200">
									Select Your Time Zone
								</span>
							</label>
							<select
								className="select select-bordered"
								{...register("timeZone")}
							>
								<option selected="Landone">Landon</option>
								<option value="Dhaka">Dhaka</option>
								<option value="Newwork">Newwork</option>
								<option value="Sidne">Sidne</option>
								<option value="Dille">Dille</option>
							</select>
						</div>

						<p className="font-semibold pb-2 text-gray-200">
							Select meeting time
						</p>
						<div className="flex items-center justify-between">
							<div className="pr-4">
								<select
									placeholder="Date"
									id="countries"
									className="select select-bordered"
									{...register("startTime")}
								>
									<option selected="10.00 AM">10.00 AM</option>
									<option value="02.00 PM">02.00 PM</option>
									<option value="04.00 PM">04.00 PM</option>
									<option value="06.00 PM">06.00 PM</option>
									<option value="08.00 PM">08.00 PM</option>
								</select>
							</div>
							<p className=" pl-6 text-white font-bold text-1xl">To</p>
							<div>
								<select
									placeholder="Date"
									id="countries"
									className="select select-bordered"
									{...register("endTime")}
								>
									<option selected="10.00 AM">10.30 AM</option>
									<option value="02.30 PM">02.00 PM</option>
									<option value="04.30 PM">04.00 PM</option>
									<option value="06.30 PM">06.00 PM</option>
									<option value="08.30 PM">08.00 PM</option>
								</select>
							</div>
						</div>
						<div>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text font-semibold text-gray-200">
										Meeting Date
									</span>
								</label>
								<input
									defaultValue={format(selectedDay, "PP")}
									{...register("date")}
									className="input input-bordered w-full"
									{...register("date")}
								/>
							</div>
						</div>
						<button type="button" className="btn rounded btn-block mt-4">
							Save
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default MeetingSchedule;
