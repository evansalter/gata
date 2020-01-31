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
    </div>
</template>

<script lang="ts">
export default {
    props: ['command']
}
</script>

<style lang="scss">

</style>