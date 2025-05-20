import { responseToObject } from "./apiValidation";

export function throwAlertError(errorMsg: string) {
  window.alert(errorMsg);
  throw console.error(errorMsg);
}

export async function checkAndGetRestResponse(response: Response) {
  if (response.status == 200) {
    const restResponse = await responseToObject(response);
    return checkIfBESuccess(restResponse);
  } else {
    throwAlertError(`Status: ${response.status}`);
    throw console.error(`Status: ${response.status}. Do Ids exist? Are they linked?`);
  }
}

export function checkIfBESuccess(responseJson: any) {
  if ((responseJson.success as Boolean) === true) {
    return responseJson;
  } else {
    throwAlertError(`BE Error: ${responseJson.info}`);
  }
}
