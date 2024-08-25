'use client';

import { Box, Button, Stack, TextField, IconButton } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Transcript() {
    const [transcript, setTranscript] = useState([
        { id: 1, text: 'This is a part of the sales transcript.', comments: [] },
        // Add more transcript segments as needed
    ]);

    const [selectedComment, setSelectedComment] = useState('');
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const addComment = async (segmentId) => {
        if (!selectedComment.trim()) return;

        const updatedTranscript = transcript.map((segment) =>
            segment.id === segmentId
                ? {
                      ...segment,
                      comments: [...segment.comments, { id: Date.now(), text: selectedComment }],
                  }
                : segment
        );
        setTranscript(updatedTranscript);
        setSelectedComment('');
    };

    const editComment = (segmentId, commentId, newText) => {
        const updatedTranscript = transcript.map((segment) =>
            segment.id === segmentId
                ? {
                      ...segment,
                      comments: segment.comments.map((comment) =>
                          comment.id === commentId ? { ...comment, text: newText } : comment
                      ),
                  }
                : segment
        );
        setTranscript(updatedTranscript);
    };

    const deleteComment = (segmentId, commentId) => {
        const updatedTranscript = transcript.map((segment) =>
            segment.id === segmentId
                ? {
                      ...segment,
                      comments: segment.comments.filter((comment) => comment.id !== commentId),
                  }
                : segment
        );
        setTranscript(updatedTranscript);
    };

    const generateSummary = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transcript),
            });

            const summary = await response.json();
            console.log(summary); // Display summary in your UI
        } catch (error) {
            console.error('Error generating summary:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'} bgcolor="#1E1E1E">
            <Box width="80%" height="80vh" p={2} bgcolor="#2D2D2D" color="white" borderRadius={4}>
                {transcript.map((segment) => (
                    <Box key={segment.id} p={2} borderBottom="1px solid #3C3C3C">
                        <Box>{segment.text}</Box>
                        <Stack direction="row" spacing={1} mt={1}>
                            {segment.comments.map((comment) => (
                                <Box key={comment.id} display="flex" alignItems="center">
                                    <Box p={1} bgcolor="#007ACC" borderRadius={4} mr={1}>
                                        {comment.text}
                                    </Box>
                                    <IconButton onClick={() => editComment(segment.id, comment.id, prompt('Edit Comment', comment.text))}>
                                        <EditIcon style={{ color: 'white' }} />
                                    </IconButton>
                                    <IconButton onClick={() => deleteComment(segment.id, comment.id)}>
                                        <DeleteIcon style={{ color: 'white' }} />
                                    </IconButton>
                                </Box>
                            ))}
                        </Stack>
                        <Stack direction="row" spacing={2} mt={2}>
                            <TextField
                                label="Add a comment"
                                fullWidth
                                value={selectedComment}
                                onChange={(e) => setSelectedComment(e.target.value)}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{
                                    style: { color: 'white' },
                                    disableUnderline: true,
                                    style: { backgroundColor: '#3C3C3C', borderRadius: 4, padding: '10px' },
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={() => addComment(segment.id)}
                                style={{ backgroundColor: '#007ACC', color: 'white' }}
                            >
                                Add Comment
                            </Button>
                            <IconButton>
                                <AttachFileIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Stack>
                    </Box>
                ))}
                <Button
                    variant="contained"
                    onClick={generateSummary}
                    disabled={isLoading}
                    style={{ backgroundColor: '#007ACC', color: 'white', marginTop: '20px' }}
                >
                    {isLoading ? 'Generating Summary...' : 'Generate Summary'}
                </Button>
            </Box>
        </Stack>
    );
}
