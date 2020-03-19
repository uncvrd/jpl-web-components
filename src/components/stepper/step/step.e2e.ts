import { newE2EPage } from '@stencil/core/testing';

describe('jpl-step', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jpl-step></jpl-step>');

    const element = await page.find('jpl-step');
    expect(element).toHaveClass('hydrated');
  });
});
