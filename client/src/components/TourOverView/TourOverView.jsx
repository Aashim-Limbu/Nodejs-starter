import { Fragment } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import { useLoaderData } from "react-router-dom";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function TourOverView() {
	const { reviews, tour: product } = useLoaderData();
	return (
		<div className="bg-white">
			<div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				{/* Product */}
				<div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
					{/* Product image */}
					<div className="lg:col-span-4 lg:row-end-1">
						<div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
							<img
								src={product.imagesUrl[0]}
								alt={product.name}
								className="object-cover object-center"
							/>
						</div>
					</div>

					{/* Product details */}
					<div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
						<div className="flex flex-col-reverse">
							<div className="mt-4">
								<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
									{product.name}
								</h1>

								<h2 id="information-heading" className="sr-only">
									Tour information
								</h2>
							</div>

							<div>
								<h3 className="sr-only">Reviews</h3>
								<div className="flex items-center">
									{[0, 1, 2, 3, 4].map((rating) => (
										<StarIcon
											key={rating}
											className={classNames(
												product.ratingsAverage > rating
													? "text-yellow-400"
													: "text-gray-300",
												"h-5 w-5 flex-shrink-0"
											)}
											aria-hidden="true"
										/>
									))}
								</div>
								<p className="sr-only">
									{product.ratingQuantity} out of 5 stars
								</p>
							</div>
						</div>

						<p className="mt-6 text-gray-500">{product.description}</p>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
							<button
								type="button"
								className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
							>
								Pay {product.price}
							</button>
							<button
								type="button"
								className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
							>
								Preview
							</button>
						</div>

						<div className="mt-10 border-t border-gray-200 pt-10">
							<h3 className="text-sm font-medium text-gray-900">Highlights</h3>
							<div className="prose prose-sm mt-4 text-gray-500">
								<ul role="list">
									<li>Difficulty: {product.difficulty}</li>
									<li>Summary: {product.summary}</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
						<Tab.Group as="div">
							<div className="border-b border-gray-200">
								<Tab.List className="-mb-px flex space-x-8">
									<Tab
										className={({ selected }) =>
											classNames(
												selected
													? "border-indigo-600 text-indigo-600"
													: "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
												"whitespace-nowrap border-b-2 py-6 text-sm font-medium"
											)
										}
									>
										Customer Reviews
									</Tab>
								</Tab.List>
							</div>
							<Tab.Panels as={Fragment}>
								<Tab.Panel className="-mb-10">
									<h3 className="sr-only">Customer Reviews</h3>

									{reviews.map((review, reviewIdx) => (
										<div
											key={review.id}
											className="flex space-x-4 text-sm text-gray-500"
										>
											<div className="flex-none py-10">
												<img
													src={review.photo}
													alt=""
													className="h-10 w-10 rounded-full bg-gray-100"
												/>
											</div>
											<div
												className={classNames(
													reviewIdx === 0 ? "" : "border-t border-gray-200",
													"py-10"
												)}
											>
												<h3 className="font-medium text-gray-900">
													{review.user.name}
												</h3>
												<p>
													<time dateTime={review.createdAt}>
														{new Date(review.createdAt)
															.toLocaleDateString()}
													</time>
												</p>

												<div className="mt-4 flex items-center">
													{[0, 1, 2, 3, 4].map((rating) => (
														<StarIcon
															key={rating}
															className={classNames(
																review.rating > rating
																	? "text-yellow-400"
																	: "text-gray-300",
																"h-5 w-5 flex-shrink-0"
															)}
															aria-hidden="true"
														/>
													))}
												</div>
												<p className="sr-only">
													{review.rating} out of 5 stars
												</p>

												<div
													className="prose prose-sm mt-4 max-w-none text-gray-500"
													dangerouslySetInnerHTML={{ __html: review.review }}
												/>
											</div>
										</div>
									))}
								</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>
					</div>
				</div>
			</div>
		</div>
	);
}
