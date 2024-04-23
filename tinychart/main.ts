import { App, Editor, MarkdownView, Plugin } from "obsidian";

interface DataEntry {
	name: string;
	age: number;
}

function parseInput(inputString: string): DataEntry[] {
	const data: DataEntry[] = [];
	const lines: string[] = inputString.trim().split("\n");
	for (const line of lines) {
		const [name, age] = line.split(",");
		const trimmedName: string = name.trim();
		const trimmedAge: number = parseInt(age.trim(), 10);
		data.push({ name: trimmedName, age: trimmedAge });
	}
	return data;
}

function generateBarChart(data: DataEntry[]): string {
	const maxAge: number = Math.max(...data.map((entry) => entry.age));
	const maxNameLength: number = Math.max(
		...data.map((entry) => entry.name.length)
	);
	const barChart: string[] = [];
	for (const { name, age } of data) {
		const barLength: number = Math.floor((age / maxAge) * 20);
		const bars: string = "█".repeat(barLength) + "-".repeat(20 - barLength);
		barChart.push(`${name.padEnd(maxNameLength + 2)} ${bars} ${age}`);
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
				const parsedData: DataEntry[] = parseInput(source);
				const barChart: string = generateBarChart(parsedData);

				const pre = el.createEl("pre");
				pre.innerText = barChart;
			}
		);
	}

	onunload() {}
}
