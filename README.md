<div align="center">

# react-progress-bar-timer

![NPM Version](https://img.shields.io/npm/v/react-progress-bar-timer?logo=npm)
![GitHub](https://img.shields.io/github/license/wasaab/react-progress-bar-timer)
![ECMAScript Version](https://img.shields.io/badge/ES-2021-blue?logo=javascript)

Customizable React progress bar with a labeled timer

<img src="https://i.imgur.com/C013oxd.gif" style="max-width: 378px;"></img>

[Demo](#demo) •
[Examples](#examples) •
[Tech Stack](#tech-stack) •
[Features](#features) •
[Installation](#installation) •
[Usage](#usage) •
[Styling](#styling)

</div>

## Demo

[**ProgressTimer** Storybook Demo](https://master--62a00f3e9343d4004ada7469.chromatic.com/)

+ You can change the component's props via controls and see the rendered output.
+ Go to the `Docs` tab to see example usage code snippets and documentation for props of **ProgressTimer**.

## Examples

+ Example Parcel App
  + Control timer via functions exposed by ref or `started` prop.
  + [source code](example/)
  + This can be served [during development](#example-app)
+ [Halo Time](https://halo-time.vercel.app/)
  + Halo Infinite spawn timer SPA that controls started state of timers via `started` prop or by clicking a progress bar.
  + [source code](https://github.com/wasaab/halo-time)

## Tech Stack

+ [React](https://reactjs.org/)
+ [Material-UI](https://material-ui.com/)
+ [react-scripts](https://www.npmjs.com/package/react-scripts)
+ [Node.js](https://nodejs.org/)
+ [Chromatic](https://www.chromatic.com/)

## Features

+ Click to **stop** while running.
+ Click to **start** when unstarted.
+ Click to **restart** when finished.
+ Control timer with `start()`, `stop()`, and `restart()` via a ref.
+ Control timer with `started` prop.
+ Progress bar can fill or empty to represent progress.
+ Progress bar can move left or right.
+ Configure duration in seconds.
+ Flashing animation upon finishing.
+ Slide and Shrink/Grow text animations
+ When the timer is inactive, the `label` will be replaced with `buttonText` if provided.
+ Always show timer even when inactive with `showDuration` set to `true`
+ `onFinish` callback fired when timer finishes.
+ Customized styling with props
  + `color`
  + `fontColor`
  + `fontSize`
  + `rootRounded`
  + `barRounded`
  + `classes`

See [Usage](#usage) and [Styling](#styling) for more info.

## Installation

<details>
<summary>yarn</summary>

```sh
yarn add react-progress-bar-timer
```
</details>

<details>
<summary>npm</summary>

```sh
npm install react-progress-bar-timer
```
</details>

## Usage

```jsx
import ProgressTimer from 'react-progress-bar-timer';

const ExampleComponent = () => (
  <ProgressTimer label="Something" duration={30} />
);
```
<br />

[**ProgressTimer** Usage Docs](https://master--62a00f3e9343d4004ada7469.chromatic.com/?path=/docs/progress-timer--default)
+ Use the story controls to change prop values and click `Show code` to see a snippet

<br />

| Name         | Type                  | Default     | Description                                                                                                  |
|--------------|-----------------------|-------------|--------------------------------------------------------------------------------------------------------------|
| direction    | `"left"` \| `"right"` | `"right"`   | Direction the bar grows toward.                                                                              |
| variant      | `"fill"` \| `"empty"` | `"fill"`    | Determines if the bar fills or empties.                                                                      |
| color        | `string`              | `"#ffa500"` | Color of the bar; background is same with lower opacity.                                                     |
| fontColor    | `string`              | `"#212121"` | Color of the label and timer.                                                                                |
| duration     | `number`              | `60`        | Duration of the timer in seconds.                                                                            |
| label        | `string`              |             | Label that describes the timer.                                                                              |
| buttonText   | `string`              |             | Text displayed when timer is inactive (overrides label).                                                     |
| fontSize     | `string` \| `number`  |             | Font size of the label and timer. Use to scale progress bar size.                                            |
| showDuration | `boolean`             | `false`     | Whether the timer's duration should be shown when inactive.                                                  |
| rootRounded  | `boolean`             | `true`      | Whether the progress bar's root element should be rounded.                                                   |
| barRounded   | `boolean`             | `false`     | Whether the progress bar should be rounded.                                                                  |
| started      | `boolean` \| `null`   |             | Whether the timer should be started.<br/>`true` (start) \| `false` (stop) \| `null/undefined` (await input). |
| onFinish     | `func`                |             | Callback fired when the timer finishes.                                                                      |
| classes      | `object`              |             | Styles applied to the component (override or append to existing styles).                                     |

## Styling

+ The following classes can be used with the `classes` prop to customize the styling.

### CSS Classes

| Name              | Type     | Description                                   |
|-------------------|----------|-----------------------------------------------|
| root              | `string` | Styles applied to the root element.           |
| progressContainer | `string` | Styles applied to the progress bar container. |
| textContainer     | `string` | Styles applied to the text container.         |
| progress          | `string` | Styles applied to the progress bar.           |
| label             | `string` | Styles applied to the label.                  |
| time              | `string` | Styles applied to the time.                   |

## Development

### Installing Dependencies

<details>
<summary>yarn</summary>

```sh
yarn install
```
</details>

<details>
<summary>npm</summary>

```sh
npm install
```
</details>

### Storybook

> Storybook can be used to demo your code changes in real time with HMR.

#### Starting Storybook

<details>
<summary>yarn</summary>

```sh
yarn storybook
```
</details>

<details>
<summary>npm</summary>

```sh
npm storybook
```
</details>

### Example App

> In addition to Storybook, you can use the example app in `example/` to test changes.

#### Watch for changes to `src/`

<details>
<summary>yarn</summary>

```sh
yarn start
```
</details>

<details>
<summary>npm</summary>

```sh
npm start
```
</details>

#### Serve Example App

<details>
<summary>yarn</summary>

```sh
cd example/
yarn install
yarn start
```
</details>

<details>
<summary>npm</summary>

```sh
cd example/
npm install
npm start
```
</details>

> The example app will now be served locally and use HMR to live update on changes to the source code or example app.
