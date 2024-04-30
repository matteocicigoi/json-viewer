<script>
import Form from './Form.vue';
import Output from './Output.vue';
export default {
    components: {
        Form,
        Output
    }
}
</script>
<template>
    <main class="container">
        <h1 class="text-center m-4">JSON Viewer</h1>
        <Form />
        <Output />
    </main>
</template>