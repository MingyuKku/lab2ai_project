<template>
    <div class="signup-agree-list py-primary px-3 border border-border-gray-04 rounded">
        <div class="all-checked flex mb-5">
            <input
                type="checkbox"
                id="all-checked"
                :checked="isAllChecked"
                value="all-checked"
                @change="changeAllChecked"
                hidden
            />
            <label for="all-checked" class="cursor-pointer">
                <div class="flex">
                    <div
                        class="w-4 h-4 rounded-full p-0.5 mr-2 border"
                        :class="items.checkedItems.length >= CheckItemNames.length ? 'bg-system-mint border-system-mint' : 'border-border-gray-01'"
                    >
                        <IconCheckSm v-if="items.checkedItems.length >= CheckItemNames.length" />
                    </div>
                    <div>
                        <p class="text-body-3">전체동의</p>
                        <p class="text-cap-2m font-normal text-font-dark-01 mt-1">필수동의 항목 및 이벤트 정보 수신(선택)에 전체 동의합니다.</p> 
                    </div>
                </div>
            </label>
        </div>
        <ul>
            <li
                v-for="item,idx in items.items" :key="idx"
                class="mb-4 last:mb-0"
            >
                <div class="flex">
                    <input
                        type="checkbox"
                        :id="item.name"
                        :checked="isChecked(item.name)"
                        :value="item.name"
                        @change="changeChecked"
                        class="peer"
                        hidden
                    />
                    <label
                        :for="item.name"
                        class="flex items-center justify-between w-full cursor-pointer"
                    >
                        <div class="left flex items-center">
                            <div
                                class="w-4 h-4 rounded-full p-0.5 mr-2 border"
                                :class="items.checkedItems.includes(item.name) ? 'bg-system-mint border-system-mint' : 'border-border-gray-01'"
                            >
                                <IconCheckSm v-if="items.checkedItems.includes(item.name)" />
                            </div>
                            <span class="text-body-5 mr-1" :class="item.required ? 'text-position-short' : 'text-font-dark-03'">({{ item.required ? '필수' : '선택' }})</span>
                            <span class="text-body-5">{{ item.label }}</span>
                        </div>
                        <div class="right">
                            <IconDirectionMd
                                v-if="item.href"
                                @click.prevent="navigateTo(item.href)"
                                fill="#929AA5"
                            />
                        </div>
                    </label>
                </div>
                
            </li>
        </ul>
    </div>
</template>


<script lang="ts" setup>
import { CheckItemNames, type CheckItemNamesType, type SignupAgreeList } from '~/composables/user/sign-up/business/_types';


const props = defineProps<{
    items: SignupAgreeList;
    updateSignupAgreeList: (name: CheckItemNamesType) => void;
    toggleSignupAgreeListAllCheck: () => void;
}>();


const isAllChecked = computed(() => props.items.checkedItems.length >= CheckItemNames.length);

const isChecked = computed(() => {
    return (name: CheckItemNamesType) => {
        if (props.items.checkedItems.includes(name)) return true;
        return false;
    }
})

const changeAllChecked = () => {
    props.toggleSignupAgreeListAllCheck();
}

const changeChecked = (e: Event) => {
    const target = e.target as HTMLInputElement;
    props.updateSignupAgreeList(target.value as CheckItemNamesType);
}

</script>