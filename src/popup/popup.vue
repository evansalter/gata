<template>
    <div class="main">
        <div class="header">
            <h1 class="title popup-title">gata</h1>
            <div>
                <button class="button" v-if="!showHelp" @click="showHelp = true">
                    <span class="icon is-medium">
                        <i class="mdi mdi-help-circle-outline"></i>
                    </span>
                </button>
                <button class="button" v-if="!showHelp && !isEditing" @click="toggleEditing()">
                    <span class="icon is-medium">
                        <i class="mdi mdi-pencil"></i>
                    </span>
                </button>
                <button class="button" v-if="showHelp" @click="showHelp = false">
                    <span class="icon is-medium">
                        <i class="mdi mdi-close"></i>
                    </span>
                </button>
                <button class="button" v-else-if="isEditing" @click="toggleEditing()">
                    <span class="icon is-medium">
                        <i class="mdi mdi-close"></i>
                    </span>
                </button>
            </div>
        </div>
        <div v-if="showHelp">
            <HelpComponent :onboarding="needsOnboarding"></HelpComponent>
        </div>
        <div v-else>
            <h4 class="title popup-title is-4">My Shortcuts</h4>
            <div class="search">
                <div class="field">
                    <div class="control has-icons-left">
                        <input v-focus v-model="searchTerm" class="input" type="text" placeholder="Search..." v-on:keyup.enter="searchEnter" v-on:keydown.tab="searchTab"/>
                        <span class="icon is-small is-left">
                            <i class="mdi mdi-magnify"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div v-if="filteredCommands.length">
                <div class="accordion" v-for="c in filteredCommands" :key="c.id">
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
            </div>
            <div v-else class="content">
                Looks like you haven't created any shortcuts yet! Add one below, or click
                <icon class="icon is-small"><i class="mdi mdi-help-circle-outline"></i></icon>
                if you need help.
            </div>
            <div>
                <button class="button is-primary new-button" @click="addNewCommand()">+ Add New</button>
            </div>
            <div class="my-footer">
                <span>
                    Made with <icon class="icon is-small"><i class="mdi mdi-coffee"/></icon> by <a @click="goToURL('https://evansalter.com')">Evan Salter</a>
                </span>
                <a class="github-icon" @click="goToURL('https://github.com/evansalter/gata')">
                    <icon class="icon is-small"><i class="mdi mdi-github-circle"/></icon>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommandComponent from '../command.vue';
import HelpComponent from '../help.vue';
import { Command } from '../storage/command';
import Fuse from 'fuse.js';

const fuseOpts: Fuse.FuseOptions<Command> = {
    keys: [
        { name: 'name', weight: 0.7 },
        { name: 'description', weight: 0.3 },
    ],
    shouldSort: true,
};

@Component({
    components: {
        CommandComponent,
        HelpComponent,
    }
})
export default class Popup extends Vue{
    commands: Command[] = [];
    expanded: {[id: string]: boolean} = {};
    isEditing: boolean = false;
    searchTerm: string = '';
    needsOnboarding: boolean = false;
    showHelp: boolean = false;

    mounted() {
        this.loadCommands();
    }

    loadCommands() {
        Command.list().then(c => {
            this.commands = c;

            if (!this.commands || this.commands.length === 0) {
                this.needsOnboarding = true;
                this.showHelp = true;
            }
        })
    }

    get filteredCommands(): Command[] {
        if (!this.searchTerm) {
            return this.commands || [];
        }

        const fuse = new Fuse(this.commands, fuseOpts);
        const results = fuse.search(this.searchTerm); // as string[];
        return results as Command[];
    }

    searchEnter(): void {
        this.searchTab();
    }

    searchTab(): void {
        const c = this.filteredCommands[0];
        this.setExpanded(c.id, true);
    }

    toggleExpansion(id: string) {
        this.setExpanded(id, !this.expanded[id]);
    }

    private setExpanded(id: string, expanded: boolean): void {
        Vue.set(this.expanded, id, expanded);
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

    goToURL(url: string): void {
        window.open(url);
    }
}
</script>

<style lang="scss">
@import '../theme';
@import '~bulma/bulma';

/**
    Import fonts
*/
@font-face {
    font-family: Comfortaa;
    src: url(../fonts/Comfortaa-Regular.ttf) format('truetype');
}

/**
    Styles
*/
.popup-title {
    font-family: Comfortaa;
    color: $primary;
}

.main {
    width: 300px;
    height: 100%;
    margin: 15px;
}

.search {
    margin-bottom: 10px;
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

.my-footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    .github-icon {
        color: inherit;

        &:hover {
            color: black;
        }
    }
}
</style>