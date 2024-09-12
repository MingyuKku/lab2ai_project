<template>
    <NuxtLink
        :to="to ? to : {
            path: path,
            query: computedQuery
        }"
        :external="external"
        :replace="replace"
        :target="target"
        :rel="rel"
    >
        <slot></slot>
    </NuxtLink>
</template>

<script lang="ts" setup>
import type { LocationQueryRaw, RouteLocationRaw } from '#vue-router';

const props = defineProps<{
    to?: RouteLocationRaw;
    path?: string;
    query?: LocationQueryRaw;
    external?: boolean;
    replace?: boolean;
    target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
    rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null;
}>();


const computedQuery = computed(() => {
    const { query } = useRoute();
    
    return {
        ...query,
        ...props.query
    };
})

// LocationQueryRaw

</script>