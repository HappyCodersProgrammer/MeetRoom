import React from "react";
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithFacebook,
    useSignInWithGoogle,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
// import useToken from '../../hooks/useToken';
import Loading from "./Loading";

const SignUp = () => {
	const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [updateProfile, updating, UpError] = useUpdateProfile(auth);
	const navigate = useNavigate();

	const location = useLocation();
	let from = location.state?.from?.pathname || "/";
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const onSubmit = async (data) => {
		await createUserWithEmailAndPassword(data?.email, data?.password);
		await updateProfile({ displayName: data?.name });
	};
	const [signInWithFacebook, Fuser, Floading, Ferror] =
		useSignInWithFacebook(auth);

	if (gUser || user || Fuser) {
		navigate(from, { replace: true });
	}
	// const [token] = useToken(user || gUser || Fuser)
	let errorMessage;
	if (error || gError || UpError || Ferror) {
		errorMessage = (
			<p className="text-red-600">
				{error?.message}|| {UpError?.message}
			</p>
		);
	}
	if (loading || updating || Floading || gLoading) {
		return <Loading />;
	}
	return (
		<div className="flex min-h-screen justify-center items-center">
			<div className="card w-96 bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="text-center text-2xl font-bold">Sign Up</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
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
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="Password"
								className="input input-bordered w-full max-w-xs"
								{...register("password", {
									required: {
										value: true,
										message: "Password is Required",
									},
									minLength: {
										value: 6,
										message: "Must be 6 characters or longer",
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

						{errorMessage}
						<input
							className="btn w-full max-w-xs text-gray-200"
							type="submit"
							value="Sign Up"
						/>
					</form>
					<p>
						<small>
							Already have account{" "}
							<Link className="text-green-500" to="/signin">
								Login
							</Link>
						</small>
					</p>
					<div className="divider">OR</div>
					<button
						onClick={() => signInWithGoogle()}
						className="btn btn-outline"
					>
						Continue with Google
					</button>
					<button
						type="button"
						onClick={() => signInWithFacebook()}
						className="btn bg-blue-500  text-gray-200"
					>
						Continue with Facebook
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
