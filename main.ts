import { App, Editor, MarkdownView, Modal, Notice, Plugin } from "obsidian";
import { DEFAULT_SETTINGS, PluginSettings } from "src/pluginSettings";
import SettingsTab from "src/settingsTab";

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
		const barLength: number = Math.floor((value / maxValue) * 20);
		const bars: string = "█".repeat(barLength) + "-".repeat(20 - barLength);
		barChart.push(`${key.padEnd(maxKeyLength + 2)} ${bars} ${value}`);
	}
	return barChart.join("\n");
}

export default class TinyChartPlugin extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "insert-tinychart-template",
			name: "Insert TinyChart template",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection("`INSERT TEMPLATE`");
			},
		});

		// Init settings tab
		this.addSettingTab(new SettingsTab(this.app, this));

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

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
