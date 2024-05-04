import { PluginSettings } from "../settings/pluginSettings";
import { DataEntry } from "./parseInput";

export function generateBarChart(
	data: DataEntry[],
	settings: PluginSettings
): string {
	let chartLength: number = settings.chartLength;
	let fillChar: string = settings.fillChar;
	let emptyChar: string = settings.emptyChar;
	let showLabelsFlag: boolean = settings.showLabels;
	let rightAlignLabelsFlag: boolean = settings.rightAlignLabels;
	let prefixChar: string = settings.prefixChar;
	let suffixChar: string = settings.suffixChar;

	const maxValue: number = Math.max(...data.map((entry) => entry.value));
	const maxValueLength: number = maxValue.toString().length;
	const maxKeyLength: number = Math.max(
		...data.map((entry) => entry.key.length)
	);
	const barChart: string[] = [];
	for (const { key, value } of data) {
		const barLength: number = Math.floor((value / maxValue) * chartLength);
		const bars: string =
			fillChar.repeat(barLength) +
			emptyChar.repeat(chartLength - barLength);
		let value_padded: string = " " + value.toString();

		if (rightAlignLabelsFlag === true) {
			value_padded = value_padded.padStart(maxValueLength + 1);
		}

		if (showLabelsFlag === true) {
			barChart.push(
				`${key.padEnd(
					maxKeyLength + 2
				)} ${prefixChar}${bars}${suffixChar}${value_padded}`
			);
		} else {
			barChart.push(
				`${key.padEnd(
					maxKeyLength + 2
				)} ${prefixChar}${bars}${suffixChar}`
			);
		}
	}
	return barChart.join("\n");
}
