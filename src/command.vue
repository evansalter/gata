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

        <div class="field" v-for="(field, idx) in fields" :key="idx">
            <CommandFieldComponent :field="field" :field-num="idx + 1"></CommandFieldComponent>
        </div>

        <div v-if="errorMessage" class="notification is-danger">
            {{ errorMessage }}
        </div>

        <div class="buttons">
            <button class="button is-success save-button" @click="save()">Save</button>
            <button class="button is-danger delete-button" @click="del()">
                <span class="icon is-medium">
                    <i class="mdi mdi-delete"></i>
                </span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Command, Field } from './storage/command';
import CommandFieldComponent from './command-field.vue';

@Component({
    components: {
        CommandFieldComponent,
    }
})
export default class CommandComponent extends Vue{
    @Prop()
    private command: Command;

    errorMessage: string = '';

    save(): void {
        this.errorMessage = null;
        try {
            this.command.fields = this.command.fields.slice(null, this.numPlaceholders())
            this.command.save()
        } catch(e) {
            this.errorMessage = e;
        }
    }

    del(): void {
        this.command.delete();
        this.$emit('reload');
    }

    get fields(): Field[] {
        if (!this.command.fields) {
            this.command.fields = [];
        }
        while (this.command.fields.length < this.numPlaceholders()) {
            this.command.fields.push(new Field());
        }
        return this.command.fields.slice(0, this.numPlaceholders());
    }

    numPlaceholders(): number {
        const m = this.command.url.match(/%s/g) || [];
        return m.length;
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