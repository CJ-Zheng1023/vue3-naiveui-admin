<template>
  <div :class="['card', { bordered: bordered }, { full: full }]">
    <div :class="['card-header', { bordered: headerBordered }]" v-if="$slots.caption || $slots.actions">
      <div class="card-caption">
        <slot name="caption"></slot>
      </div>
      <div class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="card-body" :style="bodyStyle">
      <slot></slot>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  headerBordered: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: false
  },
  full: {
    type: Boolean,
    default: false
  },
  bodyStyle: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped lang="less">
@gutter: 16px;
.card{
  background-color: var(--bgColor);
  border-radius: 8px;
  box-shadow: 0px 0px 20px 0px rgba(76, 87, 125, 0.02);
  &.bordered{
    border: 1px solid var(--borderColor);
  }
  &.full{
    height: 100%;
    display: flex;
    flex-flow: column;
    .card-header{
      flex-shrink: 0;
    }
    .card-body{
      flex-grow: 1;
      overflow: hidden;
    }
    .card-footer{
      flex-shrink: 0;
    }
  }
  .card-header{
    padding: @gutter @gutter 0 @gutter;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // flex-wrap: wrap;
    &.bordered{
      border-bottom: 1px solid var(--borderColor);
      padding-bottom: @gutter;
    }
    .card-caption{
      color: var(--color);
      font-size: 18px;
      font-weight: 600;
      flex-grow: 1;
      overflow: hidden;
    }
    .card-actions{
      flex-shrink: 0;
    }
  }
  .card-body{
    padding: @gutter;
    position: relative;
  }
  .card-footer{
    padding: 0 @gutter @gutter @gutter;
  }
}
</style>