import { Layout } from "@components/layout";
import { SettingRoleModule } from "@modules/setting/view/role";
import { ApiServer } from "../common/api";

export default function Role() {
  return (
    <Layout>
      <SettingRoleModule />
    </Layout>
  );
}

export async function getServerSideProps({ req }: any) {
  return ApiServer.Me(req);
}
