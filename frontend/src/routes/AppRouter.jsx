import { Routes, Route } from 'react-router-dom'
import { SUPPORTED_LANGUAGES } from '@/config/languages'
import Layout from '@/layout/Layout'
import Home from '@/pages/Home'
import SitePage from '@/pages/SitePage'
import DynamicSlugPage from '@/pages/DynamicSlugPage'
import NotFound from '@/pages/NotFound'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 🇬🇧 Английская версия без префикса (по умолчанию) */}
        <Route index element={<Home />} />
        <Route path="review/:slug" element={<SitePage />} />
        <Route path=":slug" element={<DynamicSlugPage />} />

        {/* 🌐 Остальные языковые префиксы (динамически из конфига) */}
        {SUPPORTED_LANGUAGES.map((lang) => (
          <Route key={lang} path={lang}>
            <Route index element={<Home />} />
            <Route path="review/:slug" element={<SitePage />} />
            <Route path=":slug" element={<DynamicSlugPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ))}

        {/* Глобальный 404 (для всех остальных путей) */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRouter