<template>
    <div class="main">
        <h1 class="title">QuickJump</h1>
        <div class="accordion" v-for="c in commands" :key="c.name">
            <div class="summary" @click="toggleExpansion(c.name)">
                <span class="name">{{ c.name }}</span>
                <span class="icon is-medium" :class="{ rotated: !!expanded[c.name] }">
                    <i class="arrow-icon ion-md-arrow-dropright"></i>
                </span>
            </div>
            <div class="details" :class="{ 'expanded': !!expanded[c.name] }">
                <CommandComponent :command="c"></CommandComponent>
            </div>
        </div>
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
            expanded: {},
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
        },
        toggleExpansion(name: string) {
            if (this.expanded[name] === undefined) {
                Vue.set(this.expanded, name, false);
            }
            this.expanded[name] = !this.expanded[name];
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

.accordion {
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid lightgray;

    .summary {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .name {
            font-size: 15px;
        }
    }

    .details {
        display: none;
    }
    .details.expanded {
        display: initial;
    }

    .icon {
        transition: transform 0.1s;

        .arrow-icon {
            font-size: 30px;
        }
    }
}

.rotated {
    transform: rotate(90deg);
}
</style>