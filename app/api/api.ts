import axios from "axios";
import { MoimDataType } from "../type/type";

const BASE_URL = "http://localhost:5000/api";

// 모임 조회
export const getMoimApi = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/moim/${id}`);
    console.log("모임 조회", res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// 모임 생성
export const createMoimApi = async (data: MoimDataType) => {
  try {
    const res = await axios.post(`${BASE_URL}/moim`, data);
    console.log("모임 생성 성공", res);
    return res.data;
  } catch (error) {
    console.error("모임 생성 실패", error);
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
