<template>
    <div :id="id" class="tradingview-widget-container" ref="container">
    </div>
</template>

<script>
export default {
    props: ['coinCode', 'id'],
    data() {
        return {
            widget: null,
            options: {
                symbol: `UPBIT:${this.coinCode}KRW`,
                chartOnly: false,
                width: 0,
                interval: 5,
                timezone: "Asia/Seoul",
                "locale": "kr",
                "colorTheme": "light",
                "theme": "light",
                "gridLineColor": "rgba(240, 243, 250, 0)",
                "fontColor": "#787B86",
                "isTransparent": true,
                "autosize": false,
                "showVolume": true,
                "scalePosition": "right",
                "scaleMode": "Normal",
                "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
                "noTimeScale": false,
                "valuesTracking": "1",
                "chartType": "candlesticks",
                "color": "rgba(144, 191, 249, 1)",
                "upColor": "#22ab94",
                "downColor": "#f7525f",
                "borderUpColor": "#22ab94",
                "borderDownColor": "#f7525f",
                "wickUpColor": "#22ab94",
                "wickDownColor": "#f7525f"
            },
            isMounted: false
        }
    },
    watch: {
        coinCode(val) {
            if(this.isMounted) {
                this.options.symbol = `UPBIT:${val}KRW`;
                this.options.width = this.$refs.container.offsetWidth;
                this.widget = new window.TradingView.widget(
                    Object.assign({ container_id: this.$refs.container.id }, this.options)
                );
            }
        },
    },
    mounted() {
        this.options.width = this.$refs.container.offsetWidth;

        this.widget = new window.TradingView.widget(
            Object.assign({ container_id: this.$refs.container.id }, this.options)
        );
        this.isMounted = true;
    }
}
</script>

<style lang="scss">
    .tradingview-widget-container {
        margin-top: 30px;
    }
</style>