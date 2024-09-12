<template>
    <IconArrowBack @click="$router.options.history.state.back ? $router.go(-1) : $router.push('/')" class="cursor-pointer -ml-2.5" />
</template>