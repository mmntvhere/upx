import { Link } from "react-router-dom"

const Header = () => {

  return (
    <header className="bg-[#141415] w-full">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto py-4">
        <div className="flex justify-between items-center">
          {/* 🔗 Логотип-кнопка */}
          <Link to="/" className="mx-auto md:mx-0">
            <img src="/logo.svg" alt="Logo" className="h-6 md:h-8" />
          </Link>

          {/* 🧭 Навигация (десктоп) */}
          <nav className="hidden md:flex space-x-2 bg-[#1f1f1f] rounded-xl p-1">
            {["Головна", "Сторінка 1", "Сторінка 2", "Сторінка 3"].map((label, idx) => (
              <button
                key={idx}
                className={`text-sm px-4 py-2 rounded-[12px] ${
                  idx === 0
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-[#2a2a2a] transition"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header