import React, {useRef, useState, useEffect} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import axios from 'axios';

import {TextField, Grid, Box, Typography, Stack} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

import CardQuestion from './CardQuestion';

const subjects = [
  {title: 'CAT'},
  {title: 'UPSC'},
  {title: 'JEE'},
  {title: 'Others'},
];

const EditorAndPreview = ({option, question_id, edit}) => {
  // if edit is 1 them, it opens an edit modal with already written details
  // for editor state saving
  const editorRef = useRef (null);
  const [editorPrev, setEditorPrev] = useState ('');

  const [loadingEditor, setLoadingEditor] = useState ();
  const [title, setTitle] = useState ('');
  const [description, setDescription] = useState ('');
  const [tags, setTags] = useState (['meetyourdronacharya']);
  const user = JSON.parse (localStorage.getItem ('profile'));

  const [quesData, setQuesData] = useState ({
    title: 'Title',
    question: 'description',
    by: '',
    time: '',
    answers: [],
    liked: [],
    disliked: [],
    userName: '',
    userImage: 'https://robohash.org/dacarpas',
  });

  // Initialising the size of the fonts.
  let smSize1, smSize2;
  if (option === 'answer') {
    smSize1 = 4.5;
    smSize2 = 3;
  } else {
    smSize1 = 7;
    smSize2 = 4.5;
  }

  // previews the input text
  const handlePreview = () => {
    if (editorRef.current) {
      setQuesData ({
        ...quesData,
        title: title,
        question: editorRef.current.getContent (),
      });
      setEditorPrev (editorRef.current.getContent ());
    }
  };

  const handleTagChange = (event, value) => {
    setTags (value);
  };

  // submits the data and send for display in list, delete and edit backend
  const handleSubmit = () => {
    if (editorRef.current && editorRef.current.getContent ()) {
      if (option === 'question') {
        axios
          .post (
            `${process.env.REACT_APP_BACKEND_URL}/ask-something/question/add`,
            {
              by: user._id,
              title: title,
              question: editorRef.current.getContent (),
              tags: tags,
            }
          )
          .then (res => {
            axios.put (
              `${process.env.REACT_APP_BACKEND_URL}/dashboard/add-question`,
              {
                userId: user._id,
                questionId: res.data._id,
              }
            );
            window.location.reload ();
          })
          .catch (err => console.log (err));
      } else if (option === 'answer') {
        if (!edit) {
          axios
            .post (
              `${process.env.REACT_APP_BACKEND_URL}/ask-something/answer/add`,
              {
                by: user._id,
                title: title,
                to: question_id,

                tags: tags,
                answer: editorRef.current.getContent (),
              }
            )
            .then (res => {
              axios.put (
                `${process.env.REACT_APP_BACKEND_URL}/dashboard/add-answer`,
                {
                  userId: user._id,
                  answerId: res.data._id,
                }
              );

              window.location.reload ();
            })
            .catch (err => console.log (err));
        } else {
          axios.post (
            `${process.env.REACT_APP_BACKEND_URL}/ask-something/answer/editAns`,
            {
              experienceId: question_id,
              title: title,
              tags: tags,
              answer: editorRef.current.getContent (),
            }
          );
          window.location.reload ();
        }
      } else if (option === 'experience') {
        if (!edit) {
          axios
            .post (`${process.env.REACT_APP_BACKEND_URL}/experience/add`, {
              by: user._id,
              title: title,
              tags: tags,
              experience: editorRef.current.getContent (),
            })
            .then (res => {
              axios.put (
                `${process.env.REACT_APP_BACKEND_URL}/dashboard/add-experience`,
                {
                  userId: user._id,
                  experienceId: res.data._id,
                }
              );

              window.location.reload ();
            })
            .catch (err => console.log (err));
        } else {
          axios.post (
            `${process.env.REACT_APP_BACKEND_URL}/experience/editExp`,
            {
              experienceId: question_id,
              title: title,
              tags: tags,
              experience: editorRef.current.getContent (),
            }
          );
          window.location.reload ();
        }
      }
    }
  };

  // Initializing the Heading
  const findLabel = () => {
    if (option === 'question') {
      return 'What is your question ?';
    } else if (option === 'answer') {
      return 'Title of your answer';
    } else if (option === 'experience') {
      return 'Title for your experience';
    }
  };

  // Initializing Title
  const findPlaceholder = () => {
    if (option === 'question') {
      return 'Please provide all the information experts would need to answer your question here...';
    } else if (option === 'answer') {
      return 'Please explain your answer in detail';
    } else if (option === 'experience') {
      return 'Please mention your experience here';
    }
  };

  // used to fetch the title,description,tags while edit mode
  useEffect (() => {
    if (edit === 'true' && option === 'experience') {
      axios
        .post (`${process.env.REACT_APP_BACKEND_URL}/experience/fetchtitle`, {
          experienceId: question_id,
        })
        .then (res => {
          setTitle (res.data.title);
          setDescription (res.data.experience);
          setTags (res.data.tags);
        })
        .catch (err => console.log (err));
    } else if (edit === 'true' && option === 'answer') {
      axios
        .post (
          `${process.env.REACT_APP_BACKEND_URL}/ask-something/answer/fetchtitle`,
          {
            experienceId: question_id,
          }
        )
        .then (res => {
          setTitle (res.data.title);
          setDescription (res.data.answer);
          setTags (res.data.tags);
        })
        .catch (err => console.log (err));
    }
  }, []);

  return (
    <div>
      <Grid container justifyContent="space-around" alignItems="center">
        {/* At loading time */}
        {!loadingEditor &&
          <Stack sx={{width: '100%', color: 'grey.500'}} spacing={1}>
            <h4>Editor Loading...</h4>
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
          </Stack>}

        {/* After loading display the editor */}
        <Grid item xs={12} sm={smSize1}>
          <TextField
            label={findLabel ()}
            color="info"
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
              init={{
                height: 350,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                  'image code',
                ],
                toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | image | code | help',

                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                placeholder: findPlaceholder (),
              }}
              value={description}
              onChange={e => setDescription (e.target.value)}
            />

            <div style={{paddingBottom: '15px', paddingTop: '15px'}}>
              {/* Autocomplete for tags  */}
              <Autocomplete
                multiple
                id="tags-filled"
                options={subjects.map (option => option.title)}
                freeSolo
                value={tags}
                onChange={handleTagChange}
                renderTags={(value, getTagProps) =>
                  value.map ((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps ({index})}
                    />
                  ))}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Tags"
                    placeholder="Enter the related tags"
                  />
                )}
              />
            </div>
          </Box>
          {/* Preview of the inputs */}
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
              {/* Submit Button  */}
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

        {loadingEditor &&
          <Grid item xs={12} sm={smSize2}>
            {/* Preview box for the input text, for checking look before posting */}
            <Box
              sx={{
                minWidth: 205,
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
                Preview:
              </Typography>
              <CardQuestion quesData={quesData} />
            </Box>
          </Grid>}
      </Grid>
    </div>
  );
};

export default EditorAndPreview;
