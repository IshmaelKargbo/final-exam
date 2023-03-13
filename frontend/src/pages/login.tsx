import { LoginModule } from "@modules/login/view";
import { ApiServer } from "../common/api";

export default function Login() {
  return <LoginModule />;
}

export async function getServerSideProps({ req }: any) {
  return ApiServer.isLogin(req);
}
