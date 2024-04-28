import type TinyChartPlugin from "main";
import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import { DEFAULT_SETTINGS } from "./pluginSettings";

export default class SettingTab extends PluginSettingTab {
	plugin: TinyChartPlugin;

	constructor(app: App, plugin: TinyChartPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "TinyChart Settings" });
		containerEl.createEl("h3", { text: "Horizontal Bar Chart" });

		new Setting(containerEl)
			.setName("Fill character")
			.setDesc("Single character (cannot be empty)")
			.addText((text) =>
				text
					.setPlaceholder("Enter a fill character")
					.setValue(this.plugin.settings.fill)
					.onChange(async (value) => {
						if (value != "") {
							// Check if the length of the input is greater than 1, if so truncate
							if (value.length > 1) {
								value = value.slice(0, 1);
								text.setValue(value);
								new Notice("Enter only a single character.");
							}
							// Update the plugin setting
							this.plugin.settings.fill = value;
							await this.plugin.saveSettings();
						}
					})
			);

		new Setting(containerEl)
			.setName("Empty character")
			.setDesc("Single character (cannot be empty)")
			.addText((text) =>
				text
					.setPlaceholder("Enter an empty character")
					.setValue(this.plugin.settings.empty)
					.onChange(async (value) => {
						if (value != "") {
							// Check if the length of the input is greater than 1, if so truncate
							if (value.length > 1) {
								value = value.slice(0, 1);
								text.setValue(value);
								new Notice("Enter only a single character.");
							}
							// Update the plugin setting
							this.plugin.settings.empty = value;
							await this.plugin.saveSettings();
						}
					})
			);

		new Setting(containerEl)
			.setName("Prefix character")
			.setDesc("Single character (can be empty)")
			.addText((text) =>
				text
					.setPlaceholder("Enter a prefix character")
					.setValue(this.plugin.settings.prefix)
					.onChange(async (value) => {
						// Check if the length of the input is greater than 1, if so truncate
						if (value.length > 1) {
							value = value.slice(0, 1);
							text.setValue(value);
							new Notice("Enter only a single character.");
						}
						// Update the plugin setting
						this.plugin.settings.prefix = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Suffix character")
			.setDesc("Single character (can be empty)")
			.addText((text) =>
				text
					.setPlaceholder("Enter a suffix character")
					.setValue(this.plugin.settings.suffix)
					.onChange(async (value) => {
						// Check if the length of the input is greater than 1, if so truncate
						if (value.length > 1) {
							value = value.slice(0, 1);
							text.setValue(value);
							new Notice("Enter only a single character.");
						}
						// Update the plugin setting
						this.plugin.settings.suffix = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Chart length")
			.setDesc("Length of barchart (excluding prefix/suffix and labels)")
			.addSlider((text) =>
				text
					.setLimits(10, 50, 10)
					.setValue(this.plugin.settings.chartLength)
					.onChange(async (value) => {
						this.plugin.settings.chartLength = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Code Block")
			.setDesc("Render the chart in a codeblock instead of a paragraph")
			.addToggle((text) =>
				text
					.setValue(this.plugin.settings.codeBlock)
					.onChange(async (value) => {
						this.plugin.settings.codeBlock = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Show Labels")
			.setDesc("Display value labels from the chart")
			.addToggle((text) =>
				text
					.setValue(this.plugin.settings.showLabels)
					.onChange(async (value) => {
						this.plugin.settings.showLabels = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
