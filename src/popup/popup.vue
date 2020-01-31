<template>
    <div class="main">
        <h1 class="title">QuickJump</h1>
        <CommandComponent v-for="c in commands" :key="c.name" :command="c"></CommandComponent>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CommandComponent from '../command.vue';
import { Command } from '../storage/command';

export default Vue.extend({
    data() {
        return {
            commands: [],
        }
    },
    mounted() {
        console.log(`mounted`);
        this.loadCommands();
    },
    methods: {
        loadCommands() {
            Command.list().then(c => {
                console.log(`got commands ${JSON.stringify(c)}`);
                this.commands = c;
            })
        }
    },
    components: {
        CommandComponent,
    }
})
</script>

<style lang="scss">
@import '~bulma/bulma';
.main {
    width: 300px;
    height: 500px;
    margin: 15px;
}
</style>