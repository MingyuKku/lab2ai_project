<template>
    <div class="container"></div>
  </template>
  
  <script setup lang="ts">
    import type { BasicRes } from "~/composables/_api/_types";
    import { piniaAlert } from "~/pinia/popup/piniaAlert";
    import { piniaPopup } from "~/pinia/popup/piniaPopup";
    
    onMounted(async () => {
        const { $serviceContentApiFetch } = useNuxtApp();
        const { query } = useRoute(); 

        let formData = new FormData();
        formData.append('token', query.mdl_tkn as string)

        const { togglePopupFlag } = piniaPopup();
        const { setAlertValue } = piniaAlert();

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

            console.log("response", data);
            alert("what?");
            if (data.data !== "fail") {
                if (data.data === "another_certified") {
                    togglePopupFlag(true);
                    setAlertValue({
                        description: '이미 다른 계정에서 인증을 받았습니다.',
                        buttons: {
                            center: {
                                type: 'OK',
                                label: '확인',
                                onClick: () => {

                                }
                            }
                        }
                    })
                } else {
                    togglePopupFlag(true);
                    setAlertValue({
                        description: '휴대폰 인증이 성공하였습니다.',
                        buttons: {
                            center: {
                                type: 'OK',
                                label: '확인',
                                onClick: () => {

                                }
                            }
                        }
                    })
                }
            } else {
                togglePopupFlag(true);
                setAlertValue({
                    description: '휴대폰 인증에 실패하였습니다.',
                    buttons: {
                        center: {
                            type: 'OK',
                            label: '확인',
                            onClick: () => {
                                
                            }
                        }
                    }
                })
            }
        
        } catch (err) {
            togglePopupFlag(true);
            setAlertValue({
                description: '휴대폰 인증에 실패하였습니다.',
                buttons: {
                    center: {
                        type: 'OK',
                        label: '확인',
                        onClick: () => {
                            
                        }
                    }
                }
            })
        }
      
  });
  </script>
  