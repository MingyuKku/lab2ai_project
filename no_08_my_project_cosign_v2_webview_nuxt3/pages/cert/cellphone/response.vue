<template>
    <div class="container"></div>
  </template>
  
  <script setup lang="ts">
    import type { BasicRes } from "~/composables/_api/_types";
    import { piniaAlert } from "~/pinia/popup/piniaAlert";
    import { piniaPopup } from "~/pinia/popup/piniaPopup";
    import { messageWebview } from '~/composables/_app/useFlutterWebview';

    
    onMounted(async () => {
        const { $serviceContentApiFetch } = useNuxtApp();
        const { query } = useRoute(); 

        let formData = new FormData();
        formData.append('token', query.mdl_tkn as string)

        const { togglePopupFlag } = piniaPopup();
        const { setAlertValue } = piniaAlert();

        interface ICertResult {
            isAnotherCertified: boolean; // false일때만 isSuccess 보기 시작
            isSuccess: boolean; // false일때만 isMajorAge 보기 시작
            isMajorAge: boolean;
            isLogin: boolean; // Deprecated
        }

        var certResult: ICertResult | null = null;

        try {
            const data = await $serviceContentApiFetch<BasicRes>(`cert/response`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            // const isSuccess = data.status === 200 && data.data !== "fail";
            // const isLogin = isSuccess? true : data.status !== 401;
            // const isMajorAge = data.data === "major_age";
            // const isMajorAge = data.data === "minor_age";
            // const isAnotherCertified = data.data === "another_certified";

            if (data.data !== "fail") {
                if (data.data === "another_certified") {
                    certResult = {
                        isAnotherCertified: true,
                        isSuccess: false,
                        isMajorAge: false,
                        isLogin: true,
                    };
                } else {
                    certResult = {
                        isAnotherCertified: false,
                        isSuccess: true,
                        isMajorAge: true,
                        isLogin: true,
                    };
                }
            } else {
                certResult = {
                    isAnotherCertified: false,
                    isSuccess: false,
                    isMajorAge: false,
                    isLogin: true,
                };
            }

            messageWebview(`https://cosign/cert_complete?isMajorAge=${certResult.isMajorAge}&isSuccess=${certResult.isSuccess}&isLogin=${certResult.isLogin}&isAnotherCertified=${certResult.isAnotherCertified}`)
        } catch (err) {
            // certResult = {
            //     isAnotherCertified: false,
            //     isSuccess: false,
            //     isMajorAge: false,
            //     isLogin: false,
            // };
        }
      
  });
  </script>
  