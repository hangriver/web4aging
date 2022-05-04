/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <q-page padding>
    <div style="width: 100%; font-size: 25px">请根据提示回答以下问题：</div>
    <q-form>
      <p class="section-title">基本信息</p>
      <q-input
        type="number"
        v-model="survey.age"
        label="您的年龄"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || '请输入您的年龄',
          (val) => (val > 0 && val < 110) || '请输入有效年龄',
        ]"
      />
      <q-field
        label="您的性别"
        stack-label
        :rules="[(val) => (val !== null && val !== '') || '请选择您的性别']"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            <q-radio v-model="survey.sex" :val="1" label="男" />
            <q-radio v-model="survey.sex" :val="0" label="女" />
          </div>
        </template>
      </q-field>
      <div class="blank-space"></div>
      <q-select
        v-model="survey.education"
        :options="educationOptions"
        label="您的受教育水平"
      />
      <div class="blank-space"></div>
      <q-select
        v-model="survey.job"
        :options="jobOptions"
        label="您现在或之前从事的行业"
      />
      <p class="section-title">健康信息</p>
      <q-field label="您的视力状况" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            <q-radio
              v-model="survey.eyesight"
              :val="'完全正常'"
              label="完全正常"
            />
            <q-radio v-model="survey.eyesight" :val="'近视'" label="近视" />
            <q-radio v-model="survey.eyesight" :val="'老花眼'" label="老花眼" />
            <q-radio
              v-model="survey.eyesight"
              :val="'其他疾病'"
              label="其他疾病"
            />
          </div>
        </template>
      </q-field>
      <div class="blank-space"></div>
      <q-field label="您当前有采取视力矫正措施吗？" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            <q-radio v-model="survey.assistant" :val="'无'" label="无" />
            <q-radio
              v-model="survey.assistant"
              :val="'佩戴眼镜'"
              label="佩戴眼镜"
            />
            <q-radio
              v-model="survey.assistant"
              :val="'进行过手术'"
              label="进行过手术"
            />
          </div>
        </template>
      </q-field>

      <p class="section-title">主观偏好</p>
      <q-field
        label="您认为文字清晰度的重要程度是："
        hint="分数越高则代表您认为越重要"
        outlined
        stack-label
      >
        <template v-slot:control>
          <q-slider
            marker-labels
            markers
            :min="1"
            :max="5"
            v-model="survey.sharpness"
          />
        </template>
      </q-field>
      <div class="blank-space"></div>
      <q-field
        label="您认为文字美观性的重要程度是："
        hint="分数越高则代表您认为越重要"
        outlined
        stack-label
      >
        <template v-slot:control>
          <q-slider
            marker-labels
            markers
            :min="1"
            :max="5"
            v-model="survey.aesthetic"
          />
        </template>
      </q-field>
      <div class="blank-space"></div>
      <q-field
        label="您认为使用大字体的重要程度是："
        hint="分数越高则代表您认为越重要"
        outlined
        stack-label
      >
        <template v-slot:control>
          <q-slider
            marker-labels
            markers
            :min="1"
            :max="5"
            v-model="survey.bigFont"
          />
        </template>
      </q-field>
      <div class="blank-space"></div>
      <q-field
        label="您认为文字与报纸等相似的重要程度是："
        hint="分数越高则代表您认为越重要"
        outlined
        stack-label
      >
        <template v-slot:control>
          <q-slider
            marker-labels
            markers
            :min="1"
            :max="5"
            v-model="survey.familiarity"
          />
        </template>
      </q-field>
      <div class="blank-space"></div>
      <q-field
        label="您认为阅读的高效性的重要程度是："
        hint="分数越高则代表您认为越重要"
        outlined
        stack-label
      >
        <template v-slot:control>
          <q-slider
            marker-labels
            markers
            :min="1"
            :max="5"
            v-model="survey.efficiency"
          />
        </template>
      </q-field>

      <div class="blank-space"></div>
      <q-btn
        label="下一步"
        class="full-width"
        color="primary"
        @click="submitSurvey()"
      ></q-btn>

      <p class="section-title">设备信息</p>
      <q-field label="您的手机信息" stack-label>
        <template v-slot:control>
          您的手机型号是：{{ survey.phoneModel }}，分辨率为：{{
            survey.screenResolutionX
          }}
          * {{ survey.screenResolutionY }}
        </template>
      </q-field>
    </q-form>
    <q-dialog v-model="notFullFilled">
      <q-card>
        <q-card-section>
          <div class="text-h6">请将信息填写完整</div>
        </q-card-section>
        <q-card-section>
          <div class="text-description">
            您还有一些信息没有填写，请将信息填写完整再提交！
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="确认" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { Record, Survey } from 'src/components/models';
import { defineComponent, onMounted, ref } from 'vue';
import MobileDetect from 'mobile-detect';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const record: any = localStorage.getItem('record');
    let recordObj: Record = JSON.parse(record);
    let surveyObj: Survey;
    if(recordObj.survey){
      surveyObj = recordObj.survey;
    }else{
      surveyObj = {
        sex: null,
        age: null,
        education: null,
        job: null,
        eyesight: null,
        assistant: null,
        phoneModel: null,
        screenResolutionX: null,
        screenResolutionY: null,
        sharpness: null,
        aesthetic: null,
        familiarity: null,
        efficiency: null,
        bigFont: null,
      };
    }
    const survey = ref(surveyObj);

    const ua = navigator.userAgent;
    const md = new MobileDetect(ua);
    surveyObj.phoneModel = md.os();
    surveyObj.screenResolutionX = window.screen.width;
    surveyObj.screenResolutionY = window.screen.height;

    onMounted(() => {
      if (recordObj.survey) {
      } else {
      }
    });

    const educationOptions = [
      '未受过教育',
      '小学',
      '初中',
      '高中',
      '本科',
      '硕士及以上',
    ];
    const jobOptions = [
      '1.农、林、牧、渔业',

      '2.采矿业',

      '3.制造业',

      '4.电力、热力、燃气及水生产和供应业',

      '5.建筑业',

      '6.批发和零售业',

      '7.交通运输、仓储和邮政业',

      '8.住宿和餐饮业',

      '9.信息传输、软件和信息技术服务业',

      '10.金融业',

      '11.房地产业',

      '12.租赁和商务服务业',

      '13.科学研究和技术服务业',

      '14.水利、环境和公共设施管理业',

      '15.居民服务、修理和其他服务业',

      '16.教育',

      '17.卫生和社会工作',

      '18.文化、体育和娱乐业',

      '19.公共管理、社会保障和社会组织',

      '20.国际组织',
    ];

    const notFullFilled = ref(false);

    const submitSurvey = () => {
      if(checkSurvey()){
        recordObj.survey = surveyObj;
        localStorage.setItem('record', JSON.stringify(recordObj));
        router.push('/config');
      }else{
        notFullFilled.value = true;
      }
    };

    const checkSurvey = () => {
      Object.keys(surveyObj).forEach((key) => {
        if (surveyObj[key] === null) {
          if(key != 'phoneModel'){
            return false;
          }
        }
      });
      return true;
    }

    return {
      survey,
      educationOptions,
      jobOptions,
      submitSurvey,
      notFullFilled,
    };
  },
});
</script>

<style>
.section-title {
  font-size: 30px;
  margin-top: 40px;
  line-height: 40px;
}

.blank-space {
  height: 20px;
}
</style>
