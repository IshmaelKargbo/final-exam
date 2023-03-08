import { AppDrawer } from "@components/drawer";
import { Button, Checkbox, Select, Table } from "antd";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Role } from "../logic/interface";

interface props {
  role: Role;
  open: boolean;
  onClose: () => void;
}

export const Permission = ({ role, onClose, open }: props) => {
  const { query } = useRouter();

  const id = `${query.id}`;

  const [loading, setLoading] = useState(false);

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
    onSubmit(values) {
      setLoading(true);

      // api.patch(`/role/permissions/${record.id}`, values)
      //   .then(res => res.data)
      //   .then(() => {
      //     ShowMessage('success', 'Permission', "Admin permission created successfully");
      //     Router.push("/role")
      //   })
      //   .catch(handleError)
      //   .catch(err => {
      //     ShowMessage('success', 'Permission', err.data);
      //   })
      //   .finally(() => setLoading(false));
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
    role.permissions.forEach((permission: any) => {
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
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <AppDrawer onClose={onClose} open={open}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-raj">Role Permission</p>
        </div>
        <div className="bg-white p-5 rounded-md">
          <form>
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
                      <Button size="large" danger>
                        Cancel
                      </Button>
                      <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className="bg-blue-400"
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
      </div>
    </AppDrawer>
  );
};
