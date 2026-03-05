import { FetchApi } from "./fetchApi";
import { Permission } from "@/src/app/types/permissions";


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

export async function getPermissionById(token: string, id: number) {

    const options: OptionsProps = {
        endpoint: `permissions/${id}`,
        method: 'GET' as const,
        headers: {
            Authorization: 'bearer ' + token,
        }
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export async function createPermission(token: string, data: Permission) {

    const options: OptionsProps = {
        endpoint: 'permissions',
        method: 'POST' as const,
        headers: {
            Authorization: 'bearer ' + token,
        },
        body: data
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }

}


export async function editPermission(token: string, data: Permission) {

    const options: OptionsProps = {
        endpoint: `permissions/${data.id}`,
        method: 'PATCH' as const,
        headers: {
            Authorization: 'bearer ' + token,
        },
        body: data
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }

}