import React from "react";

const VideoTile = ({
	children,
	label,
	isSelf = false,
	variant = "default",
	className = "",
}) => {
	const labelClasses = isSelf
		? "bg-sky-400 text-slate-900"
		: "bg-slate-700 text-slate-300";

	const variantClasses = {
		default: "rounded-xl border border-slate-700 shadow-lg overflow-hidden",
		pip: "rounded-lg border-2 border-slate-700 shadow-xl overflow-hidden",
		slider:
			"rounded-lg border-2 border-slate-700 overflow-hidden aspect-square",
	}[variant] || "";

	return (
		<div className={`relative bg-slate-800 ${variantClasses} ${className}`}>
			{children}
			{label && (
				<span
					className={`absolute bottom-2 left-2 text-xs font-medium px-2 py-0.5 rounded ${labelClasses}`}
				>
					{label}
				</span>
			)}
		</div>
	);
};

export default VideoTile;
