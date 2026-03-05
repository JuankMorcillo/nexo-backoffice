"use client";

import { useSession } from "next-auth/react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { fetchPermissions } from "../store/slices/PermissionSlice";
import { permission_columns } from "./permissionColumns";
import MyTable from "../components/table";

export default function Permission() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();

  const handleFetchPermissions = async (params: Params) => {
    if (session?.user.access_token) {
      const result = await dispatch(
        fetchPermissions({ token: session.user.access_token, params: params }),
      );
      return {
        meta: result.payload?.meta || { total: 0 },
        data: result.payload?.data || [],
      };
    }
    return { meta: { total: 0 }, data: [] };
  };

  return (
    <>
      <MyTable
        columns={permission_columns}
        getInfo={handleFetchPermissions}
        options={{ bd: true }}
      />
    </>
  );
}
