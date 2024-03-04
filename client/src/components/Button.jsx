import classNames from "classnames";
// eslint-disable-next-line react/prop-types
export default function Button({ children, primary, danger, className, type }) {
	const buttonClasses = classNames({
		"rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600":
			primary,
		"inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto":
			danger,
	});

	const buttonType = type ? type : "button";

	return (
		<button type={buttonType} className={`${buttonClasses} ${className}`}>
			{children}
		</button>
	);
}
