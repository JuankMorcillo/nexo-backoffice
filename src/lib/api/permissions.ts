import { FetchApi } from "./fetchApi";


export async function getPermissions(token: string, params = {}) {

  const options: OptionsProps = {
    endpoint: 'permissions',
    method: 'GET' as const,
    headers: {
      Authorization: 'bearer ' + token,
    },
    params
  }

  try {
    return await FetchApi(options);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
