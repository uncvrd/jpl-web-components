import { newE2EPage } from '@stencil/core/testing';

describe('jpl-step-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jpl-step-header></jpl-step-header>');

    const element = await page.find('jpl-step-header');
    expect(element).toHaveClass('hydrated');
  });
});
