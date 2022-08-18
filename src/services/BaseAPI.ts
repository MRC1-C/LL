import { message } from "antd";
import axios from "axios";

export async function postRequest(url: string, body: object) {
  try {
    let response = await axios.post(
      process.env.REACT_APP_BASE_URL + url,
      body,
      generateRequestHeader(),
    );
    return response.data;
  } catch (error) {
    handleErrorCode(error);
    throw error;
  }
}
export async function getRequest(url: string) {
  try {
    let response = await axios.get(
      process.env.REACT_APP_BASE_URL + url,
      generateRequestHeader()
    );
    return response.data;
  } catch (error) {
    handleErrorCode(error);
    throw error;
  }
}

export async function deleteRequest(url: string) {
  try {
    let response = await axios.delete(
      process.env.REACT_APP_BASE_URL + url,
      generateRequestHeader()
    );
    return response.data;
  } catch (error) {
    handleErrorCode(error);
    throw error;
  }
}

export async function patchRequest(url: string, body: object) {
  try {
    let response = await axios.patch(
      process.env.REACT_APP_BASE_URL + url,
      body,
      generateRequestHeader()
    );
    return response.data;
  } catch (error) {
    handleErrorCode(error);
    throw error;
  }
}

export function generateRequestHeader() {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
  };
}

export const handleErrorCode = (err: any) => { message.error(err) };
