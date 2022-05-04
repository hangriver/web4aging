<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          阅读效率测试 -
          {{
            current == 1
              ? '今日头条默认'
              : current == 2
              ? '用户明亮模式'
              : '用户深色模式'
          }}
        </div>
        <div class="text-description">
          在点击开始按钮后，您将会读到一篇文章。您需要在文章中找到目标词语【{{
            targetWord
          }}】，点击您看到的目标词语，即可完成测试。
        </div>
        <q-separator />
        <div style="margin: 10px 0">
          <q-btn
            @click="startTest"
            :disable="isTestStarted"
            :flat="isTestStarted"
            :round="isTestStarted"
            :disable-ripple="isTestStarted"
            :label="isTestStarted ? '测试进行中' : '点击开始测试'"
            color="primary"
            class="full-width"
          >
          </q-btn>
        </div>
        <div>已用时间：{{ usedTime }}s</div>
      </q-card-section>
    </q-card>
    <div style="height: 20px" />
    <text-card
      :article="current"
      :config="current == 1 ? toutiaoConfig : config"
      :dark-mode="current == 3"
      v-if="isTestStarted"
    ></text-card>
    <div
      v-if="!isTestStarted"
      style="height: 200px; text-align: center; margin-top: 100px"
      class="justify-evenly items-center"
    >
      <q-knob
        v-model="countDown"
        :min="0"
        :max="3"
        :disable="true"
        show-value
        size="100px"
      ></q-knob>
    </div>

    <q-dialog v-model="showDialog1">
      <q-card>
        <q-card-section>
          <div class="text-h6">恭喜您！</div>
        </q-card-section>
        <q-card-section>
          <div class="text-description">
            您成功完成了第{{ current - 1 }}项测试，即将进入下一项测试。
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="确认" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDialog2" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">十分感谢！</div>
        </q-card-section>
        <q-card-section>
          <div class="text-description">
            您成功完成了全部的测试，{{httpPrompt}}
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="重试" @click="httpRequest" v-if="retryButton" />
          <q-btn label="关闭" @click="closeApp" color="green" :loading="loadingSymbol" v-else/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import Articles from '../components/articles';
import textCard from '../components/TextCard.vue';
import { useRouter } from 'vue-router';
import { Record, Config, Test } from 'src/components/models';

export default defineComponent({
  name: 'IntroductionPage',
  components: {
    textCard,
  },
  setup() {
    const current = ref(1);
    const targetWord = ref(Articles.article[1].keyword);
    const article = ref(Articles.article[1].content);
    watch(current, (val: number) => {
      targetWord.value = Articles.article[val].keyword;
      article.value = Articles.article[val].content;
    });

    const router = useRouter();

    const record: any = localStorage.getItem('record');
    let recordObj: Record = JSON.parse(record);
    let config: Ref<Config>;
    const toutiaoConfig = ref({
      contrastBright: 21,
      scaleBright: 0,
      contrastDark: 21,
      scaleDark: 0,
      fontSizeHeader: 24,
      fontSizeContent: 18,
      lineHeight: 30,
      fontFamily: '黑体',
      fontWeight: 300,
    });
    if (recordObj.config) {
      config = ref(recordObj.config);
    } else {
      config = ref({
        contrastBright: 2,
        scaleBright: 0.5,
        contrastDark: 2,
        scaleDark: 0.5,
        fontSizeHeader: 24,
        fontSizeContent: 18,
        lineHeight: 30,
        fontFamily: '黑体',
        fontWeight: 300,
      });
      router.push('/config');
    }
    const test: Ref<Test> = ref({
      original: 0,
      favoriteBright: 0,
      favoriteDark: 0,
    });

    let timer: any;

    const showDialog1 = ref(false);
    const showDialog2 = ref(false);
    const eventListener = (e: any) => {
      console.log(e, current, usedTime);
      console.log(timer);
      clearInterval(timer);
      countDown.value = 3;
      if (current.value == 1) {
        test.value.original = usedTime.value;
        current.value++;
        isTestStarted.value = false;
        showDialog1.value = true;
      } else if (current.value == 2) {
        test.value.favoriteBright = usedTime.value;
        current.value++;
        isTestStarted.value = false;
        showDialog1.value = true;
      } else if (current.value == 3) {
        test.value.favoriteDark = usedTime.value;
        showDialog2.value = true;
        recordObj.test = test.value;
        recordObj.timestamp = new Date().toJSON();
        localStorage.setItem('record', JSON.stringify(recordObj));
        httpRequest();
      }
      usedTime.value = 0;
    };
    window.addEventListener('found', eventListener);

    const isTestStarted = ref(false);
    const countDown = ref(3);
    const startTest = () => {
      const before = setInterval(() => {
        countDown.value--;
        if (countDown.value == 0) {
          isTestStarted.value = true;
          clearInterval(before);
          timer = setInterval(() => {
            usedTime.value++;
          }, 1000);
        }
      }, 1000);

      console.log('startTest');
    };
    const usedTime = ref(0);

    const httpPrompt = ref('系统正在保存结果，请稍候再关闭页面');
    const retryButton = ref(false);
    const successButton = ref(false);
    const loadingSymbol = ref(false);
    const httpRequest = () => {
      console.log('httpRequest');
      httpPrompt.value = '系统正在保存结果，请稍候再关闭页面。';
      loadingSymbol.value = true;
      retryButton.value = false;
      fetch(
        '/saveRecord',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recordObj),
        },
      ).then(res => res.json())
      .then(res => {
        if(res.status == 'success') {
          httpPrompt.value = '结果已保存，点击确认关闭页面。';
          successButton.value = true;
          loadingSymbol.value = false;
        }
      }).catch(err => {
        console.log(err);
        httpPrompt.value = '结果保存失败，请点击重试。';
        retryButton.value = true;
      });
    };

    const closeApp = () => {
      window.removeEventListener('found', eventListener);
      window.location.href = 'about:blank';
      window.close();
    };

    return {
      targetWord,
      article,
      config,
      toutiaoConfig,
      current,
      isTestStarted,
      startTest,
      usedTime,
      countDown,
      showDialog1,
      showDialog2,
      httpPrompt,
      httpRequest,
      retryButton,
      successButton,
      loadingSymbol,
      closeApp
    };
  },
})
</script>

<style scoped>
.text-description {
  font-size: 18px;
}
</style>
