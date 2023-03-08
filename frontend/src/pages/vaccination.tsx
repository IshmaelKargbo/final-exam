import { Layout } from '@components/layout'
import { VaccinationsModule } from '@modules/vaccination/view';
import { ApiServer } from '../common/api';

export default function Home() {
  return (
    <Layout>
      <VaccinationsModule />
    </Layout>
  )
}

export async function getServerSideProps({ req }: any) {
  return ApiServer.Me(req);
}
