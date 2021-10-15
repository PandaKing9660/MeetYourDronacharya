import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Grid from '@mui/material/Grid';

const AskSomething = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const [loadingEditor, setLoadingEditor] = useState(0);
    return (
        <div>
            Ask Something
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="center"
                alignItems="center"
            >
                {!loadingEditor && <h1>Loading...</h1>}
                <Grid item xs={12} sm={7} md={8}>
                    <Editor
                        apiKey="t94r79b77u1fhubu2v7ah3fvhpid2gcapixv4d6ijkgg78o7"
                        onInit={(evt, editor) => {
                            editorRef.current = editor;
                            setLoadingEditor(1);
                            console.log('hiii');
                        }}
                        initialValue="<p>This is the initial content of the question.</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                                'image',
                            ],
                            toolbar:
                                'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | image',

                            content_style:
                                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                    />
                    {loadingEditor && (
                        <button onClick={log}>Log editor content</button>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default AskSomething;
