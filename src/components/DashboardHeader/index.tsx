import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Material
import { Avatar, IconButton, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

//Images
import { SwarayLogo } from '../../assets/img/index';
import { UserDetails } from '../../common/interface/userDetails.interface';

//styles
import './style.scss';
import routes from '../../constants/routes';

interface IState {
  userDetails: {
    userDetails: UserDetails;
  };
}

const DashboardHeader = () => {
  const navigate = useNavigate();

  const loggedInUserDetails: UserDetails = useSelector(
    (state: IState) => state.userDetails.userDetails
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="dashboard-header bg-secondary d-flex justify-between align-center px-16">
      <div>
        <IconButton
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          <MenuIcon className="txt-secondary" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          className="header-dropdown-menu">
          <MenuItem onClick={handleClose} className="txt-tertiary">
            <ListItemIcon>
              <DashboardOutlinedIcon className="txt-tertiary" fontSize="small" />
            </ListItemIcon>
            Discovery
          </MenuItem>
          <MenuItem onClick={handleClose} className="txt-tertiary">
            <ListItemIcon>
              <SearchOutlinedIcon className="txt-tertiary" fontSize="small" />
            </ListItemIcon>
            Search
          </MenuItem>
          <MenuItem onClick={handleClose} className="txt-tertiary">
            <ListItemIcon>
              <NotificationsOutlinedIcon className="txt-tertiary" fontSize="small" />
            </ListItemIcon>
            Notifications
          </MenuItem>
        </Menu>
      </div>
      <div className="w-100 d-grid place-center">
        <img className="img login-img" src={SwarayLogo} alt="" />
      </div>
      <div>
        <Avatar
          onClick={() => navigate(routes.myProfileScreen)}
          className="small bordered cursor-pointer"
          alt="Remy Sharp"
          src={loggedInUserDetails?.profilePhoto}
        />
      </div>
    </div>
  );
};

export default React.memo(DashboardHeader);
