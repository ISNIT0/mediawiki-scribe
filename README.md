# Scribe
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![Build Status](https://travis-ci.org/ISNIT0/mediawiki-scribe.svg?branch=master)](https://travis-ci.org/ISNIT0/mediawiki-scribe)
[![CodeFactor](https://www.codefactor.io/repository/github/isnit0/mediawiki-scribe/badge)](https://www.codefactor.io/repository/github/isnit0/mediawiki-scribe)
[![codecov](https://codecov.io/gh/ISNIT0/mediawiki-scribe/branch/master/graph/badge.svg)](https://codecov.io/gh/ISNIT0/mediawiki-scribe)
![GitHub](https://img.shields.io/github/license/isnit0/mediawiki-scribe.svg)

## Background
Underserved Wikipedias (i.e. Wikipedias with a low number of articles and/or editors) often have a problem to recruit new editors to create high-quality articles. A lot of effort is invested into the recruitment and sustaining of new editors, especially in the human involvment level. For example, the Teahouse on English Wikipedia offers a plattform to exchange with other editors with a focus on a newcomer-friendly environment. 

However, many of those efforts are limited in their application to the different Wikipedia communities. Particularly in under-resourced Wikipedia communities, the doubled commitment might lead to a decrease in productivity of the efforts. 

Therefore, additionally to the community engagement, technical solutions to the problem need to be explored. 

### What
We proposed the tool **Scribe** in [previous work](http://tinyurl.com/WikipediaScribe). This repository presents the prototype of Scribe as a Wikipedia userscript.

Scribe supports editors in creating new articles. The focus of Scribe is twofold: First, when editors start writing the article, the tool suggests them section headings, so that the have a skeleton for their article to fill. Second, Scribe suggests references for each section that the editors can choose to include. The goal is to support the writing of high-quality articles, that conform the standards of existing articles and have a high coverage of articles. 

![Poster of the Wikimedia Hackathon, adapted to add participants of the project](https://github.com/ISNIT0/mediawiki-scribe/blob/master/Copy%20of%20Scribe%20Poster%20Wikimedia%20Hackathon.png)

### When
This version of Scribe was built from 17th-19th of May 2019 at the [Wikimedia Hackathon in Prague](https://www.mediawiki.org/wiki/Wikimedia_Hackathon_2019).

### Future Work
This repository represents the prototype of Scribe. It is a proof of concept, and is not aimed to be in production in the current form. However, it is a starting point for the work of Scribe. 
The future work is tracked as tickets with the *future work* tag. Please refer to the issues to find details on the future work. 
In summary, we will focus on a better selection of section headings and reference selection, with a focus on reference quality and appropriateness. 

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
