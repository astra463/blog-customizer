import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;
const [formVisible, setFormVisible] = useState(false);

const toggleFormVisability = () => setFormVisible(!formVisible);

export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButton onClick={toggleFormVisability} isOpen={formVisible} />
			</>
		);
	},
};
