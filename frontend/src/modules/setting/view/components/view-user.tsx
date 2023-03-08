import { AppDrawer } from "@components/drawer";
import { ErrorMessage } from "@components/error";
import { ShowMessage } from "@components/message";
import { useListRole } from "@modules/setting/logic/hook/role";
import { User } from "@modules/setting/logic/interface";
import { useResetPasswordMutation } from "@modules/setting/logic/service";
import { Button } from "antd";
import { useState } from "react";
import { MdPassword } from "react-icons/md";

interface props {
  state: boolean;
  user: User | undefined;
  onClose: () => void;
}

export const ViewUser = ({ state, onClose, user }: props) => {
  const [lading, setLoading] = useState(false);
  const [error, setError] = useState<string | Array<string> | null>(null);

  const [resetPassword] = useResetPasswordMutation();

  const reset = () => {
    setLoading(true);

    const id = user?.id || "";
    
    resetPassword(id)
      .then((res: any) => {
        if (res.error) {
          const { data } = res.error;
          const { message } = data;
          setError(message);
          return;
        }

        ShowMessage("success", "Password reset successfully!");
      })
      .finally(() => setLoading(false));
  };

  const closeErrorFunc = (index: number) => {
    const data: any = error;
    const filter = data.filter((_: string, i: number) => i !== index);
    setError(filter);
  };

  return (
    <AppDrawer title="View User" open={state} onClose={onClose}>
      <ErrorMessage
        error={error}
        closeFunc={(state) => setError(state)}
        closeIndexFunc={(index) => closeErrorFunc(index)}
      />
      <div className="mb-6">
        <p className="text-gray-500">First name:</p>
        <p className="font-semibold text-base">{user?.firstName}</p>
      </div>
      <div className="mb-6">
        <p className="text-gray-500">Last name:</p>
        <p className="font-semibold text-base">{user?.lastName}</p>
      </div>
      <div className="mb-6">
        <p className="text-gray-500">Role:</p>
        <p className="font-semibold text-base">{user?.role.name}</p>
      </div>
      <div className="mb-6">
        <p className="text-gray-500">Email:</p>
        <p className="font-semibold text-base">{user?.email}</p>
      </div>
      <div className="mb-6">
        <p className="text-gray-500">User:</p>
        <p className="font-semibold text-base">{user?.username}</p>
      </div>
      <div className="mb-6">
        <p className="text-gray-500">State:</p>
        <p className="font-semibold text-base">{user?.state}</p>
      </div>
      <div className="border-t pt-5 mt-5 flex  space-x-3">
        <Button
          type="text"
          className="flex items-center space-x-2"
          onClick={reset}
        >
          <MdPassword />
          <span>Reset Password</span>
        </Button>
      </div>
    </AppDrawer>
  );
};
