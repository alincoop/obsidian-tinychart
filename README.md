# TinyChart - Obsidian Plugin

Dead simple ASCII charts for [Obsidian](https://obsidian.md).

## Supported Charts

-   ✅ Horizontal bar
-   🗓️ Vertical bar
-   🗓️ Line

## Installation

TinyChart is not yet available as an Obsidian community plugin. In the mean time, feel free to clone this repo for your local use.

### Requirements

-   [Git](https://git-scm.com/) (optional)
-   [NodeJS](https://nodejs.org/)

### Instructions

-   Clone this repo to your vault's `.obsidian/plugins` folder:

    `git clone https://github.com/alincoop/obsidian-tinychart.git`

-   Install NodeJS, then run `npm i` in the command line within the plugin folder.
-   Run `npm run build` to compile from `main.ts` to `main.js`.
-   Reload Obsidian and enable TinyChart in settings window.

# Example codeblock

````
```tinychart
Apples, 100
Bananas, 75
Oranges, 150
Grapes, 25
Pineapples, 10
Watermelons, 50
Strawberries, 150
Blueberries, 30
Raspberries, 15
Mangoes, 150
```
````

```
Apples █████████████------- 100
Bananas ██████████---------- 75
Oranges ████████████████████ 150
Grapes ███----------------- 25
Pineapples █------------------- 10
Watermelons ██████-------------- 50
Strawberries ████████████████████ 150
Blueberries ████---------------- 30
Raspberries ██------------------ 15
Mangoes ████████████████████ 150
```

<a href="https://www.buymeacoffee.com/alincoop" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174"></a>
