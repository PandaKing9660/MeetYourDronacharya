import React, {useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import dompurify from 'dompurify';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const EditorAndPreview = ({option, question_id}) => {
  // sanitize HTML code from XSS issues
  const sanitizer = dompurify.sanitize;

  // for editor state saving
  const editorRef = useRef (null);
  const [editorPrev, setEditorPrev] = useState ('');

  const [loadingEditor, setLoadingEditor] = useState ();
  const [title, setTitle] = useState ('');
  const user = JSON.parse (localStorage.getItem ('profile'));

  // previews the input text
  const handlePreview = () => {
    if (editorRef.current) {
      setEditorPrev (editorRef.current.getContent ());
    }
  };

  // submits the data and send for display in list
  const handleSubmit = () => {
    console.log (option);
    if (editorRef.current && editorRef.current.getContent ()) {
      if (option === 'question') {
        axios
          .post ('http://localhost:3001/ask-something/question/add', {
            by: user._id,
            title: title,
            question: editorRef.current.getContent (),
          })
          .then (res => {
            console.log (res.data);
          })
          .catch (err => console.log (err));
      } else if (option === 'answer') {
        axios
          .post ('http://localhost:3001/ask-something/answer/add', {
            by: user._id,
            title: title,
            to: question_id,
            answer: editorRef.current.getContent (),
          })
          .then (res => {
            console.log (res.data);
          })
          .catch (err => console.log (err));
      } else if (option === 'experience') {
        axios
          .post ('http://localhost:3001/experience/add', {
            by: user._id,
            title: title,
            experience: editorRef.current.getContent (),
          })
          .then (res => console.log (res.data))
          .catch (err => console.log (err));
      }
    }
  };

  const findLabel = () => {
    if (option === 'question') {
      return 'What is your question ?';
    } else if (option === 'answer') {
      return 'Title of your answer';
    } else if (option === 'experience') {
      return 'Title for your experience';
    }
  };

  const findPlaceholder = () => {
    if (option === 'question') {
      return 'Please provide all the information experts would need to answer your question here...';
    } else if (option === 'answer') {
      return 'Please explain your answer in detail';
    } else if (option === 'experience') {
      return 'Please mention your experience here';
    }
  };
  return (
    <Grid
      container
      // columnSpacing={{ xs: 1 }}
      justifyContent="space-around"
      alignItems="center"
    >
      {/* At loading time */}
      {!loadingEditor &&
        <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
          <h4>Editor Loading...</h4>
          <LinearProgress color="secondary" />
          <LinearProgress color="success" />
          <LinearProgress color="inherit" />
        </Stack>}

      {/* After loading display the editor */}
      <Grid item xs={12} sm={7} md={7}>
        <TextField
          label={findLabel ()}
          color="info"
          // focused
          fullWidth
          value={title}
          required
          onChange={e => setTitle (e.target.value)}
        />
        <Box
          sx={{
            minWidth: 205,
            marginBottom: '0.4em',
            marginTop: '0.4em',
          }}
        >
          {/* TinyMCE editor and its options. Return input data as HTML for rendering */}
          <Editor
            apiKey="t94r79b77u1fhubu2v7ah3fvhpid2gcapixv4d6ijkgg78o7"
            onInit={(evt, editor) => {
              editorRef.current = editor;
              setLoadingEditor (1);
            }}
            // initialValue="<p>Some initial text.</p>"
            init={{
              height: 440,
              menubar: true,
              // true for more options
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
                'image code',
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help | image | code',

              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              placeholder: findPlaceholder (),
            }}
          />
        </Box>
        {loadingEditor &&
          <div>
            <LoadingButton
              color="secondary"
              onClick={handlePreview}
              loadingPosition="start"
              startIcon={<RemoveRedEyeIcon />}
              variant="outlined"
              sx={{margin: '0.5em'}}
            >
              Preview
            </LoadingButton>
            <LoadingButton
              color="info"
              onClick={handleSubmit}
              loadingPosition="start"
              endIcon={<DoneAllIcon />}
              variant="contained"
              sx={{margin: '0.5em'}}
            >
              Submit
            </LoadingButton>
          </div>}
      </Grid>

      {/* Right hand side display for some navigation */}
      {loadingEditor &&
        <Grid item xs={10} sm={4} md={10}>
          {/* Preview box for the input text, for checking look before posting */}
          <Box
            sx={{
              minWidth: 205,
              // maxWidth: 600,
              border: '1px solid #bdc1c5',
              marginBottom: '12px',
              overflow: 'auto',
            }}
            height={{xs: '50vw', md: 545}}
          >
            <Typography
              variant="h5"
              sx={{
                borderBottom: '1px solid #bdc1c5',
                paddingTop: '3px',
                paddingBottom: '4px',
              }}
            >
              {' '}
              Preview:{' '}
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizer (editorPrev),
              }}
              style={{padding: '1%'}}
            />
          </Box>
        </Grid>}
    </Grid>
  );
};

export default EditorAndPreview;
