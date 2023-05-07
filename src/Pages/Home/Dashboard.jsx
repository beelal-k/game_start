import { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Menu, ChevronLeft } from '@mui/icons-material';
import { Sidebar } from '../../Components/Sidebar/Sidebar';

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Sidebar />

    </>
  );
};

export default Dashboard;