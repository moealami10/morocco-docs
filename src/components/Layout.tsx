import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

// ---------------------------------------------------------------------------
// Nav items config
// ---------------------------------------------------------------------------
interface NavItem {
  to: string
  label: string
}

const NAV_ITEMS_FR: NavItem[] = [
  { to: '/attestation-de-travail', label: 'Attestation de travail' },
  { to: '/autorisation-parentale', label: 'Autorisation parentale' },
  { to: '/photo-cin', label: 'Photo CIN' },
  { to: '/guides', label: 'Guides' },
  { to: '/objectifs', label: 'Objectifs' },
]

const NAV_ITEMS_AR: NavItem[] = [
  { to: '/ar', label: 'الصفحة الرئيسية' },
  { to: '/ar/attestation-de-travail', label: 'شهادة عمل' },
  { to: '/ar/autorisation-parentale', label: 'إذن الوالدين' },
  { to: '/ar/photo-cin', label: 'صورة بطاقة الهوية' },
  { to: '/ar/guides', label: 'الأدلة الإرشادية' },
  { to: '/ar/objectifs', label: 'الأهداف' },
]

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isArabic = location.pathname.startsWith('/ar')
  const navItems = isArabic ? NAV_ITEMS_AR : NAV_ITEMS_FR

  const activeLinkClass =
    'text-primary font-semibold border-b-2 border-primary pb-0.5'
  const inactiveLinkClass =
    'text-neutral-600 hover:text-neutral-900 transition-colors duration-150'

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-100 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to={isArabic ? '/ar' : '/'}
            className="flex items-center gap-2 group shrink-0"
            aria-label="Kaghit — accueil"
          >
            {/* Icon mark */}
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm select-none group-hover:bg-primary-600 transition-colors duration-150"
              aria-hidden="true"
            >
              K
            </span>
            <span className="text-lg font-bold tracking-tight text-neutral-900">
              Kaghit
            </span>
          </Link>

          {/* Desktop nav + Language Switcher */}
          <div className="hidden md:flex items-center gap-6">
            <nav aria-label={isArabic ? 'التنقل الرئيسي' : 'Navigation principale'} className="flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/ar' || item.to === '/'}
                  className={({ isActive }) =>
                    `text-sm ${isActive ? activeLinkClass : inactiveLinkClass}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Language Switcher Button */}
            <button
              onClick={() => {
                if (isArabic) {
                  // Currently in Arabic, switch to French by removing /ar prefix
                  const pathWithoutAr = location.pathname.substring(3) // Remove '/ar'
                  window.location.href = pathWithoutAr === '' ? '/' : pathWithoutAr
                } else {
                  // Currently in French, switch to Arabic by adding /ar prefix
                  window.location.href = '/ar' + location.pathname
                }
              }}
              className="inline-flex items-center justify-center rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900 transition-colors shrink-0"
              aria-label="Changer de langue / تغيير اللغة"
            >
              العربية / Français
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Language Switcher Button for Mobile Header */}
            <button
              onClick={() => {
                if (isArabic) {
                  // Currently in Arabic, switch to French by removing /ar prefix
                  const pathWithoutAr = location.pathname.substring(3) // Remove '/ar'
                  window.location.href = pathWithoutAr === '' ? '/' : pathWithoutAr
                } else {
                  // Currently in French, switch to Arabic by adding /ar prefix
                  window.location.href = '/ar' + location.pathname
                }
              }}
              className="inline-flex items-center justify-center rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 transition-colors"
              aria-label="Changer de langue / تحويل اللغة"
            >
              العربية / Français
            </button>

            <button
              className="flex items-center justify-center rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 transition-colors duration-150"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav
          aria-label={isArabic ? 'تنقل الهاتف المحمول' : 'Navigation mobile'}
          className="md:hidden border-t border-neutral-100 bg-white"
        >
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/ar' || item.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-primary bg-primary-50'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  const location = useLocation()
  const isArabic = location.pathname.startsWith('/ar')

  return (
    <footer className="border-t border-neutral-100 bg-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <Link
            to={isArabic ? '/ar' : '/'}
            className="text-sm font-bold text-neutral-900 hover:text-primary transition-colors duration-150 shrink-0"
          >
            Kaghit
          </Link>

          {/* Disclaimer */}
          <p className="text-xs text-neutral-500 leading-relaxed max-w-xl">
            {isArabic ? (
              'تُنتج هذه الأداة مستندات ذات طابع عملي؛ وهي لا تشكل مشورة قانونية أو ضريبية، وقد يتطلب المستند الناتج توقيعًا أو ختمًا أو تصديقًا حسب الغرض من استخدامه.'
            ) : (
              'Cet outil génère des documents à usage pratique ; il ne constitue pas un conseil juridique ou fiscal, et le document généré peut nécessiter signature, cachet ou légalisation selon son usage.'
            )}
          </p>

          {/* Trust link */}
          <div className="flex items-center gap-2 text-xs">
            <Link
              to={isArabic ? '/ar/confidentialite' : '/confidentialite'}
              className="text-neutral-500 hover:text-neutral-900 transition-colors duration-150"
            >
              {isArabic ? 'سياسة الخصوصية' : 'Confidentialité'}
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-400">
          {isArabic
            ? `© ${year} Kaghit — جميع الحقوق محفوظة.`
            : `© ${year} Kaghit — Tous droits réservés.`}
        </div>
      </div>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// Layout (shell)
// ---------------------------------------------------------------------------
interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const isArabic = location.pathname.startsWith('/ar')

  useEffect(() => {
    if (isArabic) {
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.setAttribute('lang', 'ar')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'fr')
    }
  }, [isArabic])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 page-enter">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
