import { Plugin } from "obsidian";

interface DataEntry {
	key: string;
	value: number;
}

function parseInput(inputString: string): DataEntry[] {
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

function generateBarChart(data: DataEntry[]): string {
	const maxValue: number = Math.max(...data.map((entry) => entry.value));
	const maxKeyLength: number = Math.max(
		...data.map((entry) => entry.key.length)
	);
	const barChart: string[] = [];
	for (const { key, value } of data) {
		const barLength: number = Math.floor((value / maxValue) * 10);
		const bars: string =
			"▇▇".repeat(barLength) + " ┆".repeat(10 - barLength);
		barChart.push(`${key.padEnd(maxKeyLength + 2)} ${bars} ${value}`);
	}
	return barChart.join("\n");
}

export default class MyPlugin extends Plugin {
	async onload() {
		// This replaces csv codeblocks with tables
		this.registerMarkdownCodeBlockProcessor("csv", (source, el) => {
			const rows = source.split("\n").filter((row) => row.length > 0);

			const table = el.createEl("table");
			const body = table.createEl("tbody");

			for (let i = 0; i < rows.length; i++) {
				const cols = rows[i].split(",");

				const row = body.createEl("tr");

				for (let j = 0; j < cols.length; j++) {
					row.createEl("td", { text: cols[j] });
				}
			}
		});

		// This replaces tinychart codeblocks with tiny horizontal bar charts
		this.registerMarkdownCodeBlockProcessor(
			"tinychart",
			(source: string, el: HTMLElement) => {
				try {
					const parsedData: DataEntry[] = parseInput(source);
					const barChart: string = generateBarChart(parsedData);
					const pre = el.createEl("pre");
					pre.innerText = barChart;
				} catch (error) {
					const errorEl = el.createEl("pre", {
						attr: { style: "color: red; font-family: monospace;" },
					});
					errorEl.innerText = "Syntax error!";
				}
			}
		);
	}

	onunload() {}
}
