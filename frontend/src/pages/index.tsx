import { Layout } from "@components/layout";
import { ApiServer } from "../common/api";

export default function Home() {
  return (
    <Layout>
      <iframe
        src="http://localhost:5601/app/dashboards#/view/50f034a0-c12a-11ed-a2c1-035f1d8fac89?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3Anow-1y%2Cto%3Anow))&hide-filter-bar=true"
        height="100%"
        width="100%"
      ></iframe>
    </Layout>
  );
}

export async function getServerSideProps({ req }: any) {
  return ApiServer.Me(req);
}
