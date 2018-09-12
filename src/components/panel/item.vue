
<template>
    <div class="item-panel">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <slot></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.item-panel {
    padding: 15px 20px;
    width: 100%;
    display: flex;
    // align-items: center;
    align-items: stretch;
    justify-content: space-between;
    font-size: 12px;
    box-sizing: border-box;

    &:not(:last-child) {
        @include border-bottom;
    }

    .middle {
        margin: 0 10px;
        flex: auto;
    }

    .left, .middle, .top {
        position: relative;
    }

}

</style>
