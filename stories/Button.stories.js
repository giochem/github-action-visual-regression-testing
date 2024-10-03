import '@crowdstrike/glide-core/button.js';
import { html, nothing } from 'lit';

export default {
  title: 'Button',
  tags: ['autodocs'],
  args: {
    'slot="default"': 'Button',
    disabled: false,
    variant: 'primary',
    size: 'large',
  },
  render: (args) =>
    html` <glide-core-button
      size=${args.size}
      variant=${args.variant}
      ?disabled=${args.disabled || nothing}
    >
      ${args['slot="default"']}
    </glide-core-button>`,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary'],
      table: {
        defaultValue: {
          summary: '"primary"',
        },
        type: { summary: '"primary" | "secondary" | "tertiary"' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'small'],
      table: {
        defaultValue: {
          summary: '"large"',
        },
        type: { summary: '"large" | "small"' },
      },
    },
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
    },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
  },
};
