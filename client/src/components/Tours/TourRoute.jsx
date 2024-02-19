import tokenRequest from "../../utils/tokenGetRequest";
import Tours from "./Tours";
async function loader() {
	const response = await tokenRequest("/tours");
	return response.data;
}
export const TourRoute = {
	element: <Tours />,
	loader,
};
