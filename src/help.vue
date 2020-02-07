<template>
   <div class="help-main content">
        <p class="title popup-title is-4">Welcome to gata!</p>

        <template v-if="onboarding">
            <p>
                You're seeing this message because you are either a new user or you have not yet created any shortcuts.
            </p>

            <p>
                This guide will walk you through the setup and usage of <span class="logo">gata</span>.
            </p>
        </template>

        <p class="title popup-title is-5">
            What is gata?
        </p>

        <p>
            <span class="logo">gata</span> saves time by allowing you to define and use dynamic shortcuts. Rather than links 
            to a specific URL, dynamic shortcuts allow you to define variables in your URL.
        </p>

        <p>
            For example, suppose we want a shortcut to go to a Twitter profile. Twitter profiles live at the URL https://twitter.com/<username>.
            To make this dynamic, we'll tell <span class="logo">gata</span> that everything after the slash should be filled in later.
            So, the URL for the shortcut will be https://twitter.com/%s, where "%s" signifies a placeholder.
        </p>

        <p class="title popup-title is-5">
            Navigation
        </p>

        <p>
            Moving around <span class="logo">gata</span> is easy! To get to the main menu, click the <icon class="icon is-small"><i class="mdi mdi-close"></i></icon>
            at the top of this page. To get back to this help screen, click the <icon class="icon is-small"><i class="mdi mdi-help-circle-outline"></i></icon>
        </p>

        <p>
            Once you have some shortcuts defined, you can search for them and expand them on the main screen. To edit them, click the <icon class="icon is-small"><i class="mdi mdi-pencil"></i></icon>.
        </p>

        <p class="title popup-title is-5">
            How do I create a shortcut?
        </p>

        <p>
            Using the Twitter example again, let's walk through the steps required to define a new shortuct. On the main screen, do the following:

            <ol>
                <li>Click "Add New +"</li>
                <li>Give your component a title and description</li>
                <li>Define your URL as described above. Again, this will be https://twitter.com/%s, where %s is the placeholder</li>
                <li>Set your paramter type to "text" by choosing the <icon class="icon is-small"><i class="mdi mdi-format-color-text"></i></icon> button</li>
                <li>Give the parameter a name. In this case, it should be "Username"</li>
                <li>Hit save</li>
            </ol>
        </p>

        <p>
            You also have the option to create dropdown parameters, instead of free-form text. To do this, click the <icon class="icon is-small"><i class="mdi mdi-menu-open"></i></icon>.
            From there, you can fill out the first possible value, add more with <icon class="icon is-small"><i class="mdi mdi-plus"></i></icon>, and delete options with 
            <icon class="icon is-small"><i class="mdi mdi-delete"></i></icon>.
        </p>

        <p class="title popup-title is-5">
            How do I use a shortcut?
        </p>

        <p>
            The first step is to open <span class="logo">gata</span>. To do this, click the <img class="small-icon" src="../design/graphics_Medium Icon.png"/> to the right of your address bar.
            Alternatively, you can use the keyboard shortcut <kbd>Ctrl+.</kbd> (<kbd>Command+.</kbd> on Mac).
        </p>

        <p>
            Next you can locate the shortcut you want, using the search bar if necessary, and click on it to expand it. From there, you can fill out of the parameters, and click "Go".
            The page you requested will open in a new tab.
        </p>

        <p class="title popup-title is-5">
            How to go faster?
        </p>

        <p>
            The point of <span class="logo">gata</span> is to browse faster, so lets learn how to navigate <span class="logo">gata</span> with the keyboard!
            We have already learned that the shortcut to open <span class="logo">gata</span> is <kbd>Ctrl+.</kbd> or <kbd>Command+.</kbd>.
            However, you can also use commands without taking your hands off the keyboard:

            <ol>
                <li>Open <span class="logo">gata</span> with the shortcut <kbd>Ctrl+.</kbd> or <kbd>Command+.</kbd></li>
                <li>The search box is highlighted. Start typing to filter your shortcuts. Using the Twitter example again, we would type "Tw"</li>
                <li>Once the desired shortcut is at the top of the list, hit <kbd>tab</kbd>. This will expand the command and put your cursor in the first parameter</li>
                <li>Type the value for the parameter, and hit <kbd>tab</kbd> again until they're all filled in</li>
                <li>Hit <kbd>enter</kbd>, and you will be taken to your desired page</li>
            </ol>
        </p>

        <p class="title popup-title is-5">
            Thank You
        </p>

        <p>
            Thank you for downloading <span class="logo">gata</span>! We hope you enjoy using it. Come back to this page at any time by clicking 
            <icon class="icon is-small"><i class="mdi mdi-help-circle-outline"></i></icon> if you need help.
        </p>

        <p>
            If you encounter an issue with <span class="logo">gata</span> you can open an issue on <a @click="goToURL('https://github.com/evansalter/gata')">Github</a>
            or email us at <a @click="goToURL('mailto:gata@evansalter.com')">gata@evansalter.com</a>
        </p>
   </div> 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Command, DropdownValue, Field, FieldType } from './storage/command';
import CommandFieldComponent from './command-field.vue';

@Component
export default class HelpComponent extends Vue {
    @Prop()
    onboarding: boolean;

    goToURL(url: string) {
        window.open(url);
    }
}
</script>

<style lang="scss">
@import 'theme';

.logo {
    font-family: Comfortaa;
    color: $primary;
}

.small-icon {
    width: 18px;
    height: auto;
}

kbd {
    border: 1px solid lightgray;
    border-radius: 3px;
    padding: 3px;
    box-shadow: 1px 1px lightgrey;
}
</style>