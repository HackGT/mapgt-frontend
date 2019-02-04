// use the parser to parse content
// look for specific keywords
const tools = require('simple-svg-tools');
const JSSoup = require('jssoup').default;
const svgson = require('svgson');

tools.ImportSVG('assets/maps/IC-floor1.svg').then(svg => {
    const svgString = svg.toString();
    svgson.parse(svgString).then(function(json) {
    console.log(JSON.stringify(json, null, 2))

  })
  console.log(err);
});
