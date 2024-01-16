
export function setupPL0Language() {
  return {
    language: {
      keywords: new Set([
        "CONST", "VAR", "PROCEDURE", "CALL", "BEGIN", "END",
        "IF", "THEN", "ELSE", "WHILE", "DO", "ODD",
      ]),

      operators: new Set([
        "+", "-", "*", "/", "=", "<>", "<", "<=", ">", ">=",
      ]),

      punctuation: new Set([";", ",", ".", ":=", "(", ")", ":"]),

      tokenizers: {
        number: [
          [/\b\d+\b/, 'number'],
        ],
        variable: [
          [/\b[A-Za-z_][A-Za-z_0-9]*\b/, 'variable'],
        ],
        comment: [
          [/\(\*[\s\S]*?\*\)/, 'comment'],
        ],
        string: [
          [/'(?:[^\\]|\\.)*'/, 'string'],
          [/"(?:[^\\]|\\.)*"/, 'string']
        ],
      },
    },
  };
}