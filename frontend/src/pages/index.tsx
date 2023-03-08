import { Layout } from "@components/layout";
import { HomePageModule } from "@modules/home/view";
import { ApiServer } from "../common/api";

export default function Home() {
  return <Layout>
    <HomePageModule />
  </Layout>;
}

export async function getServerSideProps({ req }: any) {
  return ApiServer.Me(req);
}
