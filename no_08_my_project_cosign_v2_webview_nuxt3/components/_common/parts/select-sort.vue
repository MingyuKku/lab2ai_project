<template>
    <div :id="tagId" class="selected-sort inline-block relative">
        <div
            @click="items.length > 1 ? onClickSelectedBox() : undefined"
            class="flex items-center"
            :class="{'cursor-pointer': items.length > 1}"
        >
            <span class="text-cap-1m" :class="selectFlag ? 'text-font-black' : 'text-font-dark-02'">{{ items[selectedIndex]?.label }}</span>
            <IconObjectSort :stroke-width="selectFlag ? '1.5' : '1'" />
        </div>
        <div
            v-if="selectFlag && items.length > 1"
            class="drop-down absolute bg-white rounded-[8px] shadow-02 mt-1.5 z-[2]"
            :class="align === 'right' ? 'right-0' : 'left-0'"
        >
            <div
                v-for="(item,idx) in items"
                :key="idx"
                @click="onClickItem(idx)"
                class="item px-3 py-primary cursor-pointer"
            >
                <span class="block text-cap-1r text-font-black whitespace-nowrap">{{ item?.label }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { SelectedItems } from './_types';


const { tagId, changeSelectedIndex, items } = defineProps<{
    tagId: string;
    align?: 'left' | 'right';
    items: SelectedItems[];
    selectedIndex: number;
    changeSelectedIndex?: (index: number) => void;
}>();

const selectFlag = ref(false);


const onClickSelectedBox = () => {
    selectFlag.value = !selectFlag.value;
    if (selectFlag.value) {
        document.addEventListener('click', clickCallback);
    } else {
        document.removeEventListener('click', clickCallback);
    }
}

const onClickItem = (itemIndex: number) => {
    selectFlag.value = false;
    if (changeSelectedIndex) changeSelectedIndex(itemIndex);
}

const clickCallback = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.closest(`#${tagId}`)) {
        selectFlag.value = false;
    }
}


onUnmounted(() => {
    document.removeEventListener('click', clickCallback);
})



</script>