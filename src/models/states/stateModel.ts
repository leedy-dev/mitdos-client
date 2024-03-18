import { MenuData } from "../datas/dataModel";

interface StateStatus {
  status: 'idle' | 'loading' | 'failed';
}

export interface AuthState extends StateStatus {
  isAuthenticated: boolean;
  accessToken: string | null;
}

export interface UserState extends StateStatus {
  userId: string;
  userName: string;
  regDate: string;
  updDate: string;
  userProfile: string;
}

export interface MenuState extends StateStatus {
  menuList: MenuData[];
}

export interface ConfigState {
  themeName: string;
  sidebarToggle: boolean;
}

// Material ui Color
export interface ColorState {
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

// Modal | Snackbar
export interface ModalState {
  open: boolean;
  content?: any;
  title?: string;
  type?: 'alert' | 'confirm';
  onConfirm?: any;
}

export interface SnackbarState {
  open: boolean;
  content?: string;
  title?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}