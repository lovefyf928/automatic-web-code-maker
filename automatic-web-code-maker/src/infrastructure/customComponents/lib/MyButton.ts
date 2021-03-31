import {CustomComponents} from "@/infrastructure/customComponents/customComponents";
import {VNode} from "vue";


export function MyButton() {
    return CustomComponents.extend({
        name: "MyButton",
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
                return createElement(
                    "label",
                    [
                        createElement(
                            "button",
                            {
                                style: this.styleObj,
                            },
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
