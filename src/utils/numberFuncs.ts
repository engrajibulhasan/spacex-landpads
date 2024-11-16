export const makeNum = (value: number) => {
	if (typeof value === 'number') {
		// Check if it is a decimal
		if (!Number.isInteger(value)) {
			// Format to 2 decimal places if it's a decimal
			value = parseFloat(value.toFixed(2));
		}
	}
	return value;
};
