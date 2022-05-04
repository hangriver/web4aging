/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <q-page padding>
    <q-carousel
      swipeable
      animated
      height="320px"
      v-model="slide"
      transition-next="slide-left"
      transition-prev="slide-right"
      transition-duration="500"
      ref="configMenus"
    >
      <!--浅色场景对比度设置-->
      <q-carousel-slide :name="1">
        <q-card style="height: 300px">
          <q-card-section>
            <div class="text-h6">文字对比度设置</div>
            <div class="text-h7">
              请滑动按钮将下方文字调整至您能够舒适阅读为止
            </div>
          </q-card-section>
          <q-card-section>
            <q-form>
              <q-field
                :label="`明亮模式对比度：${config.contrastBright}`"
                stack-label
              >
                <q-slider
                  v-model="config.scaleBright"
                  :max="0.73"
                  :inner-min="0"
                  :step="0.01"
                ></q-slider>
              </q-field>
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-btn-group>
              <q-btn @click="$refs.configMenus.previous()" :disable="slide == 1"
                >⬅️上一步</q-btn
              >
              <q-btn @click="$refs.configMenus.next()">下一步➡️</q-btn>
            </q-btn-group>
          </q-card-section>
        </q-card>
      </q-carousel-slide>

      <!--深色场景对比度设置-->
      <q-carousel-slide :name="2">
        <q-card style="height: 300px">
          <q-card-section>
            <div class="text-h6">文字对比度设置</div>
            <div class="text-h7">
              请滑动按钮将下方文字调整至您能够舒适阅读为止
            </div>
          </q-card-section>
          <q-card-section>
            <q-form>
              <q-field
                :label="`深色模式对比度：${config.contrastDark}`"
                stack-label
              >
                <q-slider
                  v-model="config.scaleDark"
                  :max="0.73"
                  :inner-min="0"
                  :step="0.01"
                ></q-slider>
              </q-field>
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-btn-group>
              <q-btn @click="$refs.configMenus.previous()" :disable="slide == 1"
                >⬅️上一步</q-btn
              >
              <q-btn @click="$refs.configMenus.next()">下一步➡️</q-btn>
            </q-btn-group>
          </q-card-section>
        </q-card>
      </q-carousel-slide>

      <!--字体大小设置-->
      <q-carousel-slide :name="3">
        <q-card style="height: 300px">
          <q-card-section>
            <div class="text-h6">文字大小设置</div>
            <div class="text-h7">请将下方文字调整至您能够舒适阅读的大小</div>
          </q-card-section>
          <q-card-section>
            <q-form>
              <q-field
                :label="`标题文字大小：${config.fontSizeHeader}px`"
                stack-label
              >
                <q-slider v-model="config.fontSizeHeader"></q-slider>
              </q-field>
              <q-field
                :label="`正文文字大小：${config.fontSizeContent}px`"
                stack-label
              >
                <q-slider v-model="config.fontSizeContent"></q-slider>
              </q-field>
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-btn-group>
              <q-btn @click="$refs.configMenus.previous()" :disable="slide == 1"
                >⬅️上一步</q-btn
              >
              <q-btn @click="$refs.configMenus.next()">下一步➡️</q-btn>
            </q-btn-group>
          </q-card-section>
        </q-card>
      </q-carousel-slide>

      <!--行高设置，段落为两倍行距-->
      <q-carousel-slide :name="4">
        <q-card style="height: 300px">
          <q-card-section>
            <div class="text-h6">行高设置</div>
            <div class="text-h7">请将下方文字调整至您能够舒适阅读的行高</div>
          </q-card-section>
          <q-card-section>
            <q-form>
              <q-field :label="`文字行高：${config.lineHeight}px`" stack-label>
                <q-slider
                  v-model="config.lineHeight"
                  :min="10"
                  :max="120"
                ></q-slider>
              </q-field>
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-btn-group>
              <q-btn @click="$refs.configMenus.previous()" :disable="slide == 1"
                >⬅️上一步</q-btn
              >
              <q-btn @click="$refs.configMenus.next()">下一步➡️</q-btn>
            </q-btn-group>
          </q-card-section>
        </q-card>
      </q-carousel-slide>

      <!--字体设置-->
      <q-carousel-slide :name="5">
        <q-card style="height: 300px">
          <q-card-section>
            <div class="text-h6">字体设置</div>
            <div class="text-h7">请选择您喜欢的字体</div>
          </q-card-section>
          <q-card-section>
            <q-form>
              <q-option-group
                v-model="config.fontFamily"
                :options="fontList"
              ></q-option-group>
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-btn-group style="margin-top: -20px">
              <q-btn @click="$refs.configMenus.previous()" :disable="slide == 1"
                >⬅️上一步</q-btn
              >
              <q-btn @click="$refs.configMenus.next()">下一步➡️</q-btn>
            </q-btn-group>
          </q-card-section>
        </q-card>
      </q-carousel-slide>

      <!--字体粗细设置-->
      <q-carousel-slide :name="6">
        <q-card style="height: 300px">
          <q-card-section>
            <div class="text-h6">粗细设置</div>
            <div class="text-h7">请选择是否使用加粗的文字</div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              v-model="config.fontWeight"
              :options="[
                { label: '普通字体', value: 300 },
                { label: '加粗字体', value: 700 },
              ]"
              type="radio"
            />
          </q-card-section>
          <q-card-section>
            <q-btn-group>
              <q-btn @click="$refs.configMenus.previous()" :disable="slide == 1"
                >⬅️上一步</q-btn
              >
              <q-btn @click="$refs.configMenus.next()" v-if="slide != 6"
                >下一步➡️</q-btn
              >
              <q-btn @click="submit()" v-if="slide == 6">提交✅</q-btn>
            </q-btn-group>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>
    <div style="height: 20px"></div>
    <text-card :config="config" :dark-mode="slide == 2"></text-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import textCard from '../components/TextCard.vue';
import { Record, Config } from 'src/components/models';
import { CRcalc } from 'src/components/calc';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ConfigurationPage',
  components: {
    textCard,
  },
  setup() {
    const router = useRouter();
    let slide = ref(1);
    const record: any = localStorage.getItem('record');
    let recordObj: Record = JSON.parse(record);
    let config: Ref<Config>;
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
    }

    watch(
      [() => config.value.scaleBright, () => config.value.scaleDark],
      () => {
        //console.log(config.value.scaleBright);
        config.value.contrastBright = CRcalc(config.value.scaleBright);
        config.value.contrastDark = CRcalc(config.value.scaleDark);
      }
    );

    const fontList = ref([
      {
        label: '黑体',
        value: '黑体',
      },
      {
        label: '宋体',
        value: '宋体',
      },
      {
        label: '行楷',
        value: '行楷',
      },
    ]);

    const submit = () => {
      recordObj.config = config.value;
      localStorage.setItem('record', JSON.stringify(recordObj));
      router.push('/test');
    };

    return { slide, config, fontList, submit };
  },
});
</script>
