// PL/0语言配置
import * as monaco from "monaco-editor";
// 高亮配置
export const pascalLanguageConfig = {
  defaultToken: "",
  tokenPostfix: ".pascal",

  keywords: [
    "const",
    "var",
    "if",
    "then",
    "else",
    "begin",
    "end",
    "while",
    "do",
    "for",
    "to",
    "endif",
    "endfor",
    "endwhile",
    "procedure",
    "call",
    "write",
  ],

  operators: ["+", "-", "*", "/", "=", "<", ">", "<=", ">=", "<>", ":=", ":"],

  // we include these common regular expressions
  // symbols: /[=><:*+\-\/\^%&|!#]/,
  symbols: /[+\-*/=<>]|[<>]=?|:=|:/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords

      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // whitespace
      { include: "@whitespace" },

      // delimiters and operators
      // [/[{}()\[\]]/, '@brackets'],
      [/[{}()[\]]/, "@brackets"],
      [
        /@symbols/,
        // /[=><:*+\-\\^%&|!#]+/,
        {
          cases: {
            "@operators": "operator", // 这里将识别为操作符的样式
            "@default": "operator",
          },
        },
      ],

      // numbers
      // [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/\d*\.\d+([eE][-+]?\d+)?/, "number.float"],
      [/\d+/, "number"],

      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],

      // strings
      [/'([^'\\]|\\.)*$/, "string.invalid"], // single-line string
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
    ],

    comment: [
      // [/[^\(\*]+/, 'comment'],

      [/[^(*]+/, "comment"],
      [/\*\)/, "comment", "@pop"],
      [/\(\*/, "comment"],
    ],

    string: [
      [/[^\\"]+/, "string"],
      [/\\./, "string.escape.invalid"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\(\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"],
    ],
  },
};
// 关键字提示配置
export const pascalCompletionProvider = {
  provideCompletionItems: (model, position) => {
    const suggestions = [];

    // 添加关键字
    const keywords = [
      "const",
      "var",
      "if",
      "then",
      "else",
      "begin",
      "end",
      "while",
      "do",
      "for",
      "to",
      "endfor",
      "endwhile",
      "endif",
    ];
    keywords.forEach((keyword) => {
      suggestions.push({
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: keyword,
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - keyword.length,
          endColumn: position.column,
        },
      });
    });

    // 添加函数或过程名
    const functionNames = ["write", "read", "call", "procedure"];
    functionNames.forEach((name) => {
      suggestions.push({
        label: name,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: `${name}()`,
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - name.length,
          endColumn: position.column,
        },
      });
    });

    return {
      suggestions: suggestions,
    };
  },
};
// export default {pascalLanguageConfig,pascalCompletionProvider};
