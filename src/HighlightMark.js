import { Mark } from '@tiptap/core';

const HighlightMark = Mark.create({
    name: 'highlight',

    addAttributes() {
        return {
            color: {
                default: 'yellow',
            },
        };
    },

    parseHTML() {
        return [
            {
                style: 'background-color',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', { style: `background-color: ${HTMLAttributes.color}` }, 0];
    },

    addCommands() {
        return {
            setHighlight: (color) => ({ commands }) => {
                return commands.setMark('highlight', { color });
            },
            unsetHighlight: () => ({ commands }) => {
                return commands.unsetMark('highlight');
            },
        };
    },
});

export default HighlightMark;