export type DataObjType = {
	id: string;
	images: {
		large: string[];
	};
	landing_attempts: number;
	name: string;
	full_name: string;
	locality: string;
	details: string;
	landing_type: string;
	latitude: number;
	longitude: number;
	region: string;
	rockets: string[];
	timezone: string;
	status: string;
	landing_successes: number;
	wikipedia: string;
};
export type LandingPadObjType = {
	isLoading: boolean;
	isError: boolean;
	message: string;
	data: null | DataObjType[];
};
