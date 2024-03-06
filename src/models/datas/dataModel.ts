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
