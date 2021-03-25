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
                console.log(1);
                return createElement(
                    "label",
                    [
                        createElement(
                            "img",
                            {
                                style: this.styleObj,
                                attrs: {
                                    src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F62e80da4db21d3d2134dab05bc4cd729f260ec6f.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619218706&t=4f024dfc195d9d08b1fd110ada78b208"
                                }
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
