import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';

const Editor = () => {
    const [alertMessage, setAlertMessage] = useState(''); // Alert message state
    const [showAlert, setShowAlert] = useState(false); // Show/hide alert state

    const editor = useEditor({
        extensions: [StarterKit],
        content: localStorage.getItem('editorContent') || '<p>Welcome to Tiptap Editor!</p>',
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            localStorage.setItem('editorContent', content);
        },
    });

    if (!editor) {
        return null;
    }

    // Function to check selection and show alert
    const handleButtonClick = (action) => {
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );

        if (!selectedText.trim()) {
            // No text selected, show alert
            setAlertMessage(`😂Please select some text first, then use'${action}'😂`);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
            return;
        }

        // Perform the action if text is selected
        switch (action) {
            case 'Bold':
                editor.chain().focus().toggleBold().run();
                break;
            case 'Italic':
                editor.chain().focus().toggleItalic().run();
                break;
            case 'Strike':
                editor.chain().focus().toggleStrike().run();
                break;
            default:
                break;
        }
    };

    return (
        <Box
            sx={{
                maxWidth: '1000px',
                margin: '20px auto',
                padding: '0 20px',
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Responsive Tiptap Editor
            </Typography>
            <Paper
                elevation={3}
                sx={{
                    padding: '16px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                {/* Alert */}
                {showAlert && (
                    <Alert
                        severity="info"
                        sx={{
                            marginBottom: '16px',
                            backgroundColor: '#fef4e9',
                            color: '#874d00',
                            fontWeight: 'bold',
                        }}
                    >
                        {alertMessage}
                    </Alert>
                )}

                {/* Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        '@media (max-width: 600px)': {
                            flexDirection: 'column',
                            alignItems: 'center',
                        },
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleButtonClick('Bold')}
                        sx={{
                            minWidth: '100px',
                            '@media (max-width: 600px)': {
                                width: '100%',
                            },
                        }}
                    >
                        Bold
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleButtonClick('Italic')}
                        sx={{
                            minWidth: '100px',
                            '@media (max-width: 600px)': {
                                width: '100%',
                            },
                        }}
                    >
                        Italic
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleButtonClick('Strike')}
                        sx={{
                            minWidth: '100px',
                            '@media (max-width: 600px)': {
                                width: '100%',
                            },
                        }}
                    >
                        Strike
                    </Button>
                </Box>

                {/* Editor Content */}
                <EditorContent
                    editor={editor}
                    style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '12px',
                        minHeight: '200px',
                        textAlign: 'left',
                        backgroundColor: '#fff',
                        fontSize: '16px',
                        '@media (max-width: 600px)': {
                            fontSize: '14px',
                        },
                    }}
                />
            </Paper>
        </Box>
    );
};

export default Editor;