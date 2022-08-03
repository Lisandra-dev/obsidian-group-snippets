import {Plugin} from 'obsidian';
import {GroupSnippetsSettings, DEFAULT_SETTINGS, Snippets} from './settings';

function toggleEnabledSnippet(groupSnippet: {name: string, snippets: Snippets[]}, customCSS: any) {
	for (const snippet of groupSnippet.snippets) {
		console.log(snippet, customCSS.snippets);
		if (snippet.enabled) {
			customCSS.setCssEnabledStatus(snippet.snippetName, !customCSS.enabledSnippets.has(snippet.snippetName));
		}
	}
}

export default class GroupSnippetsPlugins extends Plugin {
	settings: GroupSnippetsSettings;

	async onload() {
		await this.loadSettings();
		const groupSnippets = this.settings.groups;
		const customCSS = (this.app as any).customCss;
		groupSnippets.forEach(group => {
			this.addCommand({
					id: `groupSnippets.${group.name}`,
					name: `Toggle Group Snippets: ${group.name}`,
					callback: async () => {
						console.log(`Toggling group snippets: ${group.name}`);
						toggleEnabledSnippet(group, customCSS);
					}
				});

		})



		this.addSettingTab(new GroupSnippetsSettings(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}



