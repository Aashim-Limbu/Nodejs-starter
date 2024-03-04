import { IoAirplaneOutline } from "react-icons/io5";
import { MdOutlineLocationSearching } from "react-icons/md";
import { UsersIcon } from "@heroicons/react/24/outline";
import { Link, useLoaderData } from "react-router-dom";
import tokenRequest from "../utils/tokenGetRequest";

// function classNames(...classes) {
// 	return classes.filter(Boolean).join(" ");
// }
function Stats() {
	const { users, tours } = useLoaderData();
	console.log(users.data.stats[0].noOfUser);
	// console.log(tours.data.stats[0].noOfTour);
	const stats = [
		{
			id: 1,
			name: "Total Subscribers",
			stat: `${users.data.stats[0].noOfUser}`,
			icon: UsersIcon,
			changeType: "increase",
			to: "users",
		},
		{
			id: 2,
			name: "Total Destinations",
			stat: `${tours.data.stats[0].noOfTour}`,
			icon: IoAirplaneOutline,
			changeType: "increase",
			to: "tours",
		},
		{
			id: 3,
			name: "Total Model Destinations",
			stat: "100",
			icon: MdOutlineLocationSearching,
			changeType: "decrease",
			to: "tests",
		},
	];
	return (
		<div>
			<h3 className="text-base font-semibold leading-6 text-gray-900">
				Statistics
			</h3>

			<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{stats.map((item) => (
					<div
						key={item.id}
						className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
					>
						<dt>
							<div className="absolute rounded-md bg-indigo-500 p-3">
								<item.icon className="h-6 w-6 text-white" aria-hidden="true" />
							</div>
							<p className="ml-16 truncate text-sm font-medium text-gray-500">
								{item.name}
							</p>
						</dt>
						<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
							<p className="text-2xl font-semibold text-gray-900">
								{item.stat}
							</p>

							<div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
								<div className="text-sm">
									<Link
										to={`/dashboard/${item.to}`}
										className="font-medium text-indigo-600 hover:text-indigo-500"
									>
										View all<span className="sr-only"> {item.name} stats</span>
									</Link>
								</div>
							</div>
						</dd>
					</div>
				))}
			</dl>
		</div>
	);
}

export default Stats;
async function loader() {
	const { data: users } = await tokenRequest("/users/get-users-stats");
	const { data: tours } = await tokenRequest("/tours/get-tour-stats");
	return {
		users,
		tours,
	};
}
export const StatsRoute = {
	element: <Stats />,
	loader,
};
