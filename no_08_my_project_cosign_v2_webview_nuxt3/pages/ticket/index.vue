<template>
    <div class="ticket-info-page pt-app-header bg-bg-gray-04 min-h-viewScreen">
        <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                  <CommonHeadersBackHeaderIcon />
                </div>
            </template>
        </CommonHeadersAppHeader>
        <section>
            <div class="title py-2.5 text-center bg-bg-white">
                <div class="flex justify-center items-center text-[22px] font-bold">
                <div class="pt-[4px] mr-1">
                    <img src="https://kr.object.ncloudstorage.com/cosign/version1/aimodel/sign.png" 
                    class="w-[59px] h-[25px]"/>
                </div>
                이용권
                </div>

                <div class="flex flex-col items-center mt-[9px] font-medium text-[14px]">
                <div>
                    지금 이용권 구매하고
                </div>
                <div>
                    AI SIGN을 무제한으로 이용하세요.
                </div>
                </div>

                <div class="flex justify-around items-stretch h-[38px] mt-[26px] text-[14px]">
                <div class="flex-1 pt-[8px] pb-[12px] cursor-pointer" @click="selectedTabMenu = 'subscribe'"
                    :class="(selectedTabMenu === 'subscribe')? 'bg-bg-white text-font-black font-bold border-t-2 border-border-gray-03': 'bg-border-gray-03 text-font-dark-02'">
                    정기 구독권
                </div>
                <div class="flex-1 pt-[8px] pb-[12px] cursor-pointer" @click="selectedTabMenu = '30d'"
                    :class="(selectedTabMenu === '30d')? 'bg-bg-white text-font-black font-bold border-t-2 border-border-gray-03': 'bg-border-gray-03 text-font-dark-02'">
                    30일 이용권
                </div>
                </div>

                <div class="flex flex-col items-stretch px-[16px] py-[20px] rounded-[8px] border-[1.5px] mx-[16px] my-[16px] relative shadow-[0_4px_8px_0_#ECEEF2]" 
                    v-for="ticket, idx in tabMap.get(selectedTabMenu)" :key="idx"
                    :class="ticket.isPrimary? 'border-ruddy bg-[#FEF4F4]': 'border-border-gray-03'"
                    @click="clickTicket">
                    <div class="absolute bg-gradient-to-r from-[#F33652] to-[#FF835C] right-0 top-0 rounded-bl-[8px] rounded-tr-[5px] text-font-white px-[14px] pt-[4px] pb-[6px] text-[14px]"
                    v-if="ticket.isPrimary">
                    <!-- #F33652, #FF835C -->
                    최대 혜택
                    </div>

                <div class="flex mb-[12px] items-center">
                    <div class="bg-black text-[#F2D077] px-[6px] pt-[2px] pb-[4px] rounded text-[14px]" v-if="ticket.isPremium">
                    프리미엄
                    </div>
                    <div class="bg-[#F0F0F0] text-font-black px-[6px] pt-[2px] pb-[4px] rounded text-[14px]" v-else>
                    베이직
                    </div>
                    <div class="font-medium ml-[4px]">
                    {{ ticket.title }}
                    </div>
                </div>
                <div class="font-bold text-position-short text-[24px] text-left" v-if="ticket.isPrimary && ticket.discountPercentage">
                    {{ ticket.discountPercentage }}% 할인
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                    <div class="font-bold mr-[5px]">
                        <span v-if="selectedTabMenu === 'subscribe'">월</span>
                        {{ ticket.discountPrice?.toLocaleString() ?? ticket.basePrice.toLocaleString() }} 원
                    </div>
                    <div class="text-font-dark-03 text-[12px] line-through" v-if="ticket.discountPrice">
                        정상가
                        <span v-if="selectedTabMenu === 'subscribe'">월</span> 
                        {{ ticket.basePrice.toLocaleString() }}원
                    </div>
                    </div>
                    <div class="bg-mint text-font-white rounded px-[11px] pt-[3px] pb-[5px] text-[12px]">
                    구매하기
                    </div>
                </div>
                </div>
            </div>
            <div class="flex flex-col p-primary">
                <div class="text-font-dark-03 text-[12px] mb-[8px]">
                    이용안내
                </div>
                <ul class="text-font-dark-03 text-[10px]">
                    <li v-for="text, idx in info_texts" :key="idx"
                    class="flex items-start mb-[4px]">
                    <div class="w-[4px] pt-[6px] mr-[4px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                            <circle cx="2" cy="2" r="2" fill="#9B9B9B"/>
                        </svg>
                    </div>
                    {{ text }}
                    </li>
                </ul>
                </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { piniaPopup } from '~/pinia/popup/piniaPopup';



interface TicketInfo {
    title: string;
    isPremium: boolean;
    isPrimary: boolean;
    basePrice: number;
    discountPrice?: number;
    discountPercentage?: number;
  }
//   const { setTicketPopupFlag } = usePiniaTicketPopup();
//   const { modalShow } = usePiniaModal();

const clickTicket = () => {
  piniaPopup().toggleAppDownloadPopupFlag(true);
}

  declare type TabMenu = 'subscribe' | '30d';

  const selectedTabMenu = ref<TabMenu>('subscribe');

  const tabMap: Map<TabMenu, TicketInfo[]> = new Map(
    [
      ['subscribe', [
        {
          title: '선물+현물 SIGN',
          isPremium: true,
          isPrimary: true,
          basePrice: 72000,
          discountPrice: 46500,
          discountPercentage: 35
        },
        {
          title: '현물 SIGN',
          isPremium: false,
          isPrimary: false,
          basePrice: 18000,
          discountPrice: 12500
        },
      ]],
      ['30d', [
        {
          title: '선물+현물 SIGN',
          isPremium: true,
          isPrimary: false,
          basePrice: 72000,
        },
        {
          title: '현물 SIGN',
          isPremium: false,
          isPrimary: false,
          basePrice: 18000,
        },
      ]]
    ]
  )

  const info_texts = [
    '이용권은 부가세(VAT) 포함 가격입니다.',
    '이용권 가격과 기능/혜택은 변경될 수 있습니다.',
    '모든 이용권은 결제와 동시에 서비스가 개시되므로 환불이 원칙적으로 불가능하며, 상세한 환불 규정은 각(Google, Apple) 앱스토어의 결제 정책에 따릅니다.',
    '정기결제는 1개월을 주기로 최초 구매한 날과 동일한 날짜에 자동 결제되며, 해당월에 동일한 날짜가 없을 경우 말일에 결제됩니다.',
    '정기결제는 이용기간 중 언제든지 각 앱스토어를 통해 자동 결제를 해지(취소)할 수 있습니다. 해지를 할 경우 결제월의 이용기간까지는 정상적으로 서비스 이용이 가능합니다.'
  ]



</script>