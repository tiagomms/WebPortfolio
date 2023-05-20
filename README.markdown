# https://tiagomms.github.io/WebPortfolio
My Web Portfolio from September 2009 (when I started university) until August 2017.

**Note:** I have not continued updating this website afterwards. Only my résumé and about me page can be up-to-date.

Layout design:
- Inkscape

Frameworks used:
- Angular2 (Angular CLI)
- D3.js (v 4.0)
- D3 Service for Angular 2+

Text Editor:
- Vim

Transition to ghpages:
- Angular CLI Ghpages @0.5.3 ([link](https://www.npmjs.com/package/angular-cli-ghpages/v/0.5.3))

---
## Commands
`npm install` (install node_modules)

`ng build --base-href "/WebPortfolio/"` (build and create minified test app into /dist folder; always use same base href as index.html)

`npm run build` (same thing as above)

`ng serve --base-href '/WebPortfolio/'` (localhost server)

`npm run start` (same thing as above)

### Upload to gh-pages (angular cli ghpages)
`ng build --prod --base-href "/WebPortfolio/"` (build in prod)

`npx ngh` (upload /dist folder into gh-pages branch)

`npm run upload2ghpages` (these two commands in a row)

---
## Notes on update from May 2023:
- This project will only *npm install* and *build* in Linux/Mac interfaces. There is a bug on node-sass internal dependencies for Windows in this version - I tried multiple things over days, and kinda just gave up.
- Do not perform *npm audit fix*. Some frameworks were not well developed at the time, and just "accept" any version. New versions of these internal dependencies just crash the install.
- For the same reason, do not delete the original package-lock.json.
