<template>
    <div>
        <div v-if="isEditing">
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
                <button class="button is-success main-button" @click="save()">Save</button>
                <button class="button is-danger delete-button" @click="del()">
                    <span class="icon is-medium">
                        <i class="mdi mdi-delete"></i>
                    </span>
                </button>
            </div>
        </div>
        <div v-else>
            <div class="description">{{ command.description }}</div>
            <form @submit.prevent="go()">
                <div class="field" v-for="(field, idx) in fields" :key="idx">
                    <label class="label">{{ field.name }}</label>
                    <div class="control">
                        <input v-if="field.type === fieldTypes.String" v-model="values[idx]" class="input" type="text" placeholder="Value" :name="buildInputName(command, field)" required/>
                        <div v-if="field.type === fieldTypes.Dropdown" class="select">
                            <select v-model="values[idx]" class="select" required>
                                <option v-for="option of field.dropdownValues" :key="option.value">
                                    {{ option.value }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button type="submit" class="button is-success main-button" :disabled="!areFieldsValid()">Go</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Command, DropdownValue, Field, FieldType } from './storage/command';
import CommandFieldComponent from './command-field.vue';

@Component({
    components: {
        CommandFieldComponent,
    }
})
export default class CommandComponent extends Vue{
    @Prop()
    private command: Command;

    @Prop()
    private isEditing: boolean;

    fieldTypes = FieldType;
    errorMessage: string = '';
    values: string[] = [];

    mounted(): void {
        this.command.fields.forEach((field: Field, idx: number) => {
            if (field.type === FieldType.Dropdown) {
                const def = field.dropdownValues.find(dv => dv.isDefault);
                if (def) {
                    Vue.set(this.values, idx, def.value);
                }
            }
        });
    }

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
        if (!this.command.url) {
            return 0;
        }
        const m = this.command.url.match(/%s/g) || [];
        return m.length;
    }

    areFieldsValid(): boolean {
        if (this.numPlaceholders() !== this.values.length) {
            return false;
        }
        for (let value of this.values) {
            if (!value) {
                return false;
            }
        }
        return true;
    }

    go(): void {
        let u = this.command.url;
        for (let val of this.values) {
            u = u.replace('%s', val);
        }
        window.open(u);
    }

    buildInputName(command: Command, field: Field): string {
        return `${command.id}:${field.name}`;
    }
};
</script>

<style lang="scss">
.buttons {
    display: flex;

    .main-button {
        flex-grow: 1;
    }

    .delete-button {
        width: 40px;
    }
}

.description {
    font-size: 13px;
    color: gray;
}

.select {
    width: 100%;
}
</style>