<template>
  <q-page class="row items-center justify-evenly">
    <div id="intro">
      <h1>您好，</h1>
      <p>欢迎参与适老化阅读实验人机界面实验！</p>
      <div style="width: 100%; text-align: center; height: 60px">
        <q-btn style="text-align: center" @click="go()">开始实验</q-btn>
      </div>
      <p>您可以点击“开始实验”按钮，跟随向导立即进入测试，十分感谢您的参与。</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Record } from '../components/models';

export default defineComponent({
  name: 'IntroductionPage',
  setup() {
    const router = useRouter();
    const record = localStorage.getItem('record');

    const go = () => {
      if (record) {
        const recordObj: Record = JSON.parse(record);
        if (recordObj.currentProgress === 'survey') {
          router.push('/survey');
        } else if (recordObj.currentProgress === 'test') {
          router.push('/test');
        } else if (recordObj.currentProgress === 'config') {
          router.push('/config');
        } else {
          router.push('/survey');
        }
      } else {
        const newRecord: Record = {
          timestamp: new Date().toJSON(),
          currentProgress: 'survey',
          survey: undefined,
          test: undefined,
          config: undefined,
        };
        localStorage.setItem('record', JSON.stringify(newRecord));
        router.push('/survey');
      }
    };

    return { go };
  },
});
</script>

<style>
#intro {
  margin: 0 auto;
  width: 80%;
}
#intro h1 {
  font-size: 30px;
  line-height: 40px;
}
#intro p {
  font-size: 20px;
}
</style>
