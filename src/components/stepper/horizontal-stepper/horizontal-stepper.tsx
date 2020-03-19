import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'jpl-horizontal-stepper',
  styleUrl: 'horizontal-stepper.css',
  shadow: true
})
export class HorizontalStepper {

  @Element() el: HTMLElement;

  componentDidLoad() {
    const slot = this.el.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', () => this.updateIndexes());
    this.updateIndexes();
  }

  updateIndexes() {
    const slot = this.el.shadowRoot.querySelector('slot');
    const nodes = slot.assignedElements({ flatten: true }).filter((element) => element.nodeName == "JPL-STEP");
    let index = 0;
    nodes.map((step: HTMLJplStepElement, i, stepArray) => {
      step.index = index++;
      if (i == 0) {
        step.isFirst = true;
      }
      if (i == (stepArray.length - 1)) {
        step.isLast = true;
      }
    });
  }

  render() {
    return (
      <Host class="stepper-horizontal">
        <div class="horizontal-stepper-header-container">
          <slot></slot>
        </div>
      </Host>
    );
  }

}
