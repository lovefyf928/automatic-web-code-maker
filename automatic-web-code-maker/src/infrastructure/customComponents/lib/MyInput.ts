import {CustomComponents} from "@/infrastructure/customComponents/customComponents";
import {VNode} from "vue";


export function MyInput() {
    return CustomComponents.extend({
        name: "MyInput",
        data() {
            return {
                cc: new CustomComponents(this),
                styleObj: {},
                showElement: true
            }
        },
        mounted() {
            setTimeout(() => {
                this.styleObj = this.cc.cssObj;
            })
        },
        render(createElement): VNode {
            if (this.showElement) {
                console.log(1);
                return createElement(
                    "label",
                    [
                        createElement(
                            "input",
                            {
                                style: this.styleObj
                            }
                        )
                    ]
                )
            }
            else {
                return createElement()
            }
        }
    })
}
