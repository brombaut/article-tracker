<template>
  <div class="gauge">
    <div class="mask">
      <div class="semi-circle"></div>
      <div ref="progressBar" class="semi-circle--mask"></div>
    </div>
    <div class="gauge-info">
      <div class="primary-value">{{ parimeryValueLabel }}</div>
      <div class="secondary-value">{{ secondaryValueLabel }}</div>
      <div class="title">{{ gaugeData.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from "vue-property-decorator";
import GaugeData from "./GaugeData"

@Component
export default class ProgressGauge extends Vue {
  @Prop()
  gaugeData!: GaugeData;

  get parimeryValueLabel(): string | number {
    if (typeof this.gaugeData.primaryValue === "boolean") {
      return this.gaugeData.primaryValue ? "Yes" : "No";
    }
    return this.gaugeData.primaryValue;
  }

  get secondaryValueLabel(): string | number {
    if (typeof this.gaugeData.secondaryValue === "boolean") {
      return this.gaugeData.secondaryValue ? "Yes" : "No";
    }
    return this.gaugeData.secondaryValue;
  }

  @Watch("gaugeData")
  setProgressBar(): void {
    let percent: number;
    if (typeof this.gaugeData.primaryValue === "boolean" && typeof this.gaugeData.secondaryValue === "boolean") {
      percent = this.gaugeData.primaryValue ? 1 : 0;
    } else {
      percent = this.gaugeData.primaryValue / (this.gaugeData.primaryValue + this.gaugeData.secondaryValue);
    }
    const rotate = Math.floor(180 * percent);
    const progresEl = this.$el.querySelector(".semi-circle--mask") as HTMLDivElement;
    progresEl.style.transform = `rotate(${rotate}deg) translate3d(0,0,0)`;
  }

  mounted(): void {
    this.setProgressBar();
  }
}
</script>

<style lang='scss'>
.gauge {
  $baseFontSize: 16;

  @function rem($val) {
    @return #{$val / $baseFontSize}rem;
  }

  .gauge-info {
    position: relative;
    margin: 0 rem(20);
    margin-top: 4px;
    user-select: none;

    .primary-value {
      position: absolute;
      left: 0;
      width: 30px;
    }
    .secondary-value {
      position: absolute;
      right: 0;
      width: 30px;
      color: $secondaryLighter;
    }
    .title {
      z-index: 10;
      transform: translateY(-30px);
      font-weight: bold;
      font-size: 20px;
    }
  }

  .mask {
    position: relative;
    overflow: hidden;
    display: block;
    width: rem(200);
    height: rem(100);
    margin: rem(20);
    margin-bottom: 0;
    z-index: 0;
  }
  .semi-circle {
    position: relative;
    display: block;
    width: rem(200);
    height: rem(100);
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
    background: $primary;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 2;
      display: block;
      width: rem(140);
      height: rem(70);
      margin-left: rem(-70);
      background: $secondary;
      border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
    }
  }

  .semi-circle--mask {
    position: absolute;
    top: 0;
    left: 0;
    width: rem(200);
    height: rem(200);
    background: transparent;
    transform: rotate(0deg) translate3d(0, 0, 0);
    transform-origin: center center;
    backface-visibility: hidden;
    transition: all 0.3s ease-in-out;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0%;
      z-index: 2;
      display: block;
      width: rem(202);
      height: rem(102);
      margin: -1px 0 0 -1px;
      background: $secondaryLighter;
      border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
    }
  }

  &:hover {
    .title,
    .primary-value {
      color: $primaryBrightest;
    }
    .semi-circle {
      background: $primaryBrightest;
    }
  }
}
</style>
