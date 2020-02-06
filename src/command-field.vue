<template>
    <div>
        <label class="label">Field {{ fieldNum }}</label>
        <div class="field has-addons">
            <p class="control" v-for="type of fieldTypeDefs" :key="type.type">
                <button class="button" :disabled="field.type === type.type" @click="setFieldType(field, type.type)">
                    <icon class="icon is-small">
                        <i class="mdi" :class="type.icon"></i>
                    </icon>
                </button>
            </p>
            <div class="control control-grow">
                <input :disabled="field.type === undefined" v-model="field.name" class="input" type="text" placeholder="Field name" required/>
            </div>
        </div>
        <div v-if="field.type === fieldTypes.Dropdown">
            <label class="label">Field {{ fieldNum }} Values</label>
            <div class="field has-addons" v-for="(value, idx) of dropdownValues" :key="value">
                <p class="control">
                    <button class="button" :disabled="value.isDefault" @click="setDefault(value)">
                        <icon v-if="value.isDefault" class="icon is-small">
                            <i class="mdi mdi-radiobox-marked"/>
                        </icon>
                        <icon v-else class="icon is-small">
                            <i class="mdi mdi-radiobox-blank"/>
                        </icon>
                    </button>
                </p>
                <p class="control control-grow">
                    <input class="input" v-model="value.value"/>
                </p>
                <p class="control" v-if="idx + 1 === dropdownValues.length">
                    <button class="button" @click="addDropdownValue()">
                        <icon class="icon is-small">
                            <i class="mdi mdi-plus"></i>
                        </icon>
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Field, FieldType, DropdownValue } from './storage/command';

@Component
export default class CommandFieldComponent extends Vue {
    @Prop()
    private field: Field;

    @Prop()
    private fieldNum: number;

    fieldTypes = FieldType;

    fieldTypeDefs = [
        { type: FieldType.String, icon: 'mdi-format-color-text' },
        { type: FieldType.Dropdown, icon: 'mdi-menu-open' },
    ]

    setFieldType(field: Field, type: FieldType) {
        Vue.set(field, 'type', type);
    }

    addDropdownValue(): void {
        this.field.dropdownValues.push(new DropdownValue());
    }

    get dropdownValues(): DropdownValue[] {
        if (!this.field.dropdownValues) {
            this.field.dropdownValues = [new DropdownValue()];
        }
        return this.field.dropdownValues;
    }

    setDefault(value: DropdownValue) {
        this.field.dropdownValues.forEach(dv => {
            if (dv === value) {
                dv.isDefault = true;
            } else {
                dv.isDefault = false;
            }
        })
    }
}
</script>

<style lang="scss">
.control-grow {
    flex-grow: 1;
}
</style>