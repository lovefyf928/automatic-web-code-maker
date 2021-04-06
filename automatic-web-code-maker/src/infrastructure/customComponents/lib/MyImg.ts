import {CustomComponents} from "@/infrastructure/customComponents/customComponents";
import {VNode} from "vue";


export function MyImg() {
    return CustomComponents.extend({
        name: "MyImg",
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
                            "img",
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
