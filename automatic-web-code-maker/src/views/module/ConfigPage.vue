<template>
  <a-drawer
      title="配置属性"
      placement="right"
      :visible="configPageApplication.display"
      :mask="false"
      width="300px"
  >

    <div>
      <h3>名称:</h3>
      <div>
        <div>
          <a-input v-model="configPageApplication.pageConfig.name" placeholder="请输入赋值元素的名称(如需要给当前元素赋值)"></a-input>
        </div>
      </div>
    </div>
    <hr style="margin-top: 20px; margin-bottom: 20px"/>

    <div style="width: 100%">
      <h3>事件:</h3>
      <div v-if="configPageApplication.pageConfig.event.length === 0">
        <a-button @click="addEvent">添加事件</a-button>
      </div>
      <div v-else v-for="(tmp, key) in configPageApplication.pageConfig.event" style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px">
        <div style="width: 208px">
          <a-select v-model="tmp.eventType" placeholder="请选择事件类型" :getPopupContainer="triggerNode => triggerNode.parentNode" style="width: 100%; margin-bottom: 10px">
            <a-select-option value="">请选择事件类型</a-select-option>
            <a-select-option value="1">click</a-select-option>
            <a-select-option value="2">click</a-select-option>
            <a-select-option value="3">click</a-select-option>
          </a-select>
          <a-select v-model="tmp.eventModifier" placeholder="请选择事件修饰符" :getPopupContainer="triggerNode => triggerNode.parentNode" style="width: 100%; margin-bottom: 10px">
            <a-select-option value="">请选择事件修饰符</a-select-option>
            <a-select-option value=".stop">stop</a-select-option>
            <a-select-option value=".prevent">prevent</a-select-option>
            <a-select-option value=".capture">capture</a-select-option>
            <a-select-option value=".self">self</a-select-option>
            <a-select-option value=".once">once</a-select-option>
            <a-select-option value=".passive">passive</a-select-option>
          </a-select>
          <a-input v-model="tmp.eventName" placeholder="请输入事件名"></a-input>
        </div>
        <a-button v-if="key === configPageApplication.pageConfig.event.length - 1" @click="addEvent" type="primary" shape="circle" icon="plus" />
        <a-button v-else @click="delEvent(key)" type="primary" shape="circle" icon="minus" />
      </div>
    </div>
    <hr style="margin-top: 20px; margin-bottom: 20px"/>
    <div>
      <h3>属性:</h3>
      <div v-if="configPageApplication.pageConfig.att.length === 0">
        <a-button @click="addAtt">添加属性</a-button>
      </div>
      <div v-else v-for="(tmp, key) in configPageApplication.pageConfig.att" style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px">
        <div style="width: 208px">
          <a-select v-model="tmp.attType" placeholder="请选择属性类型" :getPopupContainer="triggerNode => triggerNode.parentNode" style="width: 100%; margin-bottom: 10px">
            <a-select-option value="">正常</a-select-option>
            <a-select-option value=":">:</a-select-option>
          </a-select>
          <a-input v-model="tmp.attName" style="margin-bottom: 10px" placeholder="请输入属性名"></a-input>
          <a-input v-model="tmp.attVal" placeholder="请输入属性值"></a-input>
        </div>
        <a-button v-if="configPageApplication.pageConfig.att.length - 1 === key" @click="addAtt" type="primary" shape="circle" icon="plus" />
        <a-button v-else @click="delAtt(key)" type="primary" shape="circle" icon="minus" />
      </div>
    </div>
    <hr style="margin-top: 20px; margin-bottom: 20px"/>
    <div>
      <h3>接口:</h3>
      <div style="display: flex; align-items: center; justify-content: space-between">
        <div>
          <a-input v-model="configPageApplication.pageConfig.requestConfig.requestPath" style="margin-bottom: 10px" placeholder="请输入接口地址"></a-input>
          <a-input v-model="configPageApplication.pageConfig.requestConfig.codeName" style="margin-bottom: 10px" placeholder="请输入状态码字段名"></a-input>
          <a-input v-model="configPageApplication.pageConfig.requestConfig.renderName" style="margin-bottom: 10px" placeholder="请输入回填字段名(如没有接口地址默认从全局接口取值)"></a-input>
          <div>
            <a-select v-model="configPageApplication.pageConfig.requestConfig.callEvent" placeholder="请选择调用条件" :getPopupContainer="triggerNode => triggerNode.parentNode" style="width: 100%; margin-bottom: 10px">
              <a-select-option value="">请选择调用条件</a-select-option>
              <a-select-option value="mounted">页面加载</a-select-option>
              <a-select-option value="@click">click</a-select-option>
            </a-select>
            <a-select v-model="configPageApplication.pageConfig.requestConfig.renderElementName" placeholder="请选择赋值元素" :getPopupContainer="triggerNode => triggerNode.parentNode" style="width: 100%; margin-bottom: 10px">
              <a-select-option value="">请选择赋值元素</a-select-option>
              <a-select-option value="1">click</a-select-option>
              <a-select-option value="2">click</a-select-option>
              <a-select-option value="3">click</a-select-option>
            </a-select>
          </div>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component"
import {ConfigPageApplication} from "@/application/makePage/module/configPage";

@Component({
  name: "ConfigPage"
})
export default class ConfigPage extends Vue {
  public configPageApplication: ConfigPageApplication = new ConfigPageApplication(this);

  addEvent() {
    this.configPageApplication.addEvent();
  }

  delEvent(key: number) {
    this.configPageApplication.delEvent(key);
  }

  addAtt() {
    this.configPageApplication.addAtt()
  }

  delAtt(key: number) {
    this.configPageApplication.delAtt(key)
  }

}

</script>

<style scoped>

</style>
