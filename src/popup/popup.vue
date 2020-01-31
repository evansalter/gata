<template>
    <div>
        <h2>Popup</h2>
        <input v-model="name"/>
        <button @click="save()">Save</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Command } from '../storage/command';

export default Vue.extend({
    data() {
        return {
            name: '',
        }
    },
    methods: {
        save() {
            console.log(`saving name ${this.name}`);
            const c = new Command(this.name, null, null);
            c.save();
        }
    }
})
</script>

<style lang="scss">
</style>