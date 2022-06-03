# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- ProgressTimer, stories, and test
- example parcel app
- mui, emotion, and tss-react deps
- .eslintrc added to disable tsdx's prettier plugin rules

### Changed
- .parcel-cache ignored by git and npm

### Fixed
- tsdx's version of TS now matches project
- VS Code uses TS version of project
- tsconfig using proper "react-jsx" value of "jsx" key
- only testing node versions supported by tsdx in git workflow

## [0.1.0] - 2022-06-01
### Added
- component lib generated via tsdx
