import { Component, Host, h, Prop } from '@stencil/core';
import { StepState } from '../../../utils/stepper';

@Component({
  tag: 'jpl-step-header',
  styleUrl: 'step-header.css',
  shadow: true
})
export class StepHeader {

  @Prop() state: StepState;

  @Prop() label: string;

  @Prop() errorMessage: string;

  @Prop() index: number;

  @Prop() selected: boolean;

  @Prop() active: boolean;

  @Prop() optional: boolean;

  _getDefaultTextForState(state: StepState): string {
    if (state == 'number') {
      return `${this.index + 1}`
    }

    if (state == 'edit') {
      return 'pencil'
    }

    if (state == 'error') {
      return 'alert'
    }

    if (state == 'done') {
      return 'checkmark'
    }

    return state;
  }

  _renderStateSwitch(state) {
    switch(state) {
      case 'number':
        return <span class="step-index">{this._getDefaultTextForState(state)}</span>
      default:
        return <ion-icon name={this._getDefaultTextForState(state)}></ion-icon>
    }
  }

  render() {

    return (
      <Host
        class={{
          'step-header': true,
          'focus-indicator': true,
          'horizontal-stepper-header': true
        }}
        role='tab'>
          <div class={`step-icon-state-${this.state} step-icon ${this.selected ? 'step-icon-selected' : ''}`}>
            <div class="step-icon-content">
              {this._renderStateSwitch(this.state)}
            </div>
          </div>
          <div class={{
            'step-label': true,
            'step-label-active': this.active,
            'step-label-selected': this.selected,
            'step-label-error': this.state == 'error'
          }}>
            <div class="step-text-label">{this.label}</div>
            { this.optional && this.state != 'error' ? <div class="step-optional">Optional</div> : null }
            { this.state == 'error' ? <div class="step-sub-label-error">{ this.errorMessage }</div> : null }
          </div>
      </Host>
    );
  }

}
