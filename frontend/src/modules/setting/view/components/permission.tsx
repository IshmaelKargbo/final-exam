import { AppDrawer } from "@components/drawer";
import { ShowMessage } from "@components/message";
import { useEditRoleMutation } from "@modules/setting/logic/service";
import { Button, Checkbox } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Role } from "../../logic/interface";

interface props {
  role: Role | undefined;
  open: boolean;
  onClose: () => void;
}

export const ViewPermissions = ({ role, onClose, open }: props) => {
  const [loading, setLoading] = useState(false);

  const [editRole] = useEditRoleMutation();

  const validationSchema = Yup.object({
    permissions: Yup.array().of(
      Yup.object().shape({
        all: Yup.boolean().required(),
        create: Yup.boolean().required(),
        update: Yup.boolean().required(),
        delete: Yup.boolean().required(),
        read: Yup.boolean().required(),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      permissions: [
        {
          all: false,
          name: "Dashboard",
          create: false,
          update: false,
          delete: false,
          read: false,
        },
        {
          all: false,
          name: "User",
          create: false,
          update: false,
          delete: false,
          read: false,
        },
        {
          all: false,
          name: "Role",
          create: false,
          update: false,
          delete: false,
          read: false,
        },
      ],
    },
    validationSchema,
    onSubmit(value) {
      setLoading(true);

      const permissions = value.permissions.map((e) => ({
        name: e.name,
        create: e.create,
        update: e.update,
        delete: e.delete,
        read: e.read,
      }));

      editRole({ ...role, permissions })
        .then((res: any) => {
          if (res.error) {
            const { data } = res.error;
            const { message } = data;
            ShowMessage("error", message);
            return;
          }

          ShowMessage("success", "User edited successfully !");
        })
        .finally(() => setLoading(false));

      onClose();
    },
  });

  const Permission = ({ permission, index }: any) => {
    const handleAll = (target: any) => {
      formik.setFieldValue(`permissions.${index}.all`, target.checked);
      formik.setFieldValue(`permissions.${index}.create`, target.checked);
      formik.setFieldValue(`permissions.${index}.update`, target.checked);
      formik.setFieldValue(`permissions.${index}.delete`, target.checked);
      formik.setFieldValue(`permissions.${index}.read`, target.checked);
    };

    const handleOption = (target: any, name: string) => {
      formik.setFieldValue(name, target.checked);
    };

    return (
      <tr className={`${index % 2 === 1 ? "bg-gray-50" : ""} hover:bg-gray-50`}>
        <td className="text-sm font-normal border p-3" align="center">
          <Checkbox
            name={`permissions.${index}.all`}
            checked={permission.all}
            onChange={(e) => handleAll(e.target)}
          />
        </td>
        <td className="text-sm font-normal border p-3">{permission.name}</td>
        <td className="text-sm font-normal border p-3">
          {index !== 0 ? (
            <Checkbox
              onChange={(e) =>
                handleOption(e.target, `permissions.${index}.create`)
              }
              checked={permission.create}
              name={`permissions.${index}.create`}
            />
          ) : null}
        </td>
        <td className="text-sm font-normal border p-3">
          {index !== 0 ? (
            <Checkbox
              onChange={(e) =>
                handleOption(e.target, `permissions.${index}.update`)
              }
              checked={permission.update}
              name={`permissions.${index}.update`}
            />
          ) : null}
        </td>
        <td className="text-sm font-normal border p-3">
          {index !== 0 ? (
            <Checkbox
              onChange={(e) =>
                handleOption(e.target, `permissions.${index}.delete`)
              }
              checked={permission.delete}
              name={`permissions.${index}.delete`}
            />
          ) : null}
        </td>
        <td className="text-sm font-normal border p-3">
          <Checkbox
            onChange={(e) =>
              handleOption(e.target, `permissions.${index}.read`)
            }
            checked={permission.read}
            name={`permissions.${index}.read`}
          />
        </td>
      </tr>
    );
  };

  const update = () => {
    role?.permissions.forEach((permission: any) => {
      const index = formik.initialValues.permissions.findIndex(
        (e) => e.name === permission.name
      );

      if (!index) return;

      const all =
        permission.create &&
        permission.delete &&
        permission.update &&
        permission.read;

      formik.setFieldValue(`permissions.${index}.all`, all);
      formik.setFieldValue(`permissions.${index}.create`, permission.create);
      formik.setFieldValue(`permissions.${index}.update`, permission.update);
      formik.setFieldValue(`permissions.${index}.delete`, permission.delete);
      formik.setFieldValue(`permissions.${index}.read`, permission.read);
    });
  };

  useEffect(() => {
    if (role) {
      update();
    }
  }, [role]);

  return (
    <AppDrawer
      width={"50%"}
      onClose={onClose}
      open={open}
      title="Role Permissions"
    >
      <div>
        <form onSubmit={formik.handleSubmit}>
          <table className="w-full border border-collapse rounded-md">
            <thead>
              <tr>
                <th className="text-sm font-normal border p-3">#</th>
                <th className="text-sm font-normal border p-3" align="left">
                  Module
                </th>
                <th className="text-sm font-normal border p-3" align="left">
                  Add
                </th>
                <th className="text-sm font-normal border p-3" align="left">
                  Edit
                </th>
                <th className="text-sm font-normal border p-3" align="left">
                  Delete
                </th>
                <th className="text-sm font-normal border p-3" align="left">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {formik.values.permissions.map((permission, key) => (
                <Permission permission={permission} key={key} index={key} />
              ))}
              <tr>
                <td colSpan={6} className="p-3 py-4">
                  <div className="flex space-x-3">
                    <Button size="large" danger onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      size="large"
                      loading={loading}
                    >
                      Save
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </AppDrawer>
  );
};
