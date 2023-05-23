import Layout from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

/**
 * 모든 페이지 컴포넌트는 _app.tsx의 App 컴포넌트를 통해서 생성된다. 
 * 따라서 _app.tsx는 전역적인 설정을 하기에 좋은 포인트이다
 */

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
