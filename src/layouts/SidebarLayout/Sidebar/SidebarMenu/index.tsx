import { List, ListSubheader } from '@mui/material';
import { matchPath, useLocation } from 'react-router-dom';
import SidebarMenuItem from './item';
import { MenuItem } from './items';
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getMenuAsync } from "../../../../features/menu/menuSlice";
import { MenuData } from "../../../../models/datas/dataModel";


const MenuWrapper = styled(List)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(1)};
    padding: 0;

    & > .MuiList-root {
      padding: 0 ${theme.spacing(2)} ${theme.spacing(2)};
    }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemHeadingColor};
      padding: ${theme.spacing(0.8, 2)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(List)(
  ({ theme }) => `
    &.MuiList-root {
      padding: 0;

      .MuiList-root .MuiList-root .MuiListItem-root .MuiButton-root {
        font-weight: normal !important;
      }

      .MuiListItem-root {
        padding: 2px ${theme.spacing(2)};
    
        .MuiButton-root {
          display: flex;
          color: ${theme.sidebar.menuItemColor};
          background-color: ${theme.sidebar.menuItemBg};
          width: 100%;
          justify-content: flex-start;
          font-size: ${theme.typography.pxToRem(13)};
          padding-top: ${theme.spacing(0.8)};
          padding-bottom: ${theme.spacing(0.8)};
          position: relative;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(4)};

            .MuiBadge-standard {
              background: ${theme.colors.primary.main};
              font-size: ${theme.typography.pxToRem(9)};
              font-weight: bold;
              text-transform: uppercase;
              color: ${theme.palette.primary.contrastText};
            }
          }
    
          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            font-size: ${theme.typography.pxToRem(26)};
            margin-right: ${theme.spacing(1.5)};
            color: ${theme.sidebar.menuItemIconColor};
          }
          
          .MuiButton-endIcon {
            margin-left: auto;
            font-size: ${theme.typography.pxToRem(22)};
          }

          &.Mui-active,
          &:hover {
            background-color: ${theme.sidebar.menuItemBgActive};
            color: ${theme.sidebar.menuItemColorActive};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
                color: ${theme.sidebar.menuItemIconColorActive};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;
          line-height: 1;
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px ${theme.spacing(0)};

            .MuiButton-root {
              font-size: ${theme.typography.pxToRem(13)};
              padding: ${theme.spacing(0.5, 2, 0.5, 6.5)};

              &.Mui-active,
              &:hover {
                background-color: ${theme.sidebar.menuItemBg};
              }
            }
          }
        }
      }
    }
`
);

const renderSidebarMenuData = ({
  items,
  path
}: {
  items: MenuData[];
  path: string;
}): JSX.Element => (
    <SubMenuWrapper>
      {items.reduce((ev, item) => reduceChildRoutesData({ ev, item, path }), [])}
    </SubMenuWrapper>
);

const reduceChildRoutesData = ({
  ev,
  path,
  item
}: {
  ev: JSX.Element[];
  path: string;
  item: MenuData;
}): Array<JSX.Element> => {
  const key = item.menuId;

  const exactMatch = item.url ? !!matchPath({
    path: item.url,
    end: true
  }, path) : false;

  if (item.subMenus) {
    const partialMatch = item.url ? !!matchPath({
      path: item.url,
      end: false
    }, path) : false;

    ev.push(
        <SidebarMenuItem
            key={key}
            active={partialMatch}
            open={partialMatch}
            name={item.menuName}
            icon={item.icon}
            link={item.url}
            badge={item.badge}
        >
          {renderSidebarMenuData({
            path,
            items: item.subMenus
          })}
        </SidebarMenuItem>
    );
  } else {
    ev.push(
        <SidebarMenuItem
            key={key}
            active={exactMatch}
            name={item.menuName}
            link={item.url}
            badge={item.badge}
            icon={item.icon}
        />
    );
  }

  return ev;
}

const renderSidebarMenuItems = ({
  items,
  path
}: {
  items: MenuItem[];
  path: string;
}): JSX.Element => (
  <SubMenuWrapper>
    {items.reduce((ev, item) => reduceChildRoutes({ ev, item, path }), [])}
  </SubMenuWrapper>
);

const reduceChildRoutes = ({
  ev,
  path,
  item
}: {
  ev: JSX.Element[];
  path: string;
  item: MenuItem;
}): Array<JSX.Element> => {
  const key = item.name;

  const exactMatch = item.link ? !!matchPath({
    path: item.link,
    end: true
  }, path) : false;

  if (item.items) {
    const partialMatch = item.link ? !!matchPath({
      path: item.link,
      end: false
    }, path) : false;

    ev.push(
      <SidebarMenuItem
        key={key}
        active={partialMatch}
        open={partialMatch}
        name={item.name}
        icon={item.icon}
        link={item.link}
        badge={item.badge}
      >
        {renderSidebarMenuItems({
          path,
          items: item.items
        })}
      </SidebarMenuItem>
    );
  } else {
    ev.push(
      <SidebarMenuItem
        key={key}
        active={exactMatch}
        name={item.name}
        link={item.link}
        badge={item.badge}
        icon={item.icon}
      />
    );
  }

  return ev;
}

function SidebarMenu() {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const menuList: MenuData[] = useAppSelector(state => state.menu.menuList);

  useEffect(() => {
    const searchData = {
      auth: 'ROLE_USER',
      level: 1
    }

    dispatch(getMenuAsync(searchData));
  }, []);

  return (
    <>
      {menuList.map(menu => (
          <MenuWrapper
              key={menu.menuId}
              subheader={
                <ListSubheader component="div" disableSticky>{menu.menuName}</ListSubheader>
              }
          >
            {renderSidebarMenuData({
              items: menu.subMenus,
              path: location.pathname
            })}
          </MenuWrapper>
      ))}
      {/*{menuItems.map((section) => (
        <MenuWrapper
          key={section.heading}
          subheader={
            <ListSubheader component="div" disableSticky>{section.heading}</ListSubheader>
          }
        >
          {renderSidebarMenuItems({
            items: section.items,
            path: location.pathname
          })}
        </MenuWrapper>
      ))}*/}
    </>
  );
}

export default SidebarMenu;
