<template>
    <div>
        <div class="field">
            <label class="label">Field {{ fieldNum }} Name</label>
            <div class="control">
                <input v-model="field.name" class="input" type="text" placeholder="Field name" required/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Field } from './storage/command';

@Component
export default class CommandFieldComponent extends Vue {
    @Prop()
    private field: Field;

    @Prop()
    private fieldNum: number;
}
</script>

<style lang="scss">

</style>