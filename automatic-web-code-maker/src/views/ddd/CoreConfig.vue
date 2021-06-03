<template>
  <div>
    <div>
      <div v-for="(instanceTmp, instanceKey) in coreObj.instance">
        <h3>实例</h3>
      <div v-for="(interfaceTmp, interfaceKey) in instanceTmp.interface" style="margin-left: 20px">
        <h4>接口</h4>
        <div>
          <div style="display: flex; align-items: center">
            <span>接口名称:</span>
            <a-input v-model="interfaceTmp.interfaceName" style="width: 300px" />
          </div>
          <div v-for="(interfaceMemberTmp, interfaceMemberKey) in interfaceTmp.interfaceMember" style="margin-left: 20px">
            <div style="display: flex; align-items: center">
              <span>方法名:</span>
              <a-input v-model="interfaceMemberTmp.methodName" style="width: 300px" />
            </div>
            <div style="display: flex; align-items: center">
              <span>返回值类型:</span>
              <a-input v-model="interfaceMemberTmp.returnType" style="width: 300px" />
            </div>
            <div v-for="(methodParamsTmp, methodParamsKey) in interfaceMemberTmp.params" style="margin-left: 20px">
              <div style="display: flex; align-items: center">
                <span>方法参数名称:</span>
                <a-input v-model="methodParamsTmp.name" style="width: 300px" />
              </div>
              <div style="display: flex; align-items: center">
                <span>方法参数是否可为空(可为空打?否则留空):</span>
                <a-input v-model="methodParamsTmp.canNull" style="width: 300px" />
              </div>
              <div style="display: flex; align-items: center">
                <span>方法参数类型:</span>
                <a-input v-model="methodParamsTmp.type" style="width: 300px" />
              </div>
              <a-button>添加方法参数</a-button>
            </div>
            <a-button>添加方法</a-button>
          </div>
          <a-button>添加接口</a-button>
        </div>
      </div>
      <div v-for="(typeTmp, typeKey) in instanceTmp.type" style="margin-left: 20px">
        <h4>类型(type)</h4>
        <div>
          <div style="display: flex; align-items: center">
            <span>类型名称:</span>
            <a-input v-model="typeTmp.typeName" style="width: 300px" />
          </div>
          <div style="display: flex; align-items: center">
            <span>继承类型:</span>
            <a-input v-model="typeTmp.extendType" style="width: 300px" />
          </div>
          <div v-for="(typeMemberTmp, typeMemberKey) in typeTmp.typeMember" style="margin-left: 20px">
            <div style="display: flex; align-items: center">
              <span>类型成员名称:</span>
              <a-input v-model="typeMemberTmp.name" style="width: 300px" />
            </div>
            <div style="display: flex; align-items: center">
              <span>类型成员值是否可为空(可为空打?否则留空):</span>
              <a-input v-model="typeMemberTmp.canNull" style="width: 300px" />
            </div>
            <div style="display: flex; align-items: center">
              <span>类型成员类型:</span>
              <a-input v-model="typeMemberTmp.type" style="width: 300px" />
            </div>
            <a-button>添加成员</a-button>
          </div>
          <a-button>添加类型</a-button>
        </div>
      </div>
    </div>
      <a-button>添加实例</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoreConfig",
  data() {
    return {
      coreObj: {
        instance: [
          {
            interface: [
                {
                  interfaceName: "index",
                  interfaceMember: [
                    {
                      methodName: "",
                      params: [{
                        name: "",
                        type: "",
                        canNull: ""
                      }],
                      returnType: ""
                    }
                  ]
                }
            ],
            type: [
              {
                typeName: "typeIndex",
                extendType: "",
                typeMember: [
                  {
                    name: "",
                    type: "",
                    canNull: ""
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
