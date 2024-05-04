import type TinyChartPlugin from "main";
import { App, Notice, PluginSettingTab, Setting } from "obsidian";

export default class SettingTab extends PluginSettingTab {
	plugin: TinyChartPlugin;

	constructor(app: App, plugin: TinyChartPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Fill character")
			.setDesc("Single character (required)")
			.addText((text) =>
				text
					.setPlaceholder("Enter a character")
					.setValue(this.plugin.settings.fillChar)
					.onChange(async (value) => {
						if (value) {
							// Check if the length of the input is greater than 1, if so truncate
							if (value.length > 1) {
								value = value.slice(0, 1);
								text.setValue(value);
								new Notice("Enter only a single character");
							}
							// Update the plugin setting
							this.plugin.settings.fillChar = value;
							await this.plugin.saveSettings();
						}
					})
			);

		new Setting(containerEl)
			.setName("Empty character")
			.setDesc("Single character (optional)")
			.addText((text) =>
				text
					.setPlaceholder("Enter a character")
					.setValue(this.plugin.settings.emptyChar)
					.onChange(async (value) => {
						if (value) {
							// Check if the length of the input is greater than 1, if so truncate
							if (value.length > 1) {
								value = value.slice(0, 1);
								text.setValue(value);
								new Notice("Enter only a single character");
							}
							// Update the plugin setting
							this.plugin.settings.emptyChar = value;
							await this.plugin.saveSettings();
						} else {
							this.plugin.settings.emptyChar = "‎";
							await this.plugin.saveSettings();
						}
					})
			);

		new Setting(containerEl)
			.setName("Prefix character")
			.setDesc("Single character (optional)")
			.addText((text) =>
				text
					.setPlaceholder("Enter a character")
					.setValue(this.plugin.settings.prefixChar)
					.onChange(async (value) => {
						// Check if the length of the input is greater than 1, if so truncate
						if (value.length > 1) {
							value = value.slice(0, 1);
							text.setValue(value);
							new Notice("Enter only a single character");
						}
						// Update the plugin setting
						this.plugin.settings.prefixChar = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Suffix character")
			.setDesc("Single character (optional)")
			.addText((text) =>
				text
					.setPlaceholder("Enter a character")
					.setValue(this.plugin.settings.suffixChar)
					.onChange(async (value) => {
						// Check if the length of the input is greater than 1, if so truncate
						if (value.length > 1) {
							value = value.slice(0, 1);
							text.setValue(value);
							new Notice("Enter only a single character");
						}
						// Update the plugin setting
						this.plugin.settings.suffixChar = value;
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
			.setName("Show labels")
			.setDesc("Display value labels")
			.addToggle((text) =>
				text
					.setValue(this.plugin.settings.showLabels)
					.onChange(async (value) => {
						this.plugin.settings.showLabels = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Right align labels")
			.setDesc(
				"Align value labels to the right (Recommend disabling if using no empty character)"
			)
			.addToggle((text) =>
				text
					.setValue(this.plugin.settings.rightAlignLabels)
					.onChange(async (value) => {
						this.plugin.settings.rightAlignLabels = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Code block (recommended)")
			.setDesc("Render the chart in a codeblock instead of a paragraph")
			.addToggle((text) =>
				text
					.setValue(this.plugin.settings.codeBlock)
					.onChange(async (value) => {
						this.plugin.settings.codeBlock = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
