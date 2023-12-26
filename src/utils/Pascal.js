import { Language } from '@codemirror/language';

const PL0Language = Language.define({
  parser: {
    startParse(input, startPos) {
      const stream = new StringStream(input, startPos);
      return parseProgram(stream);
    },
  },
  languageData: {
    commentTokens: { line: "//" },
    indentOnInput: /^\s*(?:begin|do|else|if|procedure|program|then|var|while)\b/,
  },
});

function parseProgram(stream) {
  const nodes = [];

  while (!stream.eol()) {
    const token = stream.next();
    if (token.type === "identifier") {
      // 解析标识符
      nodes.push({ type: "identifier", value: token.value });
    } else if (token.type === "keyword") {
      // 解析关键字
      nodes.push({ type: "keyword", value: token.value });
    } else if (token.type === "number") {
      // 解析整数
      nodes.push({ type: "number", value: token.value });
    } else if (token.type === "operator") {
      // 解析运算符
      nodes.push({ type: "operator", value: token.value });
    }
  }

  return nodes;
}

class StringStream {
  constructor(input, startPos) {
    this.input = input;
    this.pos = startPos || 0;
  }

  next() {
    if (this.pos >= this.input.length) {
      throw new Error("End of input reached");
    }

    const start = this.pos;
    let ch = this.input.charAt(this.pos);
    let type = "";

    if (/\w/.test(ch)) {
      // 匹配标识符或关键字
      while (/\w/.test(ch)) {
        this.pos++;
        ch = this.input.charAt(this.pos);
      }
      type = /\b(begin|end|if|then|while)\b/.test(this.input.slice(start, this.pos))
        ? "keyword"
        : "identifier";
    } else if (/\d/.test(ch)) {
      // 匹配整数
      while (/\d/.test(ch)) {
        this.pos++;
        ch = this.input.charAt(this.pos);
      }
      type = "number";
    } else if (/[+\-*/]/.test(ch)) {
      // 匹配运算符
      this.pos++;
      type = "operator";
    } else if (/\s/.test(ch)) {
      // 忽略空白字符
      while (/\s/.test(ch)) {
        this.pos++;
        ch = this.input.charAt(this.pos);
      }
      return this.next();
    }

    return { type, value: this.input.slice(start, this.pos) };
  }

  eol() {
    return this.pos >= this.input.length;
  }
}

export { PL0Language };