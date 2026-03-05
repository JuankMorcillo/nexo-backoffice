"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { useSession } from "next-auth/react";
import {
  clearProcessMessagePermission,
  createPermissionSlice,
  editPermissionSlice,
  fetchPermissionById,
  selectPermissionLoading,
  selectPermissionMessage,
  selectPermissionProcessMessage,
  selectPermissionSuccess,
  setSuccessPermission,
} from "../../store/slices/PermissionSlice";
import Iconos from "../../components/ui/hooks/iconos";
import { fillToastInfo } from "../../store/slices/toastSlice";
import { triggerReload } from "../../store/slices/reloadSlice";
import Forms from "../../components/form";
import { Permission } from "../../types/permissions";

type Props = {
  id: number;
};

export default function EditPermission({ id }: Props) {
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
  const [data, setData] = useState();

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
    textButton: "Actualizar Permiso",
  };

  const fetchPermission = async () => {
    if (session?.user.access_token) {
      try {
        const response = await dispatch(
          fetchPermissionById({ token: session.user.access_token, id }),
        );
        if (response.type === "permissions/fetchPermissionById/fulfilled") {
          setData(response.payload);
        }
      } catch (error) {
        console.error("Error fetching permission:", error);
      }
    }
  };

  const handleEditPermission = async () => {
    if (session?.user.access_token) {
      try {
        const result = await dispatch(
          editPermissionSlice({
            token: session.user.access_token,
            permission: info as Permission,
          }),
        );
        if (result.type === "permissions/editPermission/fulfilled") {
          setInfo(undefined);
        }
      } catch (error) {
        console.error("Error editing permission:", error);
      }
    }
  };

  useEffect(() => {
    if (message) {
      dispatch(
        fillToastInfo({
          id: new Date().getTime().toString(),
          message: message || "Permiso actualizado exitosamente",
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
    if (id) fetchPermission();
  }, [id]);

  useEffect(() => {
    if (info) handleEditPermission();
  }, [info]);

  return (
    <div className="flex justify-center">
      {data && (
        <Forms
          inputs={inputs}
          setInfo={setInfo}
          styles={styles}
          submitting={loading}
          data={data}
        />
      )}
    </div>
  );
}
