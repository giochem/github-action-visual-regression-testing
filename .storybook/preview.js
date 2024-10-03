/** @type { import('@storybook/web-components').Preview } */
import '@crowdstrike/glide-core/styles/fonts.css';
import '@crowdstrike/glide-core/styles/variables.css';

import { create } from '@storybook/theming/create';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      canvas: {
        sourceState: 'shown',
      },
      theme: create({
        base: 'light',
        fontBase: '"Nunito", sans-serif',
        fontCode: 'monospace',
      }),
    },
  },
};

export default preview;
