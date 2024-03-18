export interface ResponseData<T> {
  resultCode: string;
  message: string;
  data: T;
}

export interface LoginData {
  userId: string;
  password: string;
}

export interface UserData {
  userId: string;
  userName: string;
  regDate: string;
  updDate: string;
  userProfile: string;
}

export interface MenuData {
  menuId: number;
  upperMenuId: number;
  menuName: string;
  auth: string;
  url?: string;
  level: number;
  index: number;
  icon?: string;
  badge?: string;
  subMenus?: MenuData[];
}

export interface MenuSearchData {
  auth: string;
  level?: number;
}

// Sample
export interface PagingInfo {
  size?: number;
  page?: number;
  sort?: string;
  totalPages?: number;
  totalElements?: number;
}

export interface BoardSearchData {
  title?: string;
}

export interface BoardData {
  title: string;
  content: string;
  id?: number;
  createdDate?: string;
  createdBy?: string;
  modifiedDate?: string;
  lasModifiedBy?: string;
}
