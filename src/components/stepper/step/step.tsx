import { Component, Host, h, Element, Prop, Listen } from "@stencil/core";
import { StepState } from "../../../utils/stepper";

@Component({
  tag: "jpl-step",
  styleUrl: "step.css",
  shadow: true,
})
export class Step {
  /** Pass a URL the step should route to (this route is added to an href in an anchor tag)
   *  For example, say we have a url: https://jpl.nasa.gov
   *  For step one we need to pass the `route` attribute: https://jpl.nasa.gov/form/step1
   *  For step two: https://jpl.nasa.gov/form/step2
   *
   *  If you do not add a route attribute, the step will not be active
   *  So this is a good way of preventing users from skipping steps
   */
  @Prop() route: string;

  /** Internal property that displays the step number IF no `state` is added */
  @Prop() index: number = -1;

  /** Plain text label of the step */
  @Prop() label: string;

  /** Current state of the step. Defaults to 'number'.
   *  Available states are:
   *  - number (default)
   *  - edit (displays pencil icon)
   *  - done (displays checkmark icon)
   *  - error (displays warning icon)
   *
   *  This property can also intake any Ionicon icon name instead.
   *  For example, add the ionicon "add" icon to show a (+) icon
   */
  @Prop() state: StepState = "number";

  /** Syntactically displays a text underneath the label which says "Optional" */
  @Prop() optional: boolean;

  /** If there was an error, you can display an error message under the step */
  @Prop() errorMessage: string;

  /** Internal property to check if this step is the first step */
  @Prop() isFirst: boolean;

  /** Internal property to check if this step is the last step */
  @Prop() isLast: boolean;

  @Element() el: HTMLJplStepElement;

  @Prop() component: "button" | "anchor" = "anchor";

  /** Values used if the component is set as type "button" */
  @Prop() name: string;

  @Prop() value: string;

  @Listen('click')
  onClick(event: Event) {
    const form = this.el.closest('form');
    if (form) {
      event.preventDefault();
      const fakeSubmit = document.createElement('button');
      fakeSubmit.type = 'submit';
      fakeSubmit.style.display = 'none';
      fakeSubmit.name = this.name;
      fakeSubmit.value = this.value;
      form.appendChild(fakeSubmit);
      fakeSubmit.click();
      fakeSubmit.remove();
    }
  }

  render() {

    let header = (
      <jpl-step-header
        class={{
          "is-first-header": this.isFirst,
          "is-last-header": this.isLast,
        }}
        index={this.index}
        label={this.label}
        state={this.state}
        selected={window.location.pathname == this.route}
        active={this.route != null}
        optional={this.optional}
        errorMessage={this.errorMessage}
      ></jpl-step-header>
    );

    let element;

    if (this.component == "anchor") {
      element = <a href={this.route}>{header}</a>
    } else {
      element = <button type="submit" name={this.name} value={this.value}>{header}</button>
    }

    const elements = [
      element
    ];

    if (!this.isLast) {
      elements.push(<div class="stepper-horizontal-line"></div>);
    }

    return (
      <Host
        class={{
          "is-last-step": this.isLast,
        }}
      >
        {elements}
      </Host>
    );
  }
}
