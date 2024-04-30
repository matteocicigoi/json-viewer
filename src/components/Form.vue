<script>
import axios from 'axios';
import { store } from '/src/store';
export default {
    data() {
        return {
            store
        }
    },
    methods: {
        search() {
            this.store.output = null
            this.store.outputError = null
            this.store.loading = true;
            axios.get(this.store.url)
                .then(function (response) {
                    // handle success
                    store.output = response.data;
                })
                .catch(function (error) {
                    // handle error
                    store.outputError = error.message;
                })
                .finally(function () {
                    // always executed
                    store.selectedKeys = [];
                    store.parentKeys = [];
                    store.loading = false;
                });
        },
        isLink(){
            if(this.store.url !== null){
                if(this.store.url.length >= 3){
                    return true;
                }
            }
            return false;
        }
    }
}
</script>
<template>
    <!-- Ricerca -->
    <div class="form-floating mb-3 d-flex">
        <input type="text" class="form-control form-link shadow-none" id="form-link" placeholder="link" v-model="store.url">
        <button :disabled="!isLink()" type="button" :class="{'btn-outline-success' : isLink(), 'btn-outline-secondary' : !isLink()}" class="btn ms-3" @click="search()">Run</button>
        <label for="form-link">URL</label>
    </div>
    <!-- Fine Ricerca -->
</template>
<style scoped lang="scss"></style>