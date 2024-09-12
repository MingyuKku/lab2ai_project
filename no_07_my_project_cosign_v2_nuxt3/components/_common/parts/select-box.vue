<template>
    <div :id="tagId" class="selected-box inline-block relative">
        <div
            @click="onClickSelectedBox"
            class="h-8 flex items-center pr-3 pl-3.5 rounded-full cursor-pointer"
            :class="selectFlag ? 'border-[1.5px] border-font-black' : 'border border-border-gray-01'"
        >
            <span class="text-body-4">{{ items[selectedIndex].label }}</span>
            <IconDirectionSm class="ml-1" :class="selectFlag ? 'rotate-180' : 'rotate-0'" :fill="selectFlag ? '#000' : '#4B5058'" />
        </div>
        <div v-if="selectFlag" class="drop-down absolute min-w-full right-0 bg-white rounded-[8px] shadow-02 mt-1.5 z-[2]">
            <div
                v-for="(item,idx) in items"
                :key="idx"
                @click="onClickItem(idx)"
                class="item px-3 py-primary cursor-pointer"
            >
                <span class="block text-cap-1r text-font-black whitespace-nowrap">{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { SelectedItems } from './_types';


const { tagId, changeSelectedIndex } = defineProps<{
    tagId: string;
    items: SelectedItems[];
    selectedIndex: number;
    changeSelectedIndex: (index: number) => void;
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
    changeSelectedIndex(itemIndex);
}

const clickCallback = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.closest(`#${tagId}`)) {
        selectFlag.value = false;
    }
}


onUnmounted(() => {
    document.removeEventListener('click', clickCallback)
})

</script>