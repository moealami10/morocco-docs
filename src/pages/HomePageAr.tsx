import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { Seo } from '../components/Seo'

// ---------------------------------------------------------------------------
// Tool card data for Arabic homepage
// ---------------------------------------------------------------------------
interface ToolAr {
  to: string
  title: string
  description: string
  icon: React.ReactNode
  id: string
}

const TOOLS_AR: ToolAr[] = [
  {
    id: 'card-attestation-ar',
    to: '/attestation-de-travail',
    title: 'شهادة عمل',
    description:
      'أنشئ نموذج شهادة عمل قابل للتخصيص باسم موظفك في بضع ثوانٍ — جاهز للطباعة والتوقيع.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'card-autorisation-ar',
    to: '/autorisation-parentale',
    title: 'إذن الوالدين',
    description:
      'أنشئ إذنًا من الوالدين لطفل قاصر — سفر، رحلة مدرسية أو إجراء إداري.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'card-photo-cin-ar',
    to: '/photo-cin',
    title: 'صورة بطاقة الهوية',
    description:
      'قم بتعديل حجم وتنسيق صورتك بالشكل القياسي (35×45 مم، خلفية بيضاء) مباشرةً من متصفحك.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
]

const HomePageAr: React.FC = () => {
  return (
    <>
      <Seo
        title="أنشئ مستنداتك الإدارية المغربية مجانًا | Kaghit"
        description="أنشئ مستنداتك الإدارية المغربية ببضع نقرات — شهادة عمل، إذن الوالدين، صورة بطاقة الهوية — مجانًا، دون تسجيل."
        canonicalUrl="https://kaghit.com/ar"
        lang="ar"
        alternates={[
          { hrefLang: 'fr', href: 'https://kaghit.com/' },
          { hrefLang: 'ar', href: 'https://kaghit.com/ar' },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white border-b border-neutral-100">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 50%, #C1272D 0%, transparent 60%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary mb-6 border border-primary-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            مجانًا · سريع · دون تسجيل
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl max-w-3xl leading-[1.25]">
            أنشئ مستنداتك الإدارية المغربية{' '}
            <span className="text-primary">ببضع نقرات</span>
          </h1>

          <p className="mt-6 text-lg text-neutral-500 max-w-2xl leading-relaxed">
            شهادة عمل، إذن الوالدين، صورة بطاقة الهوية — مجانًا، دون تسجيل
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="#outils" variant="primary">
              عرض الأدوات
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
              </svg>
            </Button>
            <Button as="a" href="/attestation-de-travail" variant="secondary">
              ابدأ الآن
            </Button>
          </div>

          {/* Stats strip */}
          <dl className="mt-12 flex flex-wrap gap-6 sm:gap-10">
            {[
              { value: '100%', label: 'مجانًا' },
              { value: '0', label: 'بدون تسجيل' },
              { value: '3', label: 'أدوات متاحة' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-neutral-500">{stat.label}</dt>
                <dd className="text-2xl font-bold text-neutral-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Tools grid ── */}
      <section
        id="outils"
        aria-labelledby="outils-heading"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <div className="mb-10">
          <h2
            id="outils-heading"
            className="text-2xl font-bold text-neutral-900 sm:text-3xl"
          >
            أدواتنا
          </h2>
          <p className="mt-2 text-neutral-500">
            اختر المستند الذي ترغب في إنشائه.
          </p>
          <div className="mt-3 h-0.5 w-12 rounded-full bg-primary" aria-hidden="true" />
        </div>

        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="قائمة الأدوات المتاحة"
        >
          {TOOLS_AR.map((tool) => (
            <li key={tool.to}>
              <Link
                to={tool.to}
                id={tool.id}
                className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                aria-label={tool.title}
              >
                <Card
                  as="article"
                  className="h-full flex flex-col gap-4 transition-all duration-200 group-hover:shadow-card-hover group-hover:-translate-y-0.5 group-hover:border-neutral-200"
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                    {tool.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-neutral-900 group-hover:text-primary transition-colors duration-150">
                      {tool.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* CTA arrow */}
                  <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                    إنشاء
                    <svg
                      className="w-4 h-4 rotate-180 transition-transform duration-150 group-hover:-translate-x-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── How it works strip ── */}
      <section
        aria-labelledby="comment-heading"
        className="border-t border-b border-neutral-100 bg-neutral-50"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h2
            id="comment-heading"
            className="text-xl font-bold text-neutral-900 sm:text-2xl mb-8 text-center"
          >
            كيف يعمل الموقع؟
          </h2>
          <ol className="grid gap-6 sm:grid-cols-3" role="list">
            {[
              {
                step: '01',
                title: 'املأ النموذج',
                body: 'أدخل معلوماتك مباشرة في النموذج عبر الإنترنت — لا يلزم وجود حساب.',
              },
              {
                step: '02',
                title: 'عاين المستند',
                body: 'يتم إنشاء المستند فورًا في متصفحك. تحقق من كل معلومة.',
              },
              {
                step: '03',
                title: 'حمّل ملف PDF',
                body: 'قم بتصدير المستند كملف PDF جاهز للطباعة والتوقيع والختم.',
              },
            ].map((item) => (
              <li
                key={item.step}
                className="flex flex-col gap-3 bg-white rounded-xl p-6 shadow-card border border-neutral-100"
              >
                <span className="text-3xl font-black text-primary-100 leading-none select-none">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Trust Section (Exact Arabic text from prompt) ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Card className="p-6 sm:p-10 bg-neutral-50/80 border-neutral-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-neutral-900">
              بياناتك تظل سرية
            </h2>
          </div>

          <ul className="space-y-3 text-sm text-neutral-800 font-medium mb-8">
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
              لا حاجة للتسجيل
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
              يتم إنشاء المستندات مباشرةً في متصفحك — ولا يتم إرسال بياناتك أبدًا إلى خوادمنا
            </li>
          </ul>

          <div className="p-4 rounded-xl bg-white border border-neutral-200/80 text-xs text-neutral-600 leading-relaxed">
            Kaghit ليست خدمة حكومية — نحن نساعدك في إعداد إجراءاتك وفهمها، ونشير دائمًا إلى مصادرنا الرسمية
          </div>
        </Card>
      </section>
    </>
  )
}

export default HomePageAr
