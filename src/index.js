const visit = require(`unist-util-visit`)
const find = require(`unist-util-find`)
const isRelativeUrl = require(`is-relative-url`)

const defaultTarget = "_blank"
const defaultRel = "nofollow noopener noreferrer"

module.exports = ({ markdownAST }, options = {}) => {

  const visitor = (link, url) => {
    if(!isRelativeUrl(url)) {
      link.data = {
        hProperties: {}
      }
      if(options.target !== null)
        link.data.hProperties.target = options.target || defaultTarget;
      if(options.rel !== null)
        link.data.hProperties.rel = options.rel || defaultRel;
    }
  }

  visit(markdownAST, `linkReference`, link => {
    const def = find(markdownAST, { type: 'definition', identifier: link.identifier });
    if (def && def.url)
      visitor(link, def.url);
  })

  visit(markdownAST, `link`, link => {
    visitor(link, link.url)
  })
}
