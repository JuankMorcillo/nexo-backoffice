"use client";

import { useEffect, useState } from "react";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { triggerReload } from "../../store/slices/reloadSlice";
import Iconos from "../../components/ui/hooks/iconos";
import { fillToastInfo } from "../../store/slices/toastSlice";
import {
  clearProcessMessage,
  createUserSlice,
  selectUsersLoading,
  selectUsersProcessMessage,
  selectUsersSuccess,
  setSuccess,
} from "../../store/slices/usersSlice";
import { User } from "../../types/users";
import Forms from "../../components/form";

export default function CreateUser() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();

  const loading = useSelector(selectUsersLoading);
  const message = useSelector(selectUsersProcessMessage);
  const success = useSelector(selectUsersSuccess);

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

  const [info, setInfo] = useState<User>({
    identifier: 0,
    name: "",
    lastname: "",
    email: "",
    subscribers_id: session?.user.user.subscribers_id,
    identification_types_id: 1,
    roles_ids: [1],
    password: "*12345",
  });

  const inputs: Inputs = [
    {
      id: "identifier",
      label: "Identificación",
      type: "number",
      placeholder: "Identificacion del usuario",
      required: true,
    },
    {
      id: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Nombre del usuario",
      required: true,
    },
    {
      id: "lastname",
      label: "Apellido",
      type: "text",
      placeholder: "Apellido del usuario",
      required: true,
    },
    {
      id: "email",
      label: "Correo",
      type: "text",
      placeholder: "Correo del usuario",
      required: true,
    },
  ];

  const styles = {
    cols: 1,
    textButton: "Guardar Usuario",
  };

  const handleCreateUser = async () => {
    if (session?.user.access_token) {
      const result = await dispatch(
        createUserSlice({
          token: session.user.access_token,
          user: { ...info },
        }),
      );

      if (result.type == "users/createUser/fulfilled") {
        setInfo({
          identifier: 0,
          name: "",
          lastname: "",
          email: "",
          subscribers_id: session?.user.user.subscribers_id,
          identification_types_id: 1,
          roles_ids: [1],
          password: "*12345",
        });
      }
    }
  };

  useEffect(() => {
    if (message) {
      dispatch(
        fillToastInfo({
          id: new Date().getTime().toString(),
          message: message || "Usuario actualizado exitosamente",
          position: "top-right",
          icon: success ? successIcon : circleXMarkIcon,
          duration: 3000,
        }),
      );
      dispatch(clearProcessMessage());
    }

    if (success) dispatch(triggerReload());
    dispatch(setSuccess(false));
  }, [message, success]);

  useEffect(() => {
    if (info.identifier && info.name && info.lastname && info.email) {
      handleCreateUser();
    }
  }, [info]);

  return (
    <div className="flex justify-center">
      <Forms
        inputs={inputs}
        styles={styles}
        data={info}
        setInfo={setInfo}
        submitting={loading}
      />
    </div>
  );
}
