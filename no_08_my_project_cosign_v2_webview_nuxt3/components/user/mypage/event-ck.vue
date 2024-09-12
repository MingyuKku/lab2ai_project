<template>
    <div class="flex">
        <input
            id="event-ck"
            type="checkbox"
            :checked="eventCk"
            @change="changeChecked"
            hidden
        >
        <label for="event-ck" class="flex items-center cursor-pointer">
            <p class="text-body-3r mr-2">이벤트 정보 수신 동의</p>
            <div
                class="w-4 h-4 rounded-full p-0.5 border"
                :class="eventCk ? 'bg-system-mint border-system-mint' : 'border-border-gray-01'"
            >
                <IconCheckSm v-if="eventCk" />
            </div>
        </label>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    eventCk: boolean;
    updateEventCk: (value: boolean) => void;
}>();


const changeChecked = () => {
    const { eventCk, updateEventCk } = props;
    updateEventCk(!eventCk);
}

</script>