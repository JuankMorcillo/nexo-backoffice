"use client";

import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import MyTable from "../components/table";
import { columns } from "./ConstVariables";
import { fetchUsers } from "../store/slices/usersSlice";
import { TopActions } from "../types/table";
import { useState } from "react";
import Modal from "../components/modal";
import CreateUser from "./create/page";

export default function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const [modalCreate, setModalCreate] = useState(false);

  const handleFetchUsers = async (params: Params) => {
    if (session?.user.access_token) {
      const result = await dispatch(
        fetchUsers({ token: session.user.access_token, params: params }),
      );
      return {
        meta: result.payload?.meta || { total: 0 },
        data: result.payload?.data || [],
      };
    }
    return { meta: { total: 0 }, data: [] };
  };

  const topActions: TopActions[] = [
    {
      name: "Crear Usuario",
      action: () => setModalCreate(true),
    },
  ];

  return (
    <>
      <MyTable
        columns={columns}
        getInfo={handleFetchUsers}
        options={{ bd: true }}
        topActions={topActions}
      />
      <Modal
        open={modalCreate}
        setOpen={setModalCreate}
        title="Crear Usuario"
        children={<CreateUser />}
        x_icon={true}
      />
    </>
  );
}
