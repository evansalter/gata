<template>
    <div>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input v-model="command.name" class="input" type="text" placeholder="Command name" required/>
            </div>
        </div>

        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <input v-model="command.description" class="input" type="text" placeholder="Description"/>
            </div>
        </div>

        <div class="field">
            <label class="label">URL</label>
            <div class="control">
                <input v-model="command.url" class="input" type="text" placeholder="URL" required/>
            </div>
        </div>

        <div v-if="errorMessage" class="notification is-danger">
            {{ errorMessage }}
        </div>

        <div>
            <button class="button is-success save-button" @click="save()">Save</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Command } from './storage/command';

@Component
export default class CommandComponent extends Vue{
    @Prop()
    private command: Command;

    errorMessage: string = '';

    save(): void {
        this.errorMessage = null;
        try {
            this.command.save()
        } catch(e) {
            this.errorMessage = e;
        }
    }
};
</script>

<style lang="scss">
.save-button {
    width: 100%;
}
</style>