import { Layout } from '@components/layout'
import { SettingModule } from '@modules/setting/view'
import { ApiServer } from '../common/api';

export default function Settings() {
  return (
    <Layout>
      <SettingModule />
    </Layout>
  )
}

export async function getServerSideProps({ req }: any) {
  return ApiServer.Me(req);
}
