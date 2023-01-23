import type { Meta, StoryObj } from '@storybook/react';
import { Header as PageHeader } from 'ui';

const meta = {
  
  title: 'Portal/Header',
  component: PageHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main page header',
        
      },
    }    
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;


export const PageHeaders: Story = {
  args: {
    title: "Title",
  },

};
