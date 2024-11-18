export type DataObjType = {
	id: string;
	attempted_landings: number;
	full_name: string;
	details: string;
	landing_type: string;
	location: {
		name: string;
		latitude: number;
		longitude: number;
		region: string;
	};
	status: string;
	successful_landings: number;
	wikipedia: string;
};
export type LandingPadObjType = {
	isLoading: boolean;
	isError: boolean;
	message: string;
	data: null | DataObjType[];
};
