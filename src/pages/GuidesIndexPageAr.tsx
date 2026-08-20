import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card } from '../components/ui'
import { Seo } from '../components/Seo'

interface GuideItem {
  to: string
  title: string
  description: string
  readTime: string
}

const GUIDES: GuideItem[] = [
  {
    to: '/ar/guides/casier-judiciaire',
    title: 'كيفية الحصول على السجل العدلي بالمغرب (2026)',
    description:
      'الإجراء عبر الإنترنت على casierjudiciaire.justice.gov.ma، الفرق بين السجل العدلي والبطاقة الأنثروبومترية، الرسوم (10 درهم) ومدة الصلاحية.',
    readTime: '3 دقائق للقراءة',
  },
  {
    to: '/ar/guides/acte-de-naissance',
    title: 'عقد الازدياد بالمغرب: كيفية الحصول عليه (إجراء 2026)',
    description:
      'الحصول على عقد الازدياد من الجماعة أو عبر الإنترنت عبر بوابة وثيقة، آجال التصريح بالولادة (30 يومًا) وحالة المغاربة المقيمين بالخارج.',
    readTime: '3 دقائق للقراءة',
  },
]

const GuidesIndexPageAr: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="الأدلة الإرشادية للإجراءات الإدارية بالمغرب 2026 | Kaghit"
        description="اطلع على أدلتنا العملية لإجراءاتك الإدارية بالمغرب: السجل العدلي، عقد الازدياد، الوثائق المطلوبة والآجال."
        canonicalUrl="https://kaghit.com/ar/guides"
        lang="ar"
      />
      <PageHeading
        title="الأدلة الإرشادية الإدارية"
        description="اطلع على شروحاتنا المفصلة لإنجاح إجراءاتك الإدارية بالمغرب بكل سهولة."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {GUIDES.map((guide) => (
          <Link
            key={guide.to}
            to={guide.to}
            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
          >
            <Card className="h-full flex flex-col justify-between transition-all duration-200 group-hover:shadow-card-hover group-hover:-translate-y-0.5 group-hover:border-neutral-200">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-2 block">
                  {guide.readTime}
                </span>
                <h2 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors duration-150 mb-2">
                  {guide.title}
                </h2>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  {guide.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-primary pt-2 border-t border-neutral-100">
                اقرأ الدليل
                <svg
                  className="w-3.5 h-3.5 rotate-180 transition-transform duration-150 group-hover:-translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GuidesIndexPageAr