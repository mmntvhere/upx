import { Routes, Route } from 'react-router-dom'
import Layout from '@/layout/Layout'
import Home from '@/pages/Home'
import CategoryPage from '@/pages/CategoryPage'
import SitePage from '@/pages/SitePage'
import NotFound from '@/pages/NotFound'

const AppRouter = () => {
  return (
    <Routes>

      {/* 🇬🇧 Английская версия без префикса */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="review/:slug" element={<SitePage />} />
        <Route path=":slug" element={<CategoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* 🌐 Версии с языковым префиксом */}
      {[
        'uk', 'fr', 'de', 'es', 'it', 'pt', 'pl', 'nl', 'ru', 'tr', 'ro', 'sv',
        'fi', 'no', 'da', 'cs', 'hu', 'el', 'he', 'hi', 'id', 'vi', 'th', 'ja', 'ko', 'zh', 'ar'
      ].map((lang) => (
        <Route key={lang} path={`${lang}`} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="review/:slug" element={<SitePage />} />
          <Route path=":slug" element={<CategoryPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      ))}

      {/* Глобальный редирект на 404 (все пути, не попавшие в префиксы) */}
      <Route element={<Layout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRouter