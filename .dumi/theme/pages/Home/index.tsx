import { Helmet } from 'dumi';
import { memo, type FC } from 'react';

//@ts-ignore
import Features from 'dumi/theme/slots/Features';
//@ts-ignore
import Footer from 'dumi/theme/slots/Footer';
//@ts-ignore
import Header from 'dumi/theme/slots/Header';
//@ts-ignore
import Hero from 'dumi/theme/slots/Hero';
import { Flexbox } from 'react-layout-kit';

const Home: FC = memo(() => (
  <>
    <Flexbox align={'center'} gap={80}>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </Flexbox>
  </>
));

export default Home;
