<template>
    <div class="main">
        <div class="header">
            <h1 class="title">QuickJump</h1>
            <button class="button" @click="toggleEditing()">
                <span class="icon is-medium">
                    <i v-if="!isEditing" class="mdi mdi-pencil"></i>
                    <i v-if="isEditing" class="mdi mdi-close"></i>
                </span>
            </button>
        </div>
        <div class="accordion" v-for="c in commands" :key="c.id">
            <div class="summary" @click="toggleExpansion(c.id)">
                <span v-if="c.name" class="name">{{ c.name }}</span>
                <span v-else class="unnamed">Untitled</span>
                <span class="icon is-medium" :class="{ rotated: isExpanded(c.id) }">
                    <i class="arrow-icon mdi mdi-chevron-right"></i>
                </span>
            </div>
            <div class="details" :class="{ 'expanded': isExpanded(c.id) }">
                <CommandComponent @reload="loadCommands()" :command="c" :is-editing="isEditing"></CommandComponent>
            </div>
        </div>
        <div>
            <button class="button is-primary new-button" @click="addNewCommand()">+ Add New</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommandComponent from '../command.vue';
import { Command } from '../storage/command';

@Component({
    components: {
        CommandComponent,
    }
})
export default class Popup extends Vue{
    commands: Command[] = [];
    expanded: {[id: string]: boolean} = {};
    isEditing: boolean = false;

    mounted() {
        this.loadCommands();
    }

    loadCommands() {
        Command.list().then(c => {
            this.commands = c;
        })
    }

    toggleExpansion(id: string) {
        if (this.expanded[id] === undefined) {
            Vue.set(this.expanded, id, false);
        }
        this.expanded[id] = !this.expanded[id];
    }

    isExpanded(id: string) {
        return !!this.expanded[id];
    }

    addNewCommand() {
        const c = new Command();
        this.commands.push(c);
        this.toggleExpansion(c.id);
        this.isEditing = true;
    }

    toggleEditing() {
        this.isEditing = !this.isEditing;
    }
}
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

        .unnamed {
            color: gray;
            font-style: italic;
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

.new-button {
    width: 100%;
}

.header {
    display: flex;
    justify-content: space-between;
}
</style>