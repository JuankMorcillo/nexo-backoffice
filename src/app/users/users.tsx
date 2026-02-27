"use client";

import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import MyTable from "../components/table";
import { columns } from "./ConstVariables";
import { fetchUsers } from "../store/slices/usersSlice";
import { Actions, TopActions } from "../types/table";
import { useState } from "react";
import Modal from "../components/modal";
import CreateUser from "./create/page";
import Iconos from "../components/ui/hooks/iconos";
import EditUser from "./edit/page";

export default function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false)
  const [user_id, setUser_Id] = useState(0)

  const { pencilIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

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

  const actions: Actions[] = [
      {
          name: 'Editar',
          icon: pencilIcon,
          action: (row) => {
              setUser_Id(row.identifier)
              setModalEdit(true)
          }
      }
  ]

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
        actions={actions}
      />
      <Modal
        open={modalCreate}
        setOpen={setModalCreate}
        title="Crear Usuario"
        children={<CreateUser />}
        x_icon={true}
      />
      <Modal
        open={modalEdit}
        setOpen={setModalEdit}
        title="Editar Usuario"
        children={<EditUser id={user_id} />}
        x_icon={true}
      />
    </>
  );
}
