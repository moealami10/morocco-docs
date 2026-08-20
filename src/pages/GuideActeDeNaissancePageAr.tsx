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
        name: 'كيف يتم استخراج acte de naissance عبر الإنترنت في المغرب؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'يمكنك تقديم طلبك عبر بوابة Watiqa (watiqa.ma)، النافذة الإلكترونية الرسمية التي تم تطويرها بشراكة مع وزارة الداخلية، والوكالة الجهوية، وبريد المغرب. ويتم إرسال الوثيقة عبر البريد الموصى به.',
        },
      },
      {
        '@type': 'Question',
        name: 'ما هو الموعد القانوني لإعلان ولادة طفل في المغرب؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'يجب إجراء إعلان الولادة خلال 30 يومًا من تاريخ الولادة في مكتب الحالة المدنية لمكان الولادة (مع延ة سنة للمغاربة المقيمين في الخارج). بعد انتهاء هذه المدة، يتطلب الحكم القضائي وتطبق غرامة مالية تتراوح بين 300 و1200 درهمًا.',
        },
      },
      {
        '@type': 'Question',
        name: 'كيف يمكن للمغاربة المقيمين في الخارج (MRE) الحصول على acte de naissance؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'يمكن للمغاربة المقيمين في الخارجي طلب document através de Watiqa إذا كان بريد المغرب يغطي بلد إقامتهم، أو التواصل مباشرة مع القنصلية المغربية في بلد إقامتهم.',
        },
      },
      {
        '@type': 'Question',
        name: 'ما مدة صلاحية استخراج acte de naissance في المغرب؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'بعض الجهات تطلب acte de naissance risalاً إلى أقل من 3 أشهر، بينما تقبل جهات أخرى نسخة أقدم. من المستحسن التأكد من متطلبات الجهة الطالبة للوثيقة.',
        },
      },
    ],
  }

  const steps = [
    {
      num: 1,
      label: 'الاختيار: الحضور شخصيًا أو عبر الإنترنت (Watiqa)',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM3.5 10a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" clipRule="evenodd" />
          <path d="M10 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
        </svg>
      ),
    },
    {
      num: 2,
      label: 'تقديم المعلومات والسداد',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5v9A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0017.5 4h-15zM3 6.75A.75.75 0 013.75 6h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zm.75 4.25a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 3,
      label: 'استلام الوثيقة عبر البريد الموصى به',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h13A1.5 1.5 0 0118 3.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 012 16.5v-13zM3.5 3h13a.5.5 0 01.5.5v1.652l-7 4.148-7-4.148V3.5a.5.5 0 01.5-.5zM3 6.442v10.058a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V6.442l-6.568 3.892a.75.75 0 01-.864 0L3 6.442z" clipRule="evenodd" />
        </svg>
      ),
    },
  ]

  const SOURCES = [
    {
      name: 'الوكالة الجهوية لتطوير الرقمي',
      url: 'https://add.gov.ma',
      detail: 'add.gov.ma/watiqa (نافذة watiqa.ma الإلكترونية)',
      verifiedDate: '18 أغسطس 2026',
    },
    {
      name: 'Le Matin.ma',
      url: 'https://lematin.ma',
      detail: '"الإطلاق الرسمي لبوابة watiqa.ma"',
      verifiedDate: '18 أغسطس 2026',
    },
    {
      name: 'demarchesmaroc.com',
      url: 'https://demarchesmaroc.com',
      detail: '"الحصول على acte de naissance في المغرب"',
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
        title="acte de naissance بالمغرب — دليل الإجراء الكامل 2026 | Kaghit"
        description="كيف تحصل على acte de naissance بالمغرب: بوابة Watiqa، الإجراء في البلدية، المولود الجديد، والمغتربين. دليل عملي 2026."
        canonicalUrl="https://kaghit.com/ar/guides/acte-de-naissance"
      />

      {/* dynamية البياناتfaq Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* المسار التنقلي */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="مسار التنقل">
        <Link to="/ar" className="hover:text-neutral-900 transition-colors">الصفحة الرئيسية</Link>
        <span>/</span>
        <Link to="/ar/guides" className="hover:text-neutral-900 transition-colors">الأدلة الإرشادية</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">acte de naissance</span>
      </nav>

      <PageHeading
        title="acte de nascita بالمغرب: كيف تحصل عليه (الإجراء 2026)"
        description="جميع الخيارات للحصول بسرعة على acte de naissance: في البلدية، أو عبر الإنترنت، أو من الخارج."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <circle cx="10" cy="13" r="2" />
            <path d="M10 11v-2" />
          </svg>
        }
      />

      <Card className="p-6 sm:p-10 mb-8">
        {/* ── المخطط الزمني المرئي للخطوات (3 خطوات) ── */}
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

        {/* ── محتوى المقالة الرئيسي (النص الدقيق، مُنسق بالعناوین الفرعية) ── */}
        <article className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-700 leading-relaxed">
          <p className="text-base text-neutral-800 font-medium leading-relaxed">
            سواءً لتسجيل طفل في المدرسة، أو فتح حساب بنكي، أو الزواج، أو تجديد بطاقة التعريف، فإن acte de naissance يعود باستمرار في الملفات الإدارية المغربية. إليك كيفية الحصول عليه دون إهدار للوقت.
          </p>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              إذا conoces tu lugar de nacimiento
            </h2>
            <p>
              لديك خياران. الأول: التوجه مباشرة إلى مكتب الحالة المدنية في بلدتك الأصلية. والثاني، الأكثر عملية إذا كنت تعيش بعيدًا عن città natale: استخدام Watiqa (<a href="https://www.watiqa.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">watiqa.ma</a>)، النافذة الإلكترونية الرسمية التي تم تطويرها بشراكة مع وزارة الداخلية، والوكالة الجهوية، وبريد المغرب. تنشئ حسابًا، وتحدد نوع الوثيقة المطلوبة (مقتطف مع أو بدون نسب، أو نسخةintegrale)، وتدخل معلوماتك، وتدفع عبر الإنترنت. ثم تُرسل الوثيقة عبر البريد الموصى به إلى العنوان الذي اخترته — احسب حوالي 24 ساعة معالجة من قبل مكتب الحالة المدنية، ثم حتى 5 أيام للتسليم البريدي.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              بالنسبة للمواليد الجدد
            </h2>
            <p>
              يجب إجراء إعلان الولادة خلال 30 يومًا من الولادة، في مكتب الحالة المدنية لمكان الولادة (ويمدد هذا الأجل إلى سنة للمغاربة المقيمين في الخارج). يمكن للوالد أو الوالدين إنجاز الإعلان؛ وفي حالة عدم المقدرة، يستطيع أحد الأقارب closest أن يقوم بذلك، حسب تسلسل الأولوية المحدد بالقانون. يجب إحضار إشعار الولادة الذي أصدره الطبيب أو القابلة. بعد مرور هذا الأجل، لا يمكن تسجيل الولادة إلا بعد حكم من محكمة الدرجة الأولى لمكان الولادة، وتطبق غرامة تأخير تتراوح بين 300 و 1200 درهمًا.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              المغاربة المقيمون في الخارج (MRE)
            </h2>
            <p>
              تغطي Watiqa أيضًا المغاربة المقيمين في الخارج: يمكنك تقديم طلبك من الخارج، بشرط أن يغطي بريد المغرب بلد إقامتك — نقطة يجب التحقق منها قبل الشحن. وإلا، فإن القنصلية المغربية في بلد إقامتك ما زالت خيارًا كلاسيكيًا.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              شيء يجب التحقق منه قبل التوجه
            </h2>
            <p>
              بعض المؤسسات تطلب acte de naissance risalاً إلى أقل من 3 أشهر، بينما تقبل جهات أخرى نسخة أقدم. من المستحسن التحقق من متطلبات الجهة التي تطلب الوثيقة قبل البدء في الإجراء، لتجنب إعادة الكرّة.
            </p>
          </section>

          <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
            <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="text-primary">💡</span> مثال توضيحي
            </h2>
            <p className="text-neutral-600 text-xs leading-relaxed">
              فاطمة الزهرة ولدت في فاس ولكنها تعيش في الرباط منذ دراستها. لتسجيل ابنها في المدرسة الابتدائية للعام الدراسي، طلبت الإدارة documento de naissance للطفل risalاً إلى أقل من 3 أشهر. بدلًا من القيام برحلة往復 إلى فاس في عطلة الأسبوع، قدمت فاطمة الزهرة طلبًا عبر Watiqa ليل الثلاثاء من أريكتك، دفعت عبر الإنترنت، واستلمت الوثيقة عبر البريد الموصى به إلى منزلها يوم الاثنين التالي — ampliamente في الموعد لملف التسجيل.
            </p>
          </section>

          <p className="pt-2">
            إذا طُلب acte de naissance في سياق ملف جواز السفر أو تجديد بطاقة التعريف، فاعلم أنك ستحتاج أيضًا إلى التحقق من أن صورتك الشخصية تتوافق مع التنسيق الرسمي للمغرب (35×45 مم).
          </p>
        </article>

        {/* ── مربع تنويه ربط بأداة صورة بطاقة التعريف ── */}
        <div className="mt-8 rounded-xl bg-primary-50/60 border border-primary-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm select-none">
              📷
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                هل تحتاج أيضًا إلى صورة هوية بالمعايير؟
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">
                عدل صورتك مجانًا بالتنسيق 35×45 مم.
              </p>
            </div>
          </div>

          <Button as="a" href="/ar/photo-cin" variant="primary" className="shrink-0 text-xs">
            تصغير الصورة →
          </Button>
        </div>

        {/* ── قسم المصادر (منسق distinctly وخفيف مثل التذييل) ── */}
        <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
          <p className="font-semibold text-neutral-500 mb-2">المصادر official والReferences :</p>
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