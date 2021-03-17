import {CustomComponents} from "@/infrastructure/customComponents/customComponents";
import {VNode} from "vue";


export function MyInput() {
    return CustomComponents.extend({
        name: "MyInput",
        data() {
            return {
                cc: new CustomComponents()
            }
        },
        render(createElement, hack): VNode {
            return createElement(
                "label",
                [
                    createElement(
                        "input",
                        {
                            "style": this.cc.styleString
                        }
                    )
                ]
            )
        }
    })
}
