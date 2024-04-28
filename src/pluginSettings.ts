export interface PluginSettings {
	fill: string;
	empty: string;
	prefix: string;
	suffix: string;
	chartLength: number;
	codeBlock: boolean;
	showLabels: boolean;
}

export const DEFAULT_SETTINGS: PluginSettings = {
	fill: "█",
	empty: "-",
	prefix: "[",
	suffix: "]",
	chartLength: 20,
	codeBlock: true,
	showLabels: true,
};
