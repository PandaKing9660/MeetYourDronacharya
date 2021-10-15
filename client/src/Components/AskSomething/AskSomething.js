import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dompurify from 'dompurify';

import LoadingButton from '@mui/lab/LoadingButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const AskSomething = () => {
    const sanitizer = dompurify.sanitize;
    const editorRef = useRef(null);
    const [editorPrev, setEditorPrev] = useState('');
    const [loadingEditor, setLoadingEditor] = useState();

    const handlePreview = () => {
        if (editorRef.current) {
            console.log('Prev', editorRef.current.getContent());
            setEditorPrev(editorRef.current.getContent());
        }
    };
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
            <h2>Ask Something</h2>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="center"
                // alignItems="center"
            >
                {!loadingEditor && <h1>Loading...</h1>}
                <Grid item xs={12} sm={7} md={8}>
                    <Box sx={{ minWidth: 205, marginBottom: '0.4em' }}>
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
                <Grid item xs={10} sm={4} lg={3}>
                    <Box sx={{ minWidth: 205, border: 2, height: 600 }}>
                        RIGHT SIDE NAV
                    </Box>
                </Grid>
            </Grid>
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
                {/* <div>{!editorPrev ? 'empty' : editorPrev}</div> */}
                <div
                    dangerouslySetInnerHTML={{ __html: sanitizer(editorPrev) }}
                />
            </Box>
        </div>
    );
};

export default AskSomething;
