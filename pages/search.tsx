import dynamic from 'next/dynamic';

const Layout = dynamic(import('../components/Layout'));

export default function Search() {
  return <Layout>Searching for you</Layout>;
}
