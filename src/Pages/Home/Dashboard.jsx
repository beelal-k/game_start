import { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Menu, ChevronLeft } from '@mui/icons-material';

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={handleClose}>
        <IconButton onClick={handleClose}>
          <ChevronLeft />
        </IconButton>
        <List>
          <ListItem button>
            <ListItemIcon>
              {/* Add your icon component here */}
            </ListItemIcon>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              {/* Add your icon component here */}
            </ListItemIcon>
            <ListItemText primary="Item 2" />
          </ListItem>
          {/* Add more items as needed */}
        </List>
      </Drawer>
    </>
  );
};

export default Dashboard;