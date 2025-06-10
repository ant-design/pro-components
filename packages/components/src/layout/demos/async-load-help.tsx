import { ProHelp, ProHelpPanel } from '@ant-design/pro-components';
import { App } from 'antd';

import ReactMarkdown from 'react-markdown';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

export default () => {
  const map = new Map();
  map.set(
    'markdown',
    (item: {
      valueType: string;
      children: {
        className: string;
        children: string;
      };
    }) => {
      return (
        <div className={item.children.className}>
          <ReactMarkdown>{item.children.children?.trim()}</ReactMarkdown>
        </div>
      );
    },
  );
  return (
    <App>
      <div
        style={{
          margin: 24,
          paddingBlockEnd: 128,
          display: 'flex',
          gap: 24,
          flexDirection: 'column',
        }}
      >
        <ProHelp<{
          markdown: {
            className: string;
            children: string;
          };
        }>
          valueTypeMap={map}
          onLoadContext={async (key) => {
            await waitTime(1000);
            if (key === '1') {
              return [
                {
                  valueType: 'h1',
                  children: '如何开始操作数据授权？',
                },
                {
                  valueType: 'text',
                  children: `需要进行数据合作的数据提供方（数据源）和数据需求方双方都需要先安装部署`,
                },
                {
                  valueType: 'html',
                  children: {
                    children: `<b>加粗文本</b><br><br>
  <i>斜体文本</i><br><br>
  <code>电脑自动输出</code><br><br>
  这是 <sub> 下标</sub> 和 <sup> 上标</sup>
  `,
                  },
                },
              ];
            }
            return [
              {
                valueType: 'h1',
                children: 'Markdown 语法',
              },
              {
                valueType: 'markdown',
                children: {
                  className: 'markdown',
                  children: `

# h1 Heading 8-)

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

                 

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code


Block code "fences"

\`\`\` 
Sample text here...
\`\`\` 

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
`,
                },
              },
              {
                valueType: 'inlineLink',
                children: {
                  href: 'https://www.alipay.com',
                  children: '摩斯产品',
                },
              },
              {
                valueType: 'text',
                children:
                  '节点。并将各自的摩斯计算节点、子账号等的版本信息、业务需求、数据量级（几行几列）等信息同步给到摩斯产运负责人。',
              },
            ];
          }}
          dataSource={[
            {
              title: '常见问题',
              key: 'default',
              children: [
                {
                  title: 'html 语法',
                  key: '1',
                  asyncLoad: true,
                },
                {
                  title: 'markdown 语法',
                  key: '2',
                  asyncLoad: true,
                },
              ],
            },
          ]}
        >
          <div
            style={{
              width: 400,
            }}
          >
            <ProHelpPanel defaultSelectedKey="1" height={448} />
          </div>
        </ProHelp>
      </div>
    </App>
  );
};
