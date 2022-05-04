<template>
  <q-card :style="styles.background">
    <q-card-section>
      <p :style="styles.header" v-html="titleText"></p>
      <p :style="styles.content" v-html="contentText"></p>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Config } from 'src/components/models';
import Articles from '../components/articles';

export default defineComponent({
  name: 'TextCard',
  props: {
    config: {
      type: Object,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    article: {
      type: Number,
      default: 0,
    },
  },
  setup(props: any) {
    const conf = ref(props.config);

    const colorText = (dark: boolean) => {
      if (dark) {
        return 255 - 174 * conf.value.scaleDark;
      } else {
        return 174 * conf.value.scaleBright;
      }
    };
    const colorBackground = (dark: boolean) => {
      if (dark) {
        return 174 * conf.value.scaleDark;
      } else {
        return 255 - 174 * conf.value.scaleBright;
      }
    };

    const styleMaker = (config: Config) => {
      const text = colorText(props.darkMode);
      const bg = colorBackground(props.darkMode);

      return {
        header: {
          fontFamily: config.fontFamily,
          color: `rgb(${text}, ${text}, ${text})`,
          marginBottom: `${config.lineHeight}px`,
          fontSize: `${config.fontSizeHeader}px`,
          fontWeight: config.fontWeight,
        },
        content: {
          fontFamily: config.fontFamily,
          color: `rgb(${text}, ${text}, ${text})`,
          fontSize: `${config.fontSizeContent}px`,
          lineHeight: `${config.lineHeight}px`,
          fontWeight: config.fontWeight,
        },
        background: {
          margin: '0px 16px',
          backgroundColor: `rgb(${bg}, ${bg}, ${bg})`,
        },
      };
    };
    let styles = ref(styleMaker(conf.value));

    watch(
      () => props.config,
      (newConfig: Config) => {
        //console.log(newConfig);
        styles.value = styleMaker(newConfig);
      },
      { immediate: true, deep: true }
    );

    watch(
      () => props.darkMode,
      () => {
        styles.value = styleMaker(conf.value);
      },
      { immediate: true, deep: true }
    );

    const contentText = ref(Articles.article[props.article].content);
    const titleText = ref(Articles.article[props.article].title);

    return { styles, conf, contentText, titleText };
  },
});
</script>

<style>
@charset "UTF-8";
@font-face {
  font-family: '黑体';
  src: url(../assets/方正兰亭黑.TTF);
}
@font-face {
  font-family: '宋体';
  src: url(../assets/方正小标宋.TTF);
}
@font-face {
  font-family: '行楷';
  src: url(../assets/方正行楷简.TTF);
}
</style>
