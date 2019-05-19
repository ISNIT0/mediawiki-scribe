# Scribe
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![Build Status](https://travis-ci.org/ISNIT0/mediawiki-scribe.svg?branch=master)](https://travis-ci.org/ISNIT0/mediawiki-scribe)
[![CodeFactor](https://www.codefactor.io/repository/github/isnit0/mediawiki-scribe/badge)](https://www.codefactor.io/repository/github/isnit0/mediawiki-scribe)
![GitHub](https://img.shields.io/github/license/isnit0/mediawiki-scribe.svg)

## Background
@Lucy

### What
@Lucy

### When
This version of Scribe was built from 17th-19th of May 2019 at the [Wikimedia Hackathon in Prague](https://www.mediawiki.org/wiki/Wikimedia_Hackathon_2019/).

### Future Work
@Lucy

## Backend

### Dependencies
Running the Scribe server requires:
- NodeJS >= `8.0.0`
- *nix operating system
- [NewsApi.org](https://newsapi.org/) api key
- [Core.ac.uk](https://core.ac.uk/) api key
- [Bing Search & Translate](https://portal.azure.com/#home) api keys

### Developing
```bash
npm i
cp .env.example .env
# Update .env properties
npm run start:dev
```
There is also a VSCode launch configuration in [`.vscode/launch.json`](.vscode/launch.json) which has debugging support.

### Deploying
The official Scribe backend is hosted on Heroku: [https://scribe-mediawiki.herokuapp.com/ruok](https://scribe-mediawiki.herokuapp.com/ruok)
Contact @ISNIT0 for help with deploying this yourself

## Gadget/common.js
The "front-end" code can be found at [`./common.js`](./common.js). You will need to add this to your MediaWiki user's common.js, see [here](https://www.mediawiki.org/wiki/Manual:Interface/JavaScript) for more documentation.

## Contributing
Pull requests and issues are welcome. It's best to check with @luciekaffee as to her progress before spending much time developing this code-base.

## License
MIT - [LICENSE](./LICENSE)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/luciekaffee"><img src="https://avatars0.githubusercontent.com/u/28153924?v=4" width="100px;" alt="Lucie-Aimée Kaffee"/><br /><sub><b>Lucie-Aimée Kaffee</b></sub></a><br /><a href="#question-luciekaffee" title="Answering Questions">💬</a> <a href="#blog-luciekaffee" title="Blogposts">📝</a> <a href="https://github.com/ISNIT0/mediawiki-scribe/commits?author=luciekaffee" title="Documentation">📖</a> <a href="#ideas-luciekaffee" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-luciekaffee" title="Project Management">📆</a> <a href="https://github.com/ISNIT0/mediawiki-scribe/commits?author=luciekaffee" title="Tests">⚠️</a> <a href="#talk-luciekaffee" title="Talks">📢</a></td><td align="center"><a href="https://github.com/merkur0"><img src="https://avatars3.githubusercontent.com/u/19146450?v=4" width="100px;" alt="merkur0"/><br /><sub><b>merkur0</b></sub></a><br /><a href="https://github.com/ISNIT0/mediawiki-scribe/issues?q=author%3Amerkur0" title="Bug reports">🐛</a> <a href="https://github.com/ISNIT0/mediawiki-scribe/commits?author=merkur0" title="Code">💻</a> <a href="#ideas-merkur0" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ISNIT0/mediawiki-scribe/commits?author=merkur0" title="Tests">⚠️</a> <a href="#review-merkur0" title="Reviewed Pull Requests">👀</a></td><td align="center"><a href="https://simmsreeve.com"><img src="https://avatars3.githubusercontent.com/u/5173131?v=4" width="100px;" alt="Joe Reeve"/><br /><sub><b>Joe Reeve</b></sub></a><br /><a href="https://github.com/ISNIT0/mediawiki-scribe/issues?q=author%3AISNIT0" title="Bug reports">🐛</a> <a href="https://github.com/ISNIT0/mediawiki-scribe/commits?author=ISNIT0" title="Code">💻</a> <a href="#ideas-ISNIT0" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ISNIT0/mediawiki-scribe/commits?author=ISNIT0" title="Tests">⚠️</a> <a href="#review-ISNIT0" title="Reviewed Pull Requests">👀</a> <a href="#infra-ISNIT0" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#tool-ISNIT0" title="Tools">🔧</a> <a href="https://github.com/ISNIT0/mediawiki-scribe/commits?author=ISNIT0" title="Documentation">📖</a> <a href="#question-ISNIT0" title="Answering Questions">💬</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
