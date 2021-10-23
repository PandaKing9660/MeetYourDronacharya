import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, alpha } from "@mui/material/styles";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import InputBase from "@mui/material/InputBase";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SearchIcon from "@mui/icons-material/Search";
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share'
import NavBar from '../Home/Navbar/Navbar';
import "./material.css"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));


const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function StudyMaterial() {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className = "material_StudyMaterial">
      <NavBar />
      <div className = "division">
        <div className = "info">
              <h1 align="center"><u>STUDY MATERIAL</u></h1>
              <div>
                Books are undeniably a blessing to humankind. And books being useful for us in many ways have earned the title of our best friend. Libraries are the storehouse of books of several genres where interested readers can spend time reading in silence or can borrow books by being a member of that library. Through this practice of reading, we humans also display a greater sense of being civilized.
  There are individuals like myself who like to collect books, especially storybooks or novels. And this habit of mine has turned my house into a small library in itself. I know many other readers who share this same obsession with reading books and collecting them. My conversions with them mostly revolve around the plot, the character development, the writing style of the authors, and other aspects of books.
              </div>
        </div>
        <div className="materials">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Chapters" value="1" />
                  <Tab label="Topics" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box sx={{ height: 360, transform: 'translateZ(0px)', flexGrow: 1 }}>
                    <Search sx={{ backgroundColor: 'white' }}>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Search>
                    <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            sx={{ position: 'absolute', bottom: 16, right: 16 }}
                            icon={<SpeedDialIcon />}
                          >
                            {actions.map((action) => (
                              <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                              />
                            ))}
                  </SpeedDial>
                </Box>
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
}
