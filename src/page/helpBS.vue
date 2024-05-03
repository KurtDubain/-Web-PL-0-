<!-- 帮助页面 -->
<template>
    <div class="flex flex-wrap justify-between">
        <!-- 卡片1 -->
        <div class="w-1/3 p-4 hover:shadow-lg transition-shadow">
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix"><strong>for循环用法示例
                        </strong></div>
                </template>
                <div class="text-gray-500 h-[30vh] overflow-auto">
                    <pre><code>
            {{ codeFor }}</code></pre>
                </div>
                <div class="flex justify-center p-4">
                    <el-button type="primary" size="small" @click="copyCode(1)">复制代码</el-button>
                </div>
            </el-card>
        </div>

        <!-- 卡片2 -->
        <div class="w-1/3 p-4 hover:shadow-lg transition-shadow">
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix"><strong>if-elseif-else用法示例</strong></div>
                </template>
                <div class="text-gray-500 h-[30vh] overflow-auto">
                    <pre><code>
                    {{ codeIf }}</code></pre>
                </div>
                <div class="flex justify-center p-4">
                    <el-button type="primary" size="small" @click="copyCode(2)">复制代码</el-button>
                </div>
            </el-card>
        </div>

        <!-- 卡片3 -->
        <div class="w-1/3 p-4 hover:shadow-lg transition-shadow">
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix"><strong>while循环示例</strong></div>
                </template>
                <div class="text-gray-500 h-[30vh] overflow-auto">
                    <pre><code>
                    {{ codeWhile }}</code>
            </pre>
                </div>
                <div class="flex justify-center p-4">
                    <el-button type="primary" size="small" @click="copyCode(3)">复制代码</el-button>
                </div>
            </el-card>
        </div>

        <!-- 卡片4 -->
        <div class="w-1/3 p-4 hover:shadow-lg transition-shadow">
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix"><strong>procedure使用示例</strong></div>
                </template>
                <div class="text-gray-500 h-[30vh] overflow-auto">
                    <!-- 代码示例 4 -->
                    <pre><code>
                    {{ codePro }}</code></pre>
                </div>
                <div class="flex justify-center p-4">
                    <el-button type="primary" size="small" @click="copyCode(4)">复制代码</el-button>
                </div>
            </el-card>
        </div>

        <!-- 卡片5 -->
        <div class="w-2/3 p-4 hover:shadow-lg transition-shadow">
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix"><strong>注意事项</strong></div>
                </template>
                <div class="text-gray-100 h-[30vh] overflow-auto">
                    <p>在使用编辑器书写代码时，请注意以下事项：</p><br>
                    <ul>
                        <li>常规的示例已经给出，请结合对应的语法规则和示例代码的规范进行书写，否则可能会编译异常，导致无法运行。</li>
                        <li>对于变量的声明，尽量写在块语句的开头，推荐书写在最顶部，因为目前只支持全局变量，不会因为书写位置的变化而改变变量的性质。</li>
                        <li>暂不支持括号对运算表达式的优先级的改变，对于复杂的四则计算，建议进行拆分再合并。</li>
                        <li>WASM模式下无法做到等待用户输入，在执行的时候会自动赋值为2；WASM模式下的调试功能尚不完善，不推荐使用，调试模式建议使用JS模式。</li>
                        <li>procedure暂不支持提供参数，只支持对全局变量进行操作；调用procedure的时候可以使用"call"关键字，也可以直接书写</li>
                        <li>本语法不区分大小写，write只支持输出变量值（或者算术表达式的值），不支持文字等；本语法的所有equal符都为“:=”而不是“=”</li>
                        <li>如果仍有其他问题，请点击右上角的更多，联系博主或者加入开源社区提供issue。</li>
                    </ul>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { ElCard, ElButton } from "element-plus";

export default {
    name: "helpBS",
    components: {
        ElCard,
        ElButton,
    },
    setup() {
        const codeFor = ref("//for循环示例代码\nvar i, sum; \nbegin \n    sum := 0; \n    for i := 1 to 5 do \n        begin \n            sum := sum + i; \n            write sum; \n        end; \n    endfor; \nend.")
        const codeIf = ref("//if-elseif-else示例代码\nvar x; \nbegin \n    x := 7; \n    if x > 10 then \n        begin \n        x := x+1; \n        write x; \n        end; \n    else if x = 5 then \n        write x; \n    else \n        begin \n        x := x*x; \n        write x; \n        end; \n    endif; \nend.")
        const codeWhile = ref("//while循环示例代码\nvar i, sum; \nbegin \n    i := 1; \n    sum := 0; \n    while i < 5 do \n        begin \n            sum := sum + i; \n            write sum; \n            i := i + 1; \n        end; \n   endwhile;\nend.")
        const codePro = ref("//procedure用法示例代码\nvar x, y; \n procedure multiply; \nbegin \n    x := x * y; \nend; \nbegin \n    x := 5; \n    y := 2; \n    call multiply; \n    write x; \nend.")

        const copyCode = (cardNumber) => {
            let code
            if (cardNumber == 1) {
                code = codeFor.value
            } else if (cardNumber == 2) {
                code = codeIf.value
            } else if (cardNumber == 3) {
                code = codeWhile.value
            } else if (cardNumber == 4) {
                code = codePro.value
            } else {
                alert("复制失败");
            }
            navigator.clipboard.writeText(code)
                .then(() => {
                    alert("代码已成功复制！");
                })
                .catch((error) => {
                    console.error("复制代码时出错：", error);
                });
        };

        return {
            copyCode,
            codeFor,
            codeIf,
            codeWhile,
            codePro
        }
    },
};
</script>

<style scoped>
.box-card {
    width: 100%;
}

.box-card :hover {
    box-shadow: 0 10px 15px rgba(153, 153, 153, 0.3);
}

.box-card ul {
    padding-left: 20px;
    list-style-type: disc;
}

.box-card li {
    margin-bottom: 8px;
    line-height: 1.5;
    color: #636363;
}

.box-card p,
.box-card ul,
.box-card li {
    color: #9b9b9b;
    font-size: 0.95em;
}
</style>