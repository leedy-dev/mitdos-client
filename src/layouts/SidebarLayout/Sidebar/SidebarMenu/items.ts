import { ReactNode } from 'react';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
// Sample
import TableRowsIcon from '@mui/icons-material/TableRows';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";


export interface MenuItem {
  link?: string;
  icon?: ReactNode | OverridableComponent<SvgIconTypeMap>;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;

}

const menuItems: MenuItems[] = [
  {
    heading: 'Theme Sample',
    items: [
      {
        name: 'Theme Lists',
        icon: BrightnessLowTwoToneIcon,
        items: [
          {
            name: 'Dashboards',
            link: '/dashboards',
            icon: BrightnessLowTwoToneIcon
          },
          {
            name: 'Messenger',
            icon: MmsTwoToneIcon,
            link: '/dashboards/messenger'
          },
          {
            name: 'Transactions',
            icon: TableChartTwoToneIcon,
            link: '/management/transactions'
          },
          {
            name: 'User Profile',
            icon: AccountCircleTwoToneIcon,
            link: '/management/profile',
            items: [
              {
                name: 'Profile Details',
                link: '/management/profile/details'
              },
              {
                name: 'User Settings',
                link: '/management/profile/settings'
              }
            ]
          },
          {
            name: 'Components',
            items: [
              {
                name: 'Buttons',
                icon: BallotTwoToneIcon,
                link: '/components/buttons'
              },
              {
                name: 'Modals',
                icon: BeachAccessTwoToneIcon,
                link: '/components/modals'
              },
              {
                name: 'Accordions',
                icon: EmojiEventsTwoToneIcon,
                link: '/components/accordions'
              },
              {
                name: 'Tabs',
                icon: FilterVintageTwoToneIcon,
                link: '/components/tabs'
              },
              {
                name: 'Badges',
                icon: HowToVoteTwoToneIcon,
                link: '/components/badges'
              },
              {
                name: 'Tooltips',
                icon: LocalPharmacyTwoToneIcon,
                link: '/components/tooltips'
              },
              {
                name: 'Avatars',
                icon: RedeemTwoToneIcon,
                link: '/components/avatars'
              },
              {
                name: 'Cards',
                icon: SettingsTwoToneIcon,
                link: '/components/cards'
              },
              {
                name: 'Forms',
                icon: TrafficTwoToneIcon,
                link: '/components/forms'
              },
              {
                name: 'Tables',
                icon: TrafficTwoToneIcon,
                link: '/components/tables'
              },
            ]
          },
          {
            name: 'Extra Pages',
            items: [
              {
                name: 'Status',
                icon: VerifiedUserTwoToneIcon,
                link: '/status',
                items: [
                  {
                    name: 'Error 404',
                    link: '/status/404'
                  },
                  {
                    name: 'Error 500',
                    link: '/status/500'
                  },
                  {
                    name: 'Maintenance',
                    link: '/status/maintenance'
                  },
                  {
                    name: 'Coming Soon',
                    link: '/status/coming-soon'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    heading: 'MENU TODO',
    items: [
      {
        name: 'User Management',
        icon: AccountCircleTwoToneIcon,
        link: '/management/profile',
        items: [
          {
            name: 'Profile Details',
            link: '/management/profile/details'
          },
          {
            name: 'User Settings',
            link: '/management/profile/settings'
          }
        ]
      }
    ]
  },

  // ---------- Sample ----------
  {
    heading: 'SAMPLE',
    items: [
      {
        name: 'Sample',
        icon: TableRowsIcon,
        link: '/sample',
        items: [
          {
            name: 'Board001',
            link: '/sample/board001'
          },
          {
            name: 'SseTest',
            link: '/sample/sse-test'
          },
          {
            name: 'APITest',
            link: '/sample/api-test'
          },
        ]
      }
    ]
  }
];

export default menuItems;
