export interface DataEntry {
	key: string;
	value: number;
}

export function parseInput(inputString: string): DataEntry[] {
	const data: DataEntry[] = [];
	const lines: string[] = inputString.trim().split("\n");
	for (const line of lines) {
		const [key, value] = line.split(",");
		const trimmedKey: string = key.trim();
		const trimmedValue: number = parseInt(value.trim(), 10);
		data.push({ key: trimmedKey, value: trimmedValue });
	}
	return data;
}
