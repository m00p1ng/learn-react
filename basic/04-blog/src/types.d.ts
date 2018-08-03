export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface Error {
  status: boolean;
  errorMsg: any;
}