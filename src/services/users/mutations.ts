/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from '@/api';
import {
  PUTAPPROVEBORROWREQUEST,
  POSTBORROWBOOK,
  POSTSEARCHBOOK,
  POSTUPLOADBOOK,
  PUTAPPROVEDUEDATECHANGE,
  PUTCHANGEDUEDATECHANGE,
  DELETEBOOK,
  DELETEBOOKREQUESTS,
  PUTSUSPENDUSER,
} from './endpoints';
import { department } from './endpoints';
import { ApiSuccessResponse, UsersResponseData } from '../types/responses';
export interface bookData {
  name: string;
  about: string;
  author: string;
  departments: department[];
}

export interface reserveBookData {
  pickUpDate: string;
  dueDate: string;
  description: string;
  bookRequestType: 'RESERVE' | 'BORROW' | any;
}

export interface reserveBookReturn {
  message: string;
  bookRequestId: number;
  approvalStatus: 'APPROVED' | 'PENDING' | 'DECLINED';
}

export function searchBook(data: { searchString: string }) {
  return Api.post(POSTSEARCHBOOK, data);
}

export function uploadBook(data: bookData) {
  return Api.post(POSTUPLOADBOOK, data);
}

export function approveDueDateChange({
  bookRequestId,
  decision,
}: {
  bookRequestId: number;
  decision: string;
}) {
  return Api.put(PUTAPPROVEDUEDATECHANGE(bookRequestId), {
    approvalStatus: decision,
  });
}

export function deleteBookById(bookId: number) {
  return Api.delete(DELETEBOOK(bookId));
}

export function deleteBookRequestById(bookId: number) {
  return Api.delete(DELETEBOOKREQUESTS(bookId));
}

export function requestDueDateChange({
  data,
  bookRequestId,
}: {
  data: { newDueDate: string };
  bookRequestId: number;
}) {
  return Api.put(PUTCHANGEDUEDATECHANGE(bookRequestId), data);
}

export function approveBorrowBookRequest(bookRequestId: number) {
  return Api.put(PUTAPPROVEBORROWREQUEST(bookRequestId), {
    approvalStatus: 'APPROVED',
  });
}

export function requestBorrowReserveBook({
  data,
  bookId,
}: {
  data: reserveBookData;
  bookId: number;
}): Promise<ApiSuccessResponse<reserveBookReturn>> {
  return Api.post(POSTBORROWBOOK(bookId), data);
}

export function suspendUserById(userId: number) {
  return Api.put(PUTSUSPENDUSER(userId), {
    suspend: true,
  });
}