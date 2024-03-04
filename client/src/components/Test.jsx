import axios from "axios";
import { useState } from "react";
import Photo from "../assets/Photo.png";
import Button from "./Button";
function Predict() {
	const [destination, setDestination] = useState(" ");
	const [recommendation, setRecommendation] = useState({});
	async function handleSubmit(e) {
		e.preventDefault();
		const response = await axios.post("http://127.0.0.1:5001/recommend", {
			recent_location: destination,
		});
		setRecommendation(response.data);
	}
	console.log(recommendation);
	return (
		<>
			<form onSubmit={handleSubmit} className="relative flex gap-x-3">
				<label
					htmlFor="location"
					className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
				>
					Location
				</label>
				<input
					type="text"
					name="location"
					id="location"
					onChange={(e) => setDestination(e.target.value)}
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					placeholder="Pashupatinath"
				/>
				<Button type="submit" primary>
					Find
				</Button>
			</form>
			<div>
				<div className="bg-white">
					<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 md:max-w-7xl lg:max-w-full lg:px-8">
						<h2 className="sr-only">Recommendation</h2>
						{recommendation.cluster_recommendations && (
							<h2 className="pb-4 text-2xl font-bold">
								Cluster Recommendations
							</h2>
						)}

						<div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
							{recommendation.cluster_recommendations?.map((product, index) => (
								<div
									key={index}
									className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
								>
									<div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
										<img
											src={Photo}
											alt="tour-image"
											className="h-full w-full object-cover object-center sm:h-full sm:w-full"
										/>
									</div>
									<div className="flex flex-1 flex-col space-y-2 p-4">
										<h3 className="text-sm font-medium text-gray-900">
											{product.location}
										</h3>
										<p className="text-sm text-gray-500 line-clamp-3 group-hover:line-clamp-none">
											{product.description}
										</p>
										<div className="flex capitalize gap-x-2  justify-start items-center">
											<span className="font-medium">Tags:</span>
											<p className="text-sm italic text-gray-500">
												{product.tags}
											</p>
										</div>
										<div className="flex items-center gap-x-2">
											<span className="font-medium">Distance:</span>
											<p className="text-sm italic text-gray-500">
												{product.Distance}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
						<h2 className="sr-only">Recommendation</h2>
						{recommendation.tag_recommendations && (
							<h2 className="py-10 text-2xl font-bold">Tags Recommendations</h2>
						)}
						<div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
							{recommendation.tag_recommendations?.map((product, index) => (
								<div
									key={`{tag-recommendation-${index}}`}
									className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
								>
									<div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
										<img
											src={Photo}
											alt="tour-image"
											className="h-full w-full object-cover object-center sm:h-full sm:w-full"
										/>
									</div>
									<div className="flex flex-1 flex-col space-y-2 p-4">
										<h3 className="text-sm font-medium text-gray-900">
											{product.location}
										</h3>

										<p
											className={`text-sm text-gray-500 line-clamp-3 hover:line-clamp-none`}
										>
											{product.description}
										</p>

										<div className="flex capitalize gap-x-2  justify-start items-center">
											<span className="font-medium">Tags:</span>
											<p className="text-sm italic text-gray-500">
												{product.tags}
											</p>
										</div>
										<div className="flex items-center gap-x-2">
											<span className="font-medium">Distance:</span>
											<p className="text-sm italic text-gray-500">
												{product.Distance}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Predict;
