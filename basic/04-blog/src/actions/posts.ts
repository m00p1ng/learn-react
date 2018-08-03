import {
  CREATE_POST_FAILED,
  CREATE_POST_REQUESTED,
  CREATE_POST_SUCCEEDED,

  FETCH_ALL_POSTS_FAILED,
  FETCH_ALL_POSTS_REQUESTED,
  FETCH_ALL_POSTS_SUCCEEDED,

  FETCH_POST_FAILED,
  FETCH_POST_REQUESTED,
  FETCH_POST_SUCCEEDED,
} from './index';

export function fetchAllPosts() {
  return { type: FETCH_ALL_POSTS_REQUESTED };
}

export function fetchAllPostsSuccess(data: any[]) {
  const payload = { data };
  return { type: FETCH_ALL_POSTS_SUCCEEDED, payload };
}

export function fetchAllPostsError(err: any) {
  const payload = { error: err };
  return { type: FETCH_ALL_POSTS_FAILED, payload };
}

export function createPost(values: any, callback: any) {
  const payload = { data: values, callback };
  return { type: CREATE_POST_REQUESTED, payload };
}

export function createPostSuccess(data: any, callback: any) {
  const payload = { data };
  callback();
  return { type: CREATE_POST_SUCCEEDED, payload };
}

export function createPostError(err: any) {
  const payload = { error: err };
  return { type: CREATE_POST_FAILED, payload };
}

export function fetchPostById(id: number) {
  const payload = { id };
  return { type: FETCH_POST_REQUESTED, payload };
}

export function fetchPostByIdSuccess(data: any) {
  const payload = { data };
  return { type: FETCH_POST_SUCCEEDED, payload };
}

export function fetchPostByIdFailed(err: any) {
  const payload = { error: err };
  return { type: FETCH_POST_FAILED, payload };
}