"use client";

import { useSession } from "next-auth/react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { fetchPermissions } from "../store/slices/PermissionSlice";
import { permission_columns } from "./permissionColumns";
import MyTable from "../components/table";
import { Actions, TopActions } from "../types/table";
import { useState } from "react";
import Modal from "../components/modal";
import CreatePermission from "./create/page";
import Iconos from "../components/ui/hooks/iconos";
import EditPermission from "./edit/page";

export default function Permission() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [permission_id, setPermission_Id] = useState(0);

  const { pencilIcon } = Iconos({
    fill: "currentColor",
    classNames: "size-6",
    stroke: "currentColor",
    strokeWidth: 1.5,
  });

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

  const actions: Actions[] = [
    {
      name: "Editar",
      icon: pencilIcon,
      action: (row) => {
        setPermission_Id(row.id);
        setModalEdit(true);
      },
    },
  ];

  const topActions: TopActions[] = [
    {
      name: "Crear Permiso",
      action: () => setModalCreate(true),
    },
  ];
  return (
    <>
      <MyTable
        columns={permission_columns}
        getInfo={handleFetchPermissions}
        options={{ bd: true }}
        topActions={topActions}
        actions={actions}
      />

      <Modal
        open={modalCreate}
        setOpen={setModalCreate}
        title="Crear Permiso"
        children={<CreatePermission />}
        x_icon={true}
      />

      <Modal
        open={modalEdit}
        setOpen={setModalEdit}
        title="Editar Permiso"
        children={<EditPermission id={permission_id} />}
        x_icon={true}
      />
    </>
  );
}
