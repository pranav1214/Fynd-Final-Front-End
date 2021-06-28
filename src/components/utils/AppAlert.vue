<template>
    <div class="alert" :class="'alert-' + theme" role="alert">
        <div class="font-weight-bold">
            <slot name="title"></slot>
        </div>

        <div class="font-weight-bold">
            <slot name="alert-heading"></slot>
        </div>

        <slot></slot>
    </div>
</template>

<script>
import { themeMixin } from "@/mixins/theme";

export default {
    name: "AppAlert",
    mixins: [themeMixin],
};
</script>

<style scoped>

</style>