import { reactive } from "vue";

export const store = reactive ({
    url : null,
    output : null,
    outputError : null,
    selectedKeys : [],
    parentKeys : [],
    loading : false
})