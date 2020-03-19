import { newE2EPage } from '@stencil/core/testing';

describe('jpl-horizontal-stepper', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jpl-horizontal-stepper></jpl-horizontal-stepper>');

    const element = await page.find('jpl-horizontal-stepper');
    expect(element).toHaveClass('hydrated');
  });
});
