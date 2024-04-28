export interface PluginSettings {
	fillChar: string;
	emptyChar: string;
	prefixChar: string;
	suffixChar: string;
	chartLength: number;
	codeBlock: boolean;
	showLabels: boolean;
}

export const DEFAULT_SETTINGS: PluginSettings = {
	fillChar: "█",
	emptyChar: "-",
	prefixChar: "",
	suffixChar: "",
	chartLength: 20,
	codeBlock: true,
	showLabels: true,
};
