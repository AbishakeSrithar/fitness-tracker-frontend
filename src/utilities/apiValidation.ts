import * as t from "io-ts";
import { isLeft } from "fp-ts/lib/These";

const RestResponseCodec = t.type({
  success: t.boolean,
  info: t.string,
  payload: t.any,
});

export type RestResponse = t.TypeOf<typeof RestResponseCodec>;

export async function responseToObject(
  response: Response,
): Promise<RestResponse> {
  const responseJson = await response.json();
  let payload = RestResponseCodec.decode(responseJson);

  if (isLeft(payload)) {
    // Fail -> Error
    throw payload.left;
  } else {
    // Success -> RestResponse
    return payload.right as RestResponse;
  }
}
