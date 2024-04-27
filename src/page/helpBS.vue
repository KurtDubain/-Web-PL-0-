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
                <div class="text-gray-500 h-[30vh] overflow-auto">
                    <p>在使用示例代码时，请注意以下事项：</p>
                    <ul>
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
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
    color: #636363;
    font-size: 0.95em;
}
</style>