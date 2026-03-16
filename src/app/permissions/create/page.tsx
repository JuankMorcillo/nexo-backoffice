import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { useSession } from "next-auth/react";
import {
  clearProcessMessagePermission,
  createPermissionSlice,
  selectPermissionLoading,
  selectPermissionMessage,
  selectPermissionProcessMessage,
  selectPermissionSuccess,
  setSuccessPermission,
} from "../../store/slices/PermissionSlice";
import Iconos from "../../components/ui/hooks/iconos";
import { Permission } from "../../types/permissions";
import Forms from "../../components/form";
import { fillToastInfo } from "../../store/slices/toastSlice";
import { triggerReload } from "../../store/slices/reloadSlice";

export default function CreatePermission() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();

  const loading = useSelector(selectPermissionLoading);
  const message = useSelector(selectPermissionProcessMessage);
  const success = useSelector(selectPermissionSuccess);

  const { successIcon } = Iconos({
    classNames: "size-6 text-green-500",
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: 1.5,
  });
  const { circleXMarkIcon } = Iconos({
    classNames: "size-6 text-red-500",
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: 1.5,
  });

  const [info, setInfo] = useState<Permission>();

  const inputs: Inputs = [
    {
      id: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Nombre del permiso",
      required: true,
    },
    {
      id: "description",
      label: "Descripción",
      type: "text",
      placeholder: "Descripción del permiso",
      required: true,
    },
  ];

  const styles = {
    cols: 1,
    textButton: "Guardar Equipo",
  };

  const handleCreatePermission = async () => {
    if (session?.user.access_token) {
      const result = await dispatch(
        createPermissionSlice({
          token: session.user.access_token,
          permission: info as Permission,
        }),
      );

      if (result.type == "permissions/createPermission/fulfilled") {
        setInfo(undefined);
      }
    }
  };

  useEffect(() => {
    if (message) {
      dispatch(
        fillToastInfo({
          id: new Date().getTime().toString(),
          message: message || "Permiso Creado exitosamente",
          position: "top-right",
          icon: success ? successIcon : circleXMarkIcon,
          duration: 3000,
        }),
      );
      dispatch(clearProcessMessagePermission());
    }

    if (success) dispatch(triggerReload());
    dispatch(setSuccessPermission(false));
  }, [message, success]);

  useEffect(() => {
    if (info) handleCreatePermission();
  }, [info]);

  return (
    <div className="flex justify-center">
      <Forms
        inputs={inputs}
        setInfo={setInfo}
        styles={styles}
        submitting={loading}
      />
    </div>
  );
}
