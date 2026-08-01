import React, { useEffect } from "react";
import {
    useSignInWithEmailAndPassword,
    useSignInWithFacebook,
    useSignInWithGoogle,
} from "react-firebase-hooks/auth";

import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";

import Loading from "./Loading";

const SignIn = () => {
	const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
	const [signInWithFacebook, Fuser, Floading, Ferror] =
		useSignInWithFacebook(auth);
	let signInError;
	const navigate = useNavigate();
	const location = useLocation();
	let from = location.state?.from?.pathname || "/";

	useEffect(() => {
		if (user || gUser || Fuser) {
			navigate(from, { replace: true });
		}
	}, [user, gUser, Fuser, from, navigate]);

	if (loading || gLoading || Floading) {
		return <Loading></Loading>;
	}

	if (error || gError || Ferror) {
		signInError = (
			<p className="text-red-500">
				<small>{error?.message || gError?.message}</small>
			</p>
		);
	}

	const onSubmit = (data) => {
		signInWithEmailAndPassword(data.email, data.password);
	};

	return (
		<div className="flex min-h-screen justify-center items-center">
			<div className="card w-96 bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="text-center text-2xl font-bold">Login</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
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

						{signInError}
						<input
							className="btn w-full max-w-xs text-gray-200"
							type="submit"
							value="Login"
						/>
					</form>
					<p>
						<small>
							New to MeetRoom{" "}
							<Link className="text-green-500" to="/signup">
								Create New Account
							</Link>
						</small>
					</p>
					<div className="divider">OR</div>
					<button
						onClick={() => signInWithGoogle()}
						className="btn btn-outline border-b"
					>
						Continue with Google
					</button>
					<button
						type="button"
						onClick={() => signInWithFacebook()}
						className="btn bg-blue-600  text-gray-200"
					>
						Continue with Facebook
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
