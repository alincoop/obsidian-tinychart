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

## Example codeblock

<pre>
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
</pre>

<pre>
Apples         █████████████------- 100
Bananas        ██████████---------- 75
Oranges        ████████████████████ 150
Grapes         ███----------------- 25
Pineapples     █------------------- 10
Watermelons    ██████-------------- 50
Strawberries   ████████████████████ 150
Blueberries    ████---------------- 30
Raspberries    ██------------------ 15
Mangoes        ████████████████████ 150
</pre>

<script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="alincoop" data-color="#FFDD00" data-emoji=""  data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>
