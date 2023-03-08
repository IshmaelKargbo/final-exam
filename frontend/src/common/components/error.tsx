import { Alert } from "antd";

interface props {
  error: string | Array<string> | null;
  closeFunc: (e: any) => void;
  closeIndexFunc: (e: number) => void;
}

export const ErrorMessage = ({
  error,
  closeFunc,
  closeIndexFunc,
}: props) => {
  return (
    <div className={error ? "mb-4" : ""}>
      <div>
        {typeof error === "string" ? (
          <Alert
            closable
            onClick={() => closeFunc(null)}
            message={error}
            type="error"
          />
        ) : null}
      </div>
      <div>
        {typeof error === "object"
          ? error?.map((e, key) => (
              <div key={key} className="mb-2">
                <Alert
                  closable
                  onClose={() => closeIndexFunc(key)}
                  message={e}
                  type="error"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
