import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dompurify from 'dompurify';
import NavBar from '../Home/Navbar/Navbar';

import LoadingButton from '@mui/lab/LoadingButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const AskSomething = () => {
    // sanitize HTML code from XSS issues
    const sanitizer = dompurify.sanitize;

    // for editor state saving
    const editorRef = useRef(null);
    const [editorPrev, setEditorPrev] = useState('');

    const [loadingEditor, setLoadingEditor] = useState();

    // previews the input text
    const handlePreview = () => {
        if (editorRef.current) {
            console.log('Prev', editorRef.current.getContent());
            setEditorPrev(editorRef.current.getContent());
        }
    };

    // submits the data and send for display in list
    const handleSubmit = () => {
        if (editorRef.current) {
            console.log('SUbmit', editorRef.current.getContent());
        }
    };

    const handleEditorChange = (content) => {
        console.log('changes', content);
    };

    useEffect(() => {});

    return (
        <div>
            <NavBar />
            <h2>Ask Something</h2>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="center"
                // alignItems="center"
            >
                {/* At loading time */}
                {!loadingEditor && (
                    <Stack
                        sx={{ width: '100%', color: 'grey.500' }}
                        spacing={2}
                    >
                        <LinearProgress color="secondary" />
                        <LinearProgress color="success" />
                        <LinearProgress color="inherit" />
                    </Stack>
                )}

                {/* After loading display the editor */}
                <Grid item xs={12} sm={7} md={8}>
                    <Box sx={{ minWidth: 205, marginBottom: '0.4em' }}>
                        {/* TinyMCE editor and its options. Return input data as HTML for rendering */}
                        <Editor
                            apiKey="t94r79b77u1fhubu2v7ah3fvhpid2gcapixv4d6ijkgg78o7"
                            onInit={(evt, editor) => {
                                editorRef.current = editor;
                                setLoadingEditor(1);
                            }}
                            initialValue="<p>This is the initial content of the question.</p>"
                            init={{
                                height: 500,
                                menubar: true,
                                // true for more options
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                    'image code',
                                ],
                                toolbar:
                                    'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help | image | code',

                                content_style:
                                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </Box>
                    {loadingEditor && (
                        <div>
                            <LoadingButton
                                color="secondary"
                                onClick={handlePreview}
                                loadingPosition="start"
                                startIcon={<RemoveRedEyeIcon />}
                                variant="outlined"
                                sx={{ margin: '0.5em' }}
                            >
                                Preview
                            </LoadingButton>
                            <LoadingButton
                                color="info"
                                onClick={handleSubmit}
                                loadingPosition="start"
                                endIcon={<DoneAllIcon />}
                                variant="contained"
                                sx={{ margin: '0.5em' }}
                            >
                                Submit
                            </LoadingButton>
                        </div>
                    )}
                </Grid>

                {/* Right hand side display for some navigation */}
                {loadingEditor && (
                    <Grid item xs={10} sm={4} lg={3}>
                        <Box sx={{ minWidth: 205, border: 2, height: 600 }}>
                            RIGHT SIDE NAV
                        </Box>
                    </Grid>
                )}
            </Grid>

            {/* Preview box for the input text, for checking look before posting */}
            <Box
                sx={{
                    minWidth: 205,
                    border: 2,
                    margin: '2em',
                    overflow: 'auto',
                }}
                height={{ xs: '50vw', md: '30vw' }}
            >
                <h3>Preview:</h3>
                <div
                    dangerouslySetInnerHTML={{ __html: sanitizer(editorPrev) }}
                />
            </Box>
        </div>
    );
};

export default AskSomething;
