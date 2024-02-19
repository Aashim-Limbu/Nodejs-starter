import tokenRequest from "../../utils/tokenRequest";
import TourOverView from "./TourOverView";
async function loader(request) {
	const { tourId } = request.params;
	const tour = await tokenRequest(`/tours/${tourId}`);
	const reviews = await tokenRequest(`/tours/${tourId}/reviews`);
	return {
		tour: tour.data.data.data,
		reviews: reviews.data.data.data,
	};
}
export const TourOverViewRoute = {
	element: <TourOverView />,
	loader,
};
