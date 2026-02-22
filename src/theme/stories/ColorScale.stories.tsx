import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  getAllCSSVariablesWithPrefix,
  getGroupedColorTokenScales,
  SEMANTIC_TOKENS,
  splitSemanticColors,
  type ColorVar,
} from '../../utils';

const meta = {
  title: 'Tokens/Colors',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ColorScale: Story = {
  render: () => {
    const allColors = getAllCSSVariablesWithPrefix('--color');
    const { base } = splitSemanticColors(allColors as ColorVar[]);
    const groupedColors = getGroupedColorTokenScales(base);

    console.log({ groupedColors });

    return <h1>Hello</h1>;
  },
};
