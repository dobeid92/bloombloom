<template>
    <div class="fixed w-full h-full top-0 right-0 bg-gray-100 z-100 flex flex-col justify-center items-center opacity-50">
        <svg v-bind:width="dtWidth" v-bind:height="dtWidth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-eclipse" style="background: none;">
            <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#3183c8" transform="rotate(335.655 50 51)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
            </path>
        </svg>
        <div class="mt-2 text-base text-center text-gray-700 capitalize">
            {{text}}
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            dtWidth: {
                type: String,
                default: '200px',
            },
            dtHeight: {
                type: String,
                default: '200px',
            },
            dtText: {
                type: String,
                default: function () {
                    return 'Loading...'
                }
            }
        },
        data: function () {
            return {
                text: null
            }
        },
        created: function () {
            this.text = this.dtText;
        },
    }
</script>
