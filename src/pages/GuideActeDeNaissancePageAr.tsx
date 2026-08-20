import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const GuideActeDeNaissancePageAr: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'كيف يمكن الحصول على عقد الازدياد عبر الإنترنت بالمغرب؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'يمكنك تقديم الطلب عبر بوابة وثيقة (watiqa.ma)، البوابة الإلكترونية الرسمية المطورة بشراكة بين وزارة الداخلية، وكالة التنمية الرقمية وبريد المغرب. يتم إرسال الوثيقة إليك عبر البريد المضمون.',
        },
      },
      {
        '@type': 'Question',
        name: 'ما هو الأجل القانوني للتصريح بولادة طفل بالمغرب؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'يجب التصريح بالولادة خلال 30 يومًا من تاريخ الولادة لدى مكتب الحالة المدنية لمكان الولادة (يمدد الأجل إلى سنة بالنسبة للمغاربة المقيمين بالخارج). بعد هذا الأجل، يلزم حكم قضائي وتطبق غرامة مالية.',
        },
      },
    ],
  }

  const steps = [
    {
      num: 1,
      label: 'الاختيار: في عين المكان أو عبر الإنترنت (وثيقة)',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM3.5 10a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" clipRule="evenodd" />
          <path d="M10 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
        </svg>
      ),
    },
    {
      num: 2,
      label: 'إدخال البيانات وأداء الواجبات',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5v9A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0017.5 4h-15zM3 6.75A.75.75 0 013.75 6h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zm.75 4.25a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 3,
      label: 'استلام الوثيقة عبر البريد المضمون',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h13A1.5 1.5 0 0118 3.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 012 16.5v-13zM3.5 3h13a.5.5 0 01.5.5v1.652l-7 4.148-7-4.148V3.5a.5.5 0 01.5-.5zM3 6.442v10.058a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V6.442l-6.568 3.892a.75.75 0 01-.864 0L3 6.442z" clipRule="evenodd" />
        </svg>
      ),
    },
  ]

  const SOURCES = [
    {
      name: 'وكالة التنمية الرقمية',
      url: 'https://add.gov.ma',
      detail: 'add.gov.ma/watiqa (البوابة الإلكترونية watiqa.ma)',
      verifiedDate: '18 أغسطس 2026',
    },
    {
      name: 'جريدة الصحراء المغربية / Le Matin',
      url: 'https://lematin.ma',
      detail: '"الإطلاق الرسمي لبوابة watiqa.ma"',
      verifiedDate: '18 أغسطس 2026',
    },
    {
      name: 'demarchesmaroc.com',
      url: 'https://demarchesmaroc.com',
      detail: '"الحصول على عقد الازدياد بالمغرب"',
      verifiedDate: '18 أغسطس 2026',
    },
    {
      name: 'القانون رقم 37-99 المتعلق بالحالة المدنية',
      url: undefined,
      detail: 'ومرسومه التطبيقي رقم 2-99-665 (المواد 15-17)',
      verifiedDate: '18 أغسطس 2026',
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="عقد الازدياد بالمغرب — الدليل الكامل 2026 | Kaghit"
        description="كيفية الحصول على عقد الازدياد بالمغرب: بوابة وثيقة، الإجراءات في الجماعة، المواليد الجدد والمغاربة المقيمون بالخارج."
        canonicalUrl="https://kaghit.com/ar/guides/acte-de-naissance"
        lang="ar"
      />

      {/* Structured data FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="مسار التنقل">
        <Link to="/ar" className="hover:text-neutral-900 transition-colors">الصفحة الرئيسية</Link>
        <span>/</span>
        <Link to="/ar/guides" className="hover:text-neutral-900 transition-colors">الأدلة الإرشادية</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">عقد الازدياد</span>
      </nav>

      <PageHeading
        title="عقد الازدياد بالمغرب : كيفية الحصول عليه (دليل 2026)"
        description="جميع الخيارات للحصول على عقد الازدياد بسرعة: في الجماعة، عبر الإنترنت، أو من الخارج."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <circle cx="10" cy="13" r="2" />
            <path d="M10 11v-2" />
          </svg>
        }
      />

      <Card className="p-6 sm:p-10 mb-8">
        {/* Step visual timeline */}
        <div className="mb-8 rounded-xl bg-neutral-50 border border-neutral-100 p-5">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
            نظرة عامة على الإجراء في 3 خطوات
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="flex items-start gap-3 bg-white p-3.5 rounded-lg border border-neutral-100 shadow-xs">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  {s.num}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    {s.icon}
                    <span className="text-[11px] font-semibold text-neutral-400">الخطوة {s.num}</span>
                  </div>
                  <p className="text-xs font-medium text-neutral-900 leading-snug">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Article content */}
        <article className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-700 leading-relaxed">
          <p className="text-base text-neutral-800 font-medium leading-relaxed">
            سواءً لتسجيل طفل في المدرسة، أو فتح حساب بنكي، أو الزواج، أو تجديد بطاقة التعريف الوطنية، فإن عقد الازدياد يُطلب باستمرار في المعاملات الإدارية المغربية. إليك كيفية الحصول عليه بسهولة.
          </p>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              إذا كنت تعرف مكان ولادتك
            </h2>
            <p>
              لديك خياران: الأول هو التوجه مباشرة إلى مكتب الحالة المدنية بالجماعة التي ولدت فيها. والخيار الثاني والأكثر سهولة إذا كنت تقيم بعيداً عن مسقط رأسك: التقديم عبر بوابة وثيقة (<a href="https://www.watiqa.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">watiqa.ma</a>)، وهي الشباك الإلكتروني الرسمي المطور بشراكة بين وزارة الداخلية ووكالة التنمية الرقمية وبريد المغرب. تقوم بإنشاء حساب، اختيار نوع العقد المطلوب (عقد ازدياد، نسخة موجزة أو نسخة كاملة)، إدخال البيانات والدفع عبر الإنترنت. تُرسل الوثيقة بعد ذلك عبر البريد المضمون إلى عنوانك.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              بالنسبة للمواليد الجدد
            </h2>
            <p>
              يجب التصريح بالولادة داخل أجل 30 يوماً من تاريخ الولادة لدى مكتب الحالة المدنية لمكان الولادة (ويمدد هذا الأجل إلى سنة بالنسبة للمغاربة المقيمين بالخارج). يتكفل الأب أو الأم بالتصريح، وفي حالة التعذر يقوم بذلك أحد الأقارب حسب أولوية القانون، مع إحضار شهادة الولادة المسلمة من الطبيب أو القابلة.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              المغاربة المقيمون بالخارج (MRE)
            </h2>
            <p>
              تتيح خدمة وثيقة للمغاربة المقيمين بالخارج طلب عقد الازدياد إلكترونياً وتسلّمه عبر البريد الدولي المضمون، أو التوجه مباشرة إلى قنصلية المملكة المغربية التابع لها محل إقامتهم.
            </p>
          </section>

          <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
            <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="text-primary">💡</span> مثال توضيحي
            </h2>
            <p className="text-neutral-600 text-xs leading-relaxed">
              فاطمة الزهرة ولدت بمدينة فاس وتستقر حالياً بالرباط. لتسجيل ابنها بالمركب المدرسي، طلبت الإدارة عقد ازدياد حديث العهد. بفضل بوابة وثيقة، قامت بطلب العقد عبر الإنترنت وتسلمته عبر البريد المضمون بمقر سكنها بالرباط دون الحاجة للسفر إلى مدينة فاس.
            </p>
          </section>
        </article>

        {/* Callout Box */}
        <div className="mt-8 rounded-xl bg-primary-50/60 border border-primary-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm select-none">
              📷
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                هل تحتاج أيضاً إلى صورة هوية بالمواصفات الرسمية؟
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">
                قم بتعديل صورتك مجاناً بالتنسيق الرسمي 35×45 مم.
              </p>
            </div>
          </div>

          <Button as="a" href="/ar/photo-cin" variant="primary" className="shrink-0 text-xs">
            تنسيق الصورة ←
          </Button>
        </div>

        {/* Sources section */}
        <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
          <p className="font-semibold text-neutral-500 mb-2">المصادر الرسمية والمراجع:</p>
          <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
            {SOURCES.map((src, i) => (
              <li key={i}>
                {src.url ? (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
                  >
                    {src.name}
                  </a>
                ) : (
                  <strong className="font-bold text-neutral-700">{src.name}</strong>
                )}{' '}
                — {src.detail} · <span className="italic text-neutral-400">تم التحقق: {src.verifiedDate}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default GuideActeDeNaissancePageAr