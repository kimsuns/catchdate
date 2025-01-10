import axios from "axios";
import { MoimDataType, MoimMemberType } from "../type/type";

const BASE_URL = "http://localhost:5000/api/moim";
// const BASE_URL = `${process.env.NEXT_PUBLIC_CATCHDATE_API_URL}/api/moim`;

// 모임 조회
export const getMoimApi = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    console.log("모임 조회", res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// 모임 생성
export const createMoimApi = async (data: MoimDataType) => {
  console.log("베이스 유알엘", BASE_URL);
  try {
    const res = await axios.post(`${BASE_URL}`, data);
    console.log("모임 생성 성공", res);
    return res.data;
  } catch (error) {
    console.error("모임 생성 실패", error);
  }
};

// 모임 업데이트
export const updateMoimApi = async (id: string, data: MoimMemberType) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    console.log("모임 멤버 업데이트 성공", res);
    return res;
  } catch (error) {
    console.error("모임 업데이트 실패", error);
  }
};

// 모임 상태 업데이트
export const updateMoimStatusApi = async (id: string) => {
  try {
    const res = await axios.put(`${BASE_URL}/status/${id}`);
    console.log("모임 상태 업데이트 성공", res);
    return res;
  } catch (error) {
    console.error("모임 업데이트 실패", error);
  }
};

// 테스트 api
export const testApi = async () => {
  try {
    const res = await axios.get(BASE_URL);
    console.log("테스트 api", res);
    return res;
  } catch (error) {
    console.log("테스트 실패", error);
  }
};
