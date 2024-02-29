import { ReactNode, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

import { Badge, Button, Collapse, Icon, ListItem } from '@mui/material';

import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { useDispatch } from "react-redux";
import { configSliceAction } from "src/features/config/configSlice";

interface SidebarMenuItemProps {
  children?: ReactNode;
  link?: string;
  icon?: any;
  badge?: string;
  open?: boolean;
  active?: boolean;
  name: string;
}

const SidebarMenuItem = ({
  children,
  link,
  icon: Icon,
  badge,
  open: openParent,
  active,
  name,
  ...rest
}: SidebarMenuItemProps) => {
  const [menuToggle, setMenuToggle] = useState<boolean>(openParent);

  const dispatch = useDispatch();
  const toggleSidebar = () => dispatch(configSliceAction.setSidebarToggle());

  const toggleMenu = (): void => {
    setMenuToggle((Open) => !Open);
  };

  if (children) {
    return (
      <ListItem component="div" className="Mui-children" key={name} {...rest}>
        <Button
          className={clsx({ 'Mui-active': menuToggle })}
          startIcon={Icon && <Icon />}
          endIcon={
            menuToggle ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />
          }
          onClick={toggleMenu}
        >
          {name}
        </Button>
        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <Button
        // activeClassName="Mui-active"
        component={RouterLink}
        onClick={toggleSidebar}
        to={link}
        startIcon={Icon && <Icon />}
      >
        {name}
        {badge && <Badge badgeContent={badge} />}
      </Button>
    </ListItem>
  );
};

SidebarMenuItem.defaultProps = {
  open: false,
  active: false,
};

export default SidebarMenuItem;
