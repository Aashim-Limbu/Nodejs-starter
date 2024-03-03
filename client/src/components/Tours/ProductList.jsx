import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { MdOutlineAddLocationAlt } from "react-icons/md";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
// eslint-disable-next-line react/prop-types
export default function ProductList({ products }) {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
				<h2 className="sr-only">Products</h2>

				<div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
					{products?.map((product) => (
						<div
							key={product._id}
							className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
						>
							<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
								<img
									src={product.imagesUrl[0]}
									alt={product.name}
									className="h-full w-full object-cover object-center"
								/>
							</div>
							<div className="pb-4 pt-10 text-center">
								<h3 className="text-sm font-medium text-gray-900">
									<Link to={product._id}>
										<span aria-hidden="true" className="absolute inset-0" />
										{product.name}
									</Link>
								</h3>
								<div className="mt-3 flex flex-col items-center">
									<p className="sr-only">
										{product.ratingsAverage}/{product.ratingQuantity}
									</p>
									<div className="flex items-center">
										{[0, 1, 2, 3, 4].map((rating) => (
											<StarIcon
												key={rating}
												className={classNames(
													product.ratingsAverage > rating
														? "text-yellow-400"
														: "text-gray-200",
													"h-5 w-5 flex-shrink-0"
												)}
												aria-hidden="true"
											/>
										))}
									</div>
									<p className="mt-1 text-sm text-gray-500">
										{product.reviews.length} reviews
									</p>
								</div>
							</div>
						</div>
					))}
					<div className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
						<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-indigo-200 group-hover:opacity-75">
							<MdOutlineAddLocationAlt className="text-indigo-800" />
						</div>
						<div className="pb-4 pt-10 text-center">
							<h3 className="text-sm font-medium text-gray-900">
								<Link to="new">
									<span aria-hidden="true" className="absolute inset-0" />
									Add Tour
								</Link>
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
