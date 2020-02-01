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

        <div class="buttons">
            <button class="button is-success save-button" @click="save()">Save</button>
            <button class="button is-danger delete-button" @click="del()">
                <span class="icon is-medium">
                    <i class="ion-md-trash"></i>
                </span>
            </button>
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

    del(): void {
        this.command.delete();
        this.$emit('reload');
    }
};
</script>

<style lang="scss">
.buttons {
    display: flex;

    .save-button {
        flex-grow: 1;
    }

    .delete-button {
        width: 40px;
    }
}
</style>