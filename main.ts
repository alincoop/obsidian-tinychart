import { App, Editor, MarkdownView, Modal, Notice, Plugin } from "obsidian";
import { DEFAULT_SETTINGS, PluginSettings } from "src/settings/pluginSettings";
import SettingsTab from "src/settings/settingsTab";
import { parseInput, generateBarChart } from "src/charts/horizontalBar";

interface DataEntry {
	key: string;
	value: number;
}

export default class TinyChartPlugin extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();

		// Init settings tab
		this.addSettingTab(new SettingsTab(this.app, this));

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "insert-tinychart-template",
			name: "Insert TinyChart template",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection("`INSERT TEMPLATE`");
			},
		});

		// TEST INSERT
		this.addCommand({
			id: "tinychart-test",
			name: "Insert TinyChart test",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection(
					"chartLength: " + this.settings.chartLength.toString()
				);
			},
		});

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
					const barChart: string = generateBarChart(
						parsedData,
						this.settings
					);
					// Set the blocktype depending on the setting
					let codeBlockFlag: boolean = this.settings.codeBlock;
					let blockType: "pre" | "p";
					if (codeBlockFlag) {
						blockType = "pre";
					} else {
						blockType = "p";
					}
					const block = el.createEl(blockType, {
						attr: { style: "font-family: monospace;" },
					});
					block.innerText = barChart;
				} catch (error) {
					const errorEl = el.createEl("pre", {
						attr: { style: "color: red; font-family: monospace;" },
					});
					errorEl.innerText = "[TinyChart] \n" + error;
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
