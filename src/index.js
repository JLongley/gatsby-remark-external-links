const visit = require(`unist-util-visit`)
const isRelativeUrl = require(`is-relative-url`)

const defaultTarget = "_blank"
const defaultRel = "nofollow noopener noreferrer"

module.exports = ({ markdownAST }, options = {}) => {

  const visitor = link => {
    if(!isRelativeUrl(link.url)) {
      link.data = {
        hProperties: {}
      }
      if(options.target !== null)
        link.data.hProperties.target = options.target || defaultTarget;
      if(options.rel !== null)
        link.data.hProperties.rel = options.rel || defaultRel;
    }
  }

  visit(markdownAST, `link`, link => {
    visitor(link)
  })
}
