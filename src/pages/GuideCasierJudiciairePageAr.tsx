import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const GuideCasierJudiciairePageAr: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'ما هو السجل العدلي (النشرة رقم 3) وكيف يمكن الحصول عليه بالمغرب؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'السجل العدلي هو وثيقة رسمية تسلمها وزارة العدل تشهد بوجود أو عدم وجود سوابق قضائية. يمكن التقديم عليه إلكترونياً عبر البوابة الرسمية casierjudiciaire.justice.gov.ma واختيار طريقة الاستلام المناسبة.',
        },
      },
      {
        '@type': 'Question',
        name: 'ما الفرق بين السجل العدلي والبطاقة الأنثروبومترية؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'السجل العدلي (النشرة رقم 3) تصدره وزارة العدل للمغاربة والأجانب، بينما البطاقة الأنثروبومترية تصدرها المديرية العامة للأمن الوطني (الشرطة) وتخص المواطنين المغاربة فقط.',
        },
      },
      {
        '@type': 'Question',
        name: 'ما هي مدة صلاحية السجل العدلي وتكلفته؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'تبلغ مدة صلاحية السجل العدلي 3 أشهر من تاريخ إصداره، وتبلغ الرسوم الرسمية حوالي 10 دراهم (طابع مالي).',
        },
      },
    ],
  }

  const steps = [
    {
      num: 1,
      label: 'الدخول إلى البوابة casierjudiciaire.justice.gov.ma',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM3.5 10a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" clipRule="evenodd" />
          <path d="M10 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
        </svg>
      ),
    },
    {
      num: 2,
      label: 'تعبئة استمارة الطلب بالمعلومات الشخصية',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5v9A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0017.5 4h-15zM3 6.75A.75.75 0 013.75 6h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zm.75 4.25a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 3,
      label: 'تحديد طريقة الاستلام والأداء',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5v9A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0017.5 4h-15zM3 6.75A.75.75 0 013.75 6h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zm.75 4.25a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 4,
      label: 'سحب الوثيقة من المحكمة أو عبر البريد',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
      ),
    },
  ]

  const SOURCES = [
    {
      name: 'وزارة العدل — البوابة الرسمية casierjudiciaire.justice.gov.ma',
      url: 'https://casierjudiciaire.justice.gov.ma',
      detail: 'طلب السجل العدلي إلكترونياً (النشرة رقم 3)',
      verifiedDate: '18 أغسطس 2026',
    },
    {
      name: 'demarchesmaroc.com',
      url: 'https://demarchesmaroc.com',
      detail: '"السجل العدلي: كيفية الطلب بالمغرب وبالخارج"',
      verifiedDate: '18 أغسطس 2026',
    },
    {
      name: 'avocatrabat.com',
      url: 'https://avocatrabat.com',
      detail: '"السجل العدلي المغربي بالنسبة للأجانب"',
      verifiedDate: '18 أغسطس 2026',
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="السجل العدلي بالمغرب 2026 — كيفية الحصول عليه | Kaghit"
        description="الدليل الكامل 2026 للحصول على خلاصة السجل العدلي (النشرة رقم 3) أو البطاقة الأنثروبومترية بالمغرب: الإجراءات عبر الإنترنت، السعر والآجال."
        canonicalUrl="https://kaghit.com/ar/guides/casier-judiciaire"
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
        <span className="text-neutral-900 font-medium">السجل العدلي</span>
      </nav>

      <PageHeading
        title="كيفية الحصول على السجل العدلي بالمغرب (دليل 2026)"
        description="الإجراءات خطوة بخطوة لطلب النشرة رقم 3 أو البطاقة الأنثروبومترية إلكترونياً أو بالمحكمة."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        }
      />

      <Card className="p-6 sm:p-10 mb-8">
        {/* Step visual timeline */}
        <div className="mb-8 rounded-xl bg-neutral-50 border border-neutral-100 p-5">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
            نظرة عامة على الإجراء في 4 خطوات
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-neutral-100 shadow-xs">
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
            يُطلب السجل العدلي باستمرار في العديد من المعاملات المغربية — التوظيف الجديد، طلب الفيزا، التسجيل الجامعي أو ملف الزواج. والخبر السار أن الخدمة ممتدة إلكترونياً بالكامل للحصول عليها بسرعة من هاتفك أو حاسوبك.
          </p>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              تقديم الطلب عبر الإنترنت
            </h2>
            <p>
              قم بزيارة البوابة الرسمية لوزارة العدل <a href="https://casierjudiciaire.justice.gov.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">casierjudiciaire.justice.gov.ma</a>. تملأ استمارة الطلب بتحديد مكان الولادة والمعلومات الشخصية، ثم تختار طريقة الاستلام المناسبة: السحب من المحكمة الابتدائية الأقرب إليك، أو التوصل بها عبر البريد المضمون.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              أيهما تطلب: السجل العدلي أم البطاقة الأنثروبومترية؟
            </h2>
            <p>
              كلا الوثيقتين تشهدان على الوضع القضائي، لكنهما تصدران عن إدارتين مختلفين: السجل العدلي (النشرة رقم 3) تصدره وزارة العدل للمغاربة والأجانب، في حين أن البطاقة الأنثروبومترية تصدرها مصالح الشرطة (DGSN) وتخص المواطنين المغاربة فقط.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              الرسوم والصلاحية
            </h2>
            <p>
              تبلغ الرسوم حوالي 10 دراهم للسجل العدلي (طابع مالي)، والوثيقة صالحة لمدة 3 أشهر فقط من تاريخ الإصدار.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              إذا تم الطلب بواسطة وكيل
            </h2>
            <p>
              يمكن ذلك بشرط تقديم توكيل خاص ومصادق عليه مرفقاً ببطاقة تعريف الوكيل، لأن الوثيقة تسلم مبدئياً للمعني بالأمر.
            </p>
          </section>

          <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
            <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="text-primary">💡</span> مثال توضيحي
            </h2>
            <p className="text-neutral-600 text-xs leading-relaxed">
              كريم حصل مؤخراً على فرصة عمل بشركة في الدار البيضاء، وطلب منه المشغل سجلاً عدلياً حديثاً. دخل كريم صباح الاثنين إلى الموقع الرسمي لوزارة العدل وقدم طلبه إلكترونياً، وتوجه للمحكمة القريبة منه لاستلامه في موعده لتوقيع العقد.
            </p>
          </section>
        </article>

        {/* Callout box */}
        <div className="mt-8 rounded-xl bg-primary-50/60 border border-primary-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm select-none">
              K
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                هل تحتاج أيضاً إلى شهادة عمل لنفس الملف؟
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">
                قم بإنشاء شهادة العمل الخاصة بك مجاناً وفورياً.
              </p>
            </div>
          </div>

          <Button as="a" href="/ar/attestation-de-travail" variant="primary" className="shrink-0 text-xs">
            إنشاء مجاناً ←
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

export default GuideCasierJudiciairePageAr