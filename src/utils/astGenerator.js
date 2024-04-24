function formatAST(node, depth = 0) {
  if (typeof node === "string") {
    return node;
  }
  let output = "";
  const indent = "|  ".repeat(depth);
  output += `${indent}${node.type}`;

  if (node.name) {
    output += `: ${node.name}`;
  }

  if (node.value) {
    output += `: ${node.value}`;
  }

  output += "\n";

  if (node.children) {
    node.children.forEach((child) => {
      output += formatAST(child, depth + 1);
    });
  }

  if (node.statements) {
    node.statements.forEach((statement) => {
      output += formatAST(statement, depth + 1);
    });
  }

  if (node.expression) {
    output += `${indent}|— Expression\n`;
    output += formatAST(node.expression, depth + 2);
  }

  if (node.condition) {
    output += `${indent}|— Condition\n`;
    output += formatAST(node.condition, depth + 2);
  }

  if (node.thenStatement) {
    output += `${indent}|— ThenStatement\n`;
    output += formatAST(node.thenStatement, depth + 2);
  }

  if (node.elseIfStatement) {
    node.elseIfStatement.forEach((elseif, index) => {
      output += `${indent}|— ElseIfStatement ${index + 1}\n`;
      output += formatAST(elseif, depth + 2);
    });
  }

  if (node.elseStatement) {
    output += `${indent}|— ElseStatement\n`;
    output += formatAST(node.elseStatement, depth + 2);
  }

  return output;
}
export default formatAST;

// 使用示例
const ast = {
  type: "Program",
  children: [
    {
      type: "Block",
      children: [
        {
          type: "Declaration",
          children: [
            {
              type: "VarDeclaration",
              name: "x",
            },
          ],
        },
        {
          type: "BeginEndBlock",
          statements: [
            {
              type: "AssignmentStatement",
              identifier: "x",
              expression: {
                type: "Literal",
                value: "7",
              },
            },
            {
              type: "IfStatement",
              condition: {
                type: "BinaryExpression",
                operator: ">",
                left: {
                  type: "Identifier",
                  name: "x",
                },
                right: {
                  type: "Literal",
                  value: "10",
                },
              },
              thenStatement: {
                type: "BeginEndBlock",
                statements: [
                  {
                    type: "AssignmentStatement",
                    identifier: "x",
                    expression: {
                      type: "BinaryExpression",
                      operator: "+",
                      left: {
                        type: "Identifier",
                        name: "x",
                      },
                      right: {
                        type: "Literal",
                        value: "1",
                      },
                    },
                  },
                  {
                    type: "WriteStatement",
                    expression: {
                      type: "Identifier",
                      name: "x",
                    },
                  },
                ],
              },
              elseIfStatement: [
                {
                  condition: {
                    type: "BinaryExpression",
                    operator: "=",
                    left: {
                      type: "Identifier",
                      name: "x",
                    },
                    right: {
                      type: "Literal",
                      value: "5",
                    },
                  },
                  thenStatement: {
                    type: "WriteStatement",
                    expression: {
                      type: "Identifier",
                      name: "x",
                    },
                  },
                },
                {
                  condition: {
                    type: "BinaryExpression",
                    operator: "<",
                    left: {
                      type: "Identifier",
                      name: "x",
                    },
                    right: {
                      type: "Literal",
                      value: "10",
                    },
                  },
                  thenStatement: {
                    type: "BeginEndBlock",
                    statements: [
                      {
                        type: "AssignmentStatement",
                        identifier: "x",
                        expression: {
                          type: "BinaryExpression",
                          operator: "-",
                          left: {
                            type: "Identifier",
                            name: "x",
                          },
                          right: {
                            type: "Literal",
                            value: "1",
                          },
                        },
                      },
                      {
                        type: "WriteStatement",
                        expression: {
                          type: "Identifier",
                          name: "x",
                        },
                      },
                    ],
                  },
                },
              ],
              elseStatement: {
                type: "BeginEndBlock",
                statements: [
                  {
                    type: "AssignmentStatement",
                    identifier: "x",
                    expression: {
                      type: "BinaryExpression",
                      operator: "*",
                      left: {
                        type: "Identifier",
                        name: "x",
                      },
                      right: {
                        type: "Identifier",
                        name: "x",
                      },
                    },
                  },
                  {
                    type: "WriteStatement",
                    expression: {
                      type: "Identifier",
                      name: "x",
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

console.log(formatAST(ast));
