import Head from 'next/head';
import Layout from '../components/layout';
import { useAppContext } from '../components/context/state'
import SearchResults from '../components/searchResults';



export default function Search() {
  const {search} = useAppContext();

  return (
    <Layout home>
      <Head>
        <title>Search {search}</title>
      </Head>
      <SearchResults search={search} />
    </Layout>
  );
}