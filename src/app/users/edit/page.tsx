"use client";

import { useEffect, useState } from "react";
import Forms from "../../components/form";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { triggerReload } from "../../store/slices/reloadSlice";
import { fillToastInfo } from "../../store/slices/toastSlice";
import Iconos from "../../components/ui/hooks/iconos";
import {
  selectUsersLoading,
  clearProcessMessage,
  editUserSlice,
  fetchUserById,
  selectUsersProcessMessage,
  selectUsersSuccess,
  setSuccess,
} from "../../store/slices/usersSlice";
import { User } from "../../types/users";

type Props = {
  id: number;
};

export default function EditUser({ id }: Props) {
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
  });

  const [data, setData] = useState();

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
    textButton: "Actualizar Usuario",
  };

  const fetchUser = async () => {
    if (session?.user.access_token) {
      try {
        const response = await dispatch(
          fetchUserById({ token: session.user.access_token, id }),
        );
        if (response.type === "users/fetchUserById/fulfilled") {
          setData(response.payload);
        }
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    }
  };

  const handleEditUser = async () => {
    if (session?.user.access_token) {
      const result = await dispatch(
        editUserSlice({ token: session.user.access_token, user: { ...info } }),
      );

      if (result.type == "users/editUser/fulfilled") {
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
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (info.identifier && info.name && info.lastname && info.email) {
      handleEditUser();
    }
  }, [info]);

  return (
    <div className="flex justify-center">
      <Forms
        inputs={inputs}
        styles={styles}
        data={data}
        setInfo={setInfo}
        submitting={loading}
      />
    </div>
  );
}
