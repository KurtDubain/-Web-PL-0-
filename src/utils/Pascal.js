import * as monaco from 'monaco-editor'
export const pascalLanguageConfig = {
  defaultToken: '',
  tokenPostfix: '.pascal',

  keywords: [
    'if', 'then', 'else', 'begin', 'end', 'while', 'do', 'repeat', 'until', 'for', 'to', 'downto'
  ],

  operators: [
    '+', '-', '*', '/', '=', '<', '>', '<=', '>=', '<>', ':=', ':'
  ],

  // we include these common regular expressions
  // symbols: /[=><:*+\-\/\^%&|!#]/,
  symbols: /[=><:*+\-\\^%&|!#]/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [/[a-zA-Z_]\w*/, {
        cases: {
          '@keywords': 'keyword',
          '@default': 'identifier'
        }
      }],

      // whitespace
      { include: '@whitespace' },

      // delimiters and operators
      // [/[{}()\[\]]/, '@brackets'],
      [/[{}()[\]]/, '@brackets'],
      [/@symbols/, {
        cases: {
          '@operators': 'operator',
          '@default': ''
        }
      }],

      // numbers
      // [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/\d*\.\d+([eE][-+]?\d+)?/, 'number.float'],
      [/\d+/, 'number'],

      // delimiter: after number because of .\d floats
      [/[;,.]/, 'delimiter'],

      // strings
      [/'([^'\\]|\\.)*$/, 'string.invalid'],  // single-line string
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
    ],

    comment: [
      // [/[^\(\*]+/, 'comment'],

      [/[^(*]+/, 'comment'],
      [/\*\)/, 'comment', '@pop'],
      [/\(\*/, 'comment']
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\(\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
    ],
  },
};
export const pascalCompletionProvider = {
  provideCompletionItems: (model, position) => {
    const suggestions = [];

    // 添加关键字
    const keywords = ['if', 'then', 'else', 'begin', 'end', 'while', 'do', 'repeat', 'until', 'for', 'to', 'downto'];
    keywords.forEach(keyword => {
      suggestions.push({
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: keyword,
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - keyword.length,
          endColumn: position.column
        }
      });
    });

    // 添加函数或过程名
    // 示例：假设已有一个数组存储了已定义的函数和过程名
    const functionNames = ['writeln', 'readln', 'max', 'min'];
    functionNames.forEach(name => {
      suggestions.push({
        label: name,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: `${name}()`,
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - name.length,
          endColumn: position.column
        }
      });
    });

    // 添加其他补全项...

    return {
      suggestions: suggestions
    };
  }
};
// export default {pascalLanguageConfig,pascalCompletionProvider};
