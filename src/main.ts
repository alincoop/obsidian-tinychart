import { App, Editor, MarkdownView, Modal, Notice, Plugin } from "obsidian";
import { DEFAULT_SETTINGS, PluginSettings } from "./settings/pluginSettings";
import SettingsTab from "./settings/settingsTab";
import { parseInput } from "./charts/parseInput";
import { generateBarChart } from "./charts/horizontalBar";

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
			id: "horizontal-bar-example",
			name: "Insert horizontal barchart example",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection(
					"```tinychart\nApples, 100\nBananas, 75\nOranges, 150\nGrapes, 25\nPineapples, 10\nWatermelons, 50\nstrawberries, 150\nBlueberries, 30\nRaspberries, 15\nMangoes, 150\n```"
				);
			},
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
