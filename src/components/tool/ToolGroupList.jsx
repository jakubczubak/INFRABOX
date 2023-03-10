import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Breadcrumbs,
  Typography,
  Box,
  TextField,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './css/ToolGroupList.module.css';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toolManager } from './service/toolManager';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Result } from './Result';
import Lottie from 'lottie-react';
import loading from '../../assets/Lottie/loading.json';
import error from '../../assets/Lottie/error.json';
import { ToolGroupModal_ADD } from './ToolGroupModal_ADD';

export const ToolGroupList = () => {
  const [query, setQuery] = useState(''); // query for search
  const [isOpen, setIsOpen] = useState(false); // open the modal
  const { data, isLoading, isError } = useQuery(['tools'], toolManager.getToolGroups); // fetch all tools
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Tools</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Manage Tools
        </Typography>
      </div>
      <Tooltip title="Search" placement="right">
        <TextField
          variant="standard"
          onChange={(e) => setQuery(e.target.value)}
          label="Search"
          InputProps={{
            className: styles.search_input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        ></TextField>
      </Tooltip>
      <div className={styles.material_container}>
        {isLoading && (
          <Box className={styles.loading_container}>
            <Lottie animationData={loading} loop={true} className={styles.animation} />
          </Box>
        )}
        {isError && (
          <Box className={styles.error_container}>
            <Lottie animationData={error} loop={true} className={styles.animation} />
            {'Failed to fetch tools, please try again later.'}
          </Box>
        )}
        {!isError && !isLoading && <Result data={data.length ? data : []} query={query} />}
      </div>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}
      >
        <SpeedDialAction icon={<AddIcon />} tooltipTitle="Create" onClick={() => setIsOpen(true)} />
      </SpeedDial>
      <ToolGroupModal_ADD open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
