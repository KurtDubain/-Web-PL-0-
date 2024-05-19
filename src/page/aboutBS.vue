<!-- 关于页面 -->
<template>
  <div class="flex flex-wrap justify-between">
    <!-- 卡片1 -->
    <div class="w-1/2 p-4 hover:shadow-lg transition-shadow">
      <el-card class="box-card">
        <!-- <div slot="header" class="clearfix">
          <span>卡片1</span>
        </div> -->
        <template #header>
          <div class="clearfix"><strong>项目介绍</strong></div>
        </template>
        <div class="text-gray-500 h-[30vh] overflow-auto">
          <strong>项目简介</strong><br>
          本项目是一个面向Web的PL/0语言集成开发环境，旨在提供便捷的PL/0调试开发工具。我们诚邀社区成员在issue中提出宝贵意见并参与项目改进。具体联系方式，可以点击“更多”来查看。<br><br>

          <strong>主要功能</strong><br>
          - <em>代码编写：</em>直观的代码编辑器支持PL/0代码编写。<br>
          - <em>编译与执行：</em>一键编译执行，查看代码执行结果和状态。<br>
          - <em>调试工具：</em>集成调试工具，简化错误诊断和问题解决过程。<br>
          - <em>UI控制：</em>通过导航栏轻松访问各种工具和功能。<br>
          - <em>文件管理：</em>侧边栏支持文件的增删查改及导入导出管理。<br><br>
        </div>

      </el-card>
    </div>
    <!-- 卡片2 -->
    <div class="w-1/2 p-4 hover:shadow-lg transition-shadow">
      <el-card class="box-card">
        <template #header>
          <div class="clearfix"><strong>注意事项</strong></div>
        </template>
        <div class="text-gray-500 h-[30vh] overflow-auto">
          <!-- <strong>项目简介</strong><br> -->
          <!-- 本项目是一个面向Web的PL/0语言集成开发环境，旨在提供便捷的PL/0调试开发工具。我们诚邀社区成员在issue中提出宝贵意见并参与项目改进。<br><br> -->

          <strong>使用上的注意</strong><br>
          - <em>文件管理：</em>支持pl0后缀的文件的读取（本质上可以设置多种后缀），暂不支持重命名。<br>
          - <em>编译器输出：</em>对于一些特殊样式的输出产物，可能有显示不全的问题，可以关闭调试器来完整查看。<br>
          - <em>调试器调试：</em>对于一些断点无法做到反映射（例如begin、end等字段），但是总体不影响调试功能；同时对于需要调试的代码，开头行请不要造成空行或者纯注释，会造成调试结果为空<br>
          - <em>模式选择：</em>WASM模式存在诸多限制，对于有调试需求、自定义输入需求，推荐使用JS模式。<br>
          - <em>终端查看：</em>终端的“清除”功能只会清除历史执行记录，仍会保留当前代码框内的执行结果。<br><br>
          <strong>其他使用指引</strong>
          <br>
          - <em>对于一些语法规则，可以参考“帮助”下提供的几个简单示例，<router-link to="/help">点击跳转</router-link></em><br>
          - <em>如果点击“编译”或者“调试”，没有合理的输出结果，请检查代码是否有编写问题，系统可能在某些情况下无法检测到</em><br>
          - <em>由于PL0语法限制，整个代码只有一个作用域“Global”，没有局部作用域，请注意书写</em>
        </div>
      </el-card>
    </div>
    <!-- 卡片3 -->
    <div @click="showDialog(3)" class="w-full p-4 hover:shadow-lg transition-opacity cursor-pointer">
      <el-card class="box-card">
        <template #header>
          <div class="clearfix"><strong>PL/0 语法规则</strong></div>
        </template>
        <div class="text-gray-500 h-[40vh] overflow-auto p-4">
          <strong>声明：本编译器是由作者独立开发，所以一些语法规则可能和学术上的PL/0不完全相同，但是整体设计思路相差不大。</strong><br><br>
          <p><strong>程序的基本结构：</strong>一个 PL/0 程序包含一个主程序块，以句点结束。</p>
          <p><strong>程序块（BLOCK）的组成：</strong>程序块可以包含常量声明、变量声明、过程声明以及一条语句，通常由begin和end进行包裹。</p>
          <ul>
            <li><strong>常量声明：</strong>以 'const' 开头，后跟一个或多个常量定义，每个定义由标识符和数字组成，用等号（:=）连接，在顶部声明。</li>
            <li><strong>变量声明：</strong>以 'var' 开头，后跟一个或多个标识符，用逗号分隔，在顶部声明。</li>
            <li><strong>过程（函数）声明：</strong>以 'procedure' 开头，后跟一个标识符和一个程序块，用分号分隔。</li>
            <li><strong>语句：</strong>可以是赋值、调用、复合语句、条件语句或循环语句。跳转到“帮助”页面，查看语句的具体使用样例</li>
          </ul>
          <p><strong>表达式和运算：</strong>表达式由项和操作符组成，可以包含加法、减法、乘法和除法。（支持多符号运算，但是不支持括号控制优先级，默认优先乘除法）</p>
          <ul>
            <li><strong>项：</strong>由因子组成，因子之间可以是乘法或除法。</li>
            <li><strong>因子：</strong>可以是标识符、数字或括号中的表达式。</li>
          </ul>
          <p>通过以上结构，PL/0 提供了编程的基本功能，支持简单的算术和逻辑操作。点击卡片查看编译的文法规则。</p>
        </div>
      </el-card>
    </div>

  </div>

  <!-- 详细信息对话框 -->
  <el-dialog v-model="dialogVisible" :title="`文法规则详细信息`">
    <div class="grammar-content">
      <h3>PL/0 语法规则</h3>
      <p><strong>程序的基本结构：</strong>一个 PL/0 程序包含一个主程序块<code>Program</code>，以句点结束。</p>
      <h4>程序块(Program)</h4>
      <ul>
        <li><code>Program</code>-> Block "."</li>
        <li><code>Block</code>-> [ Declaration ] { Statement }</li>
      </ul>
      <h4>声明(Declaration)：</h4>
      <ul>
        <li><code>Declaration</code>-> { Declaration_const | Declaration_var | Declaration_procedure }</li>
        <li><code>Declaration_const</code>-> "const" Identifier ":=" Number { "," Identifier "=" Number } ";"</li>
        <li><code>Declaration_var</code>-> "var" Identifier [ ":=" Number ] { "," Identifier ["=" Number ]} ";"</li>
        <li><code>Declaration_procedure</code>-> "procedure" Identifier ";" { Block } ";"</li>
      </ul>
      <h4>语句(Statement)：</h4>
      <ul>
        <li><code>Statement</code>-> { Assignment | ProcedureCall | ifStatement | forStatement | whileStatement |
          readStatement | writeStatement | beginEndStatement }</li>
        <li><code>Assignment</code>-> Identifier ":=" Expression ";"</li>
        <li><code>ProcedureCall</code>-> "call" Identifier ";"</li>
        <li><code>ifStatement</code>-> "if" Expression "then" Statement { elseIfStatement } [ "else" Statement ] "endif"
          ";"</li>
        <li><code>elseIfStatement</code>-> "else" "if" Expression "then" Statement</li>
        <li><code>whileStatement</code>-> "while" Expression "do" Statement "endwhile" ";"</li>
        <li><code>beginEndStatement</code>-> "begin" { Statement } "end"</li>
        <li><code>forStatement</code>-> "for" Identifier ":=" Expression "to" Expression "do" Statement "endfor" ";"
        </li>
        <li><code>readStatement</code>-> "read" Identifier ";"</li>
        <li><code>writeStatement</code>-> "write" Expression ";"</li>
      </ul>
      <h4>表达式(Expression)：</h4>
      <p>表达式由项和操作符组成，可以包含加法、减法、乘法和除法。</p>
      <ul>
        <li><code>Expression</code>-> { Expression1 | Expression2 }</li>
        <li><code>Expression1</code>(算术表达式) -> Term { ( "+" | "-" ) Term }</li>
        <li><code>Expression2</code>(关系表达式) -> Expression ( "＜" | "＜=" | "=" | "＜＞" | "＞" | "＞=")</li>
        <li><code>Term</code>(项) -> Factor { ("*" | "/") Factor }</li>
        <li><code>Factor</code>(因子) -> Identifier | Number | "(" Expression ")"</li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
import { ElCard, ElDialog } from "element-plus";

export default {
  name: "AboutPage",
  components: {
    ElCard,
    ElDialog,
  },
  setup() {
    const dialogVisible = ref(false);
    const activeCard = ref(0);

    const showDialog = (cardNumber) => {
      activeCard.value = cardNumber;
      dialogVisible.value = true;
    };

    return {
      dialogVisible,
      activeCard,
      showDialog,
    };
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
  /* height: 50%; */
  transition: box-shadow 0.3s ease-in-out;
}

.box-card :hover {
  box-shadow: 0 10px 15px rgba(206, 206, 206, 0.3);
}

.box-card ul {
  padding-left: 20px;
  /* 增加左内边距以显示项目符号 */
  list-style-type: disc;
  /* 使用圆点作为项目符号 */
}

.box-card li {
  margin-bottom: 8px;
  /* 每个列表项底部留白 */
  line-height: 1.5;
  /* 增加行高提高可读性 */
  color: #636363;
  /* 设置字体颜色，确保与卡片风格一致 */
}

.box-card p,
.box-card ul,
.box-card li {
  color: #808080;
  /* 统一文字颜色 */
  font-size: 0.95em;
  /* 统一字体大小 */
}

.grammar-content h3,
.grammar-content h4 {
  color: #d1d1d1;
  font-weight: bold;
}

.grammar-content ul {
  list-style-type: none;
  padding-left: 0;
}

.grammar-content li {
  margin-bottom: 10px;
  background-color: #3a3a3a;
  border-left: 3px solid #3498db;
  padding: 10px;
}

.grammar-content code {
  background-color: #6d6d6d;
  padding: 2px 6px;
}
</style>
