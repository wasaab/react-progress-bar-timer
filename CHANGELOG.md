# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.3] - 2022-06-11
### Added
- default values in usage docs

### Fixed
- chromatic build fixed for checkout@v2
- parcel build

## [0.3.2] - 2022-06-11
### Added
- readme
- git tag & npm publish github workflow

## [0.3.1] - 2022-06-07
### Added
- chromatic github workflow for CI/CD
- chromatic dep to publish storybook

### Fixed
- storybook glob

## [0.3.0] - 2022-06-07
### Added
- onFinish callback prop

### Changed
- unique package name to allow for npm publish
- useTimer hook extracted from ProgressTimer
- only publishing dist to npm, not src
- components moved to components/

## [0.2.0] - 2022-06-02
### Added
- ProgressTimer, stories, and test
- example parcel app
- mui, emotion, and tss-react deps
- .eslintrc added to disable tsdx's prettier plugin rules

### Changed
- .parcel-cache ignored by git and npm
- size limit 10kB -> 350kB

### Fixed
- tsdx's version of TS now matches project
- VS Code uses TS version of project
- tsconfig using proper "react-jsx" value of "jsx" key
- only testing node versions supported by tsdx in git workflow

## [0.1.0] - 2022-06-01
### Added
- component lib generated via tsdx
