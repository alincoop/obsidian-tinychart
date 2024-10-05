# TinyChart Plugin

Dead simple ASCII charts for [Obsidian](https://obsidian.md).

## Supported Charts

-   ✅ Horizontal bar
-   🗓️ Vertical bar
-   🗓️ Line

## Installation

1. Within Obsidian, go to "Settings" -> "Community plugins" -> "Browse"
2. Search for "TinyChart"
3. Install and enable the plugin

## Usage

Configure charts globally using the settings tab:

-   Fill and empty characters
-   Optional prefix and suffix characters
-   Chart length
-   Enable/disable and align value labels
-   Render chart in code block or paragraph format

Open the command palette in Obsidian `Ctrl + P` and search for `TinyChart` to insert an example chart block.

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
Bananas        ██████████----------  75
Oranges        ████████████████████ 150
Grapes         ███-----------------  25
Pineapples     █-------------------  10
Watermelons    ██████--------------  50
Strawberries   ████████████████████ 150
Blueberries    ████----------------  30
Raspberries    ██------------------  15
Mangoes        ████████████████████ 150
</pre>

## Use with dataview
You can also use [dataview](https://github.com/blacksmithgu/obsidian-dataview) to dynamically generate 
charts, that means to create an ascii chart that live updates based on changes in your vault.

The following example takes all notes in `sourceFolder`, displays a frequency distribution for the 
`yamlField` (in this example the publication year):

````md
```dataviewjs
// CONFIG
const sourceFolder = "Data/articles"
const yamlField = "year";
//--------------------------------------------------
const all = dv.pages(`"${sourceFolder}"`)
    .groupBy(p => p.file.frontmatter[yamlField])
    .values // dv-array to regular array
    .map(p => `${p.key},${p.rows.length}`)
    .reverse()
dv.header(3, `Items in "${sourceFolder}" by "${yamlField}"`)
dv.span(["~~~tinychart", ...all, "~~~"].join("\n"))
```
````

This results in the following, live-updating chart:

```txt
Items in "Data/articles" by "year"
2024   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ 102
2023   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬              62
2022   ▬▬▬▬▬▬▬▬▬                       32
2021   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬             66
2020   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬               59
2019   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬                 51
2018   ▬▬▬▬▬▬▬▬▬▬▬▬▬                   45
2017   ▬▬▬▬▬                           20
2016   ▬▬▬▬▬                           17
```

## Support

This plugin is completely free and open source. If you really like it, I'd love to hear about how you're using it.

<a href="https://www.buymeacoffee.com/alincoop" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
