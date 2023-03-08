import { Layout } from '@components/layout'
import { VaccinationsModule } from '@modules/vaccination/view';

export default function Home() {
  return (
    <Layout>
      <VaccinationsModule />
    </Layout>
  )
}
