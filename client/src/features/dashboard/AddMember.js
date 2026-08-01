import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddMember = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const imgStorageKey = "aea3d5bb8da10073ee2e8b606bfacdc1";
	const onSubmit = async (data) => {
		const image = data.image[0];
		const fromData = new FormData();
		fromData.append("image", image);
		const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
		console.log(url);
		fetch(url, {
			method: "POST",
			body: fromData,
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.success) {
					const img = result.data.url;
					const member = {
						name: data.name,
						email: data.email,
						specialty: data.specialty,
						img: img,
					};
					fetch("https://meetroom-server.onrender.com/member", {
						method: "POST",
						headers: {
							"content-type": "application/json",
						},
						body: JSON.stringify(member),
					})
						.then((res) => res.json())
						.then((inserted) => {
							if (inserted.insertedId) {
								toast.success("Member added successfully");
								reset();
							} else {
								toast.error("Failed to add the doctor");
							}
						});
				}
			});
	};
	return (
		<div className="w-full">
			<h2 className="text-center py-2 my-4 text-gray-200 bg-green-600 font-semibold text-xl">
				Add New Team
			</h2>
			<div className="flex justify-center items-center">
				<form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							placeholder="Your name"
							className="input input-bordered w-full max-w-xs"
							{...register("name", {
								required: {
									value: true,
									message: "Name is Required",
								},
							})}
						/>
						<label className="label">
							{errors.email?.type === "required" && (
								<span className="label-text-alt text-red-500">
									{errors.email.message}
								</span>
							)}
						</label>
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							placeholder="Your Email"
							className="input input-bordered w-full max-w-xs"
							{...register("email", {
								required: {
									value: true,
									message: "Email is Required",
								},
								pattern: {
									value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
									message: "Provide a valid Email",
								},
							})}
						/>
						<label className="label">
							{errors.email?.type === "required" && (
								<span className="label-text-alt text-red-500">
									{errors.email.message}
								</span>
							)}
							{errors.email?.type === "pattern" && (
								<span className="label-text-alt text-red-500">
									{errors.email.message}
								</span>
							)}
						</label>
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Specialty</span>
						</label>
						<input
							type="text"
							placeholder="specialty"
							className="input input-bordered w-full max-w-xs"
							{...register("specialty", {
								required: {
									value: true,
									message: "Specialization is Required",
								},
							})}
						/>
						<label className="label">
							{errors.password?.type === "required" && (
								<span className="label-text-alt text-red-500">
									{errors.password.message}
								</span>
							)}
							{errors.password?.type === "minLength" && (
								<span className="label-text-alt text-red-500">
									{errors.password.message}
								</span>
							)}
						</label>
					</div>

					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Photo</span>
						</label>
						<input
							type="file"
							className="input input-bordered w-full max-w-xs"
							{...register("image", {
								required: {
									value: true,
									message: "image is Required",
								},
							})}
						/>
						<label className="label">
							{errors.email?.type === "required" && (
								<span className="label-text-alt text-red-500">
									{errors.email.message}
								</span>
							)}
						</label>
					</div>

					<input
						className="btn w-full max-w-xs text-gray-200"
						type="submit"
						value="AddMember"
					/>
				</form>
			</div>
		</div>
	);
};

export default AddMember;
