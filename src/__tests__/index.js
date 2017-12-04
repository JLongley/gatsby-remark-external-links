const Remark = require(`remark`);
const dedent = require(`dedent`);
const plugin = require(`../index`);

const remark = new Remark().data(`settings`, {
  commonmark: true,
  footnotes: true,
  pedantic: true,
})

test(`with absolute link`, () => {
  const markdownAST = remark.parse(`[Test](https://example.com/path)`);
  plugin({ markdownAST });
  expect(markdownAST).toMatchSnapshot();
});

test(`with relative link`, () => {
  const markdownAST = remark.parse(`[Test](/path)`);
  plugin({ markdownAST });
  expect(markdownAST).toMatchSnapshot();
});

test(`with reference links`, () => {
  const markdownAST = remark.parse(dedent`
    [Absolute][] [Absolute][] [Relative][] [Not a link]

    [Absolute]: https://example.com/path
    [Relative]: /path
  `);
  plugin({ markdownAST });
  expect(markdownAST).toMatchSnapshot();
});
