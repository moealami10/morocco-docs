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
        name: 'كيف يتم طلب casier judiciaire عبر الإنترنت في المغرب؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'يرجى visitar casierjudiciaire.justice.gov.ma. املأ استمارة الطلب عبر الإنترنت، ثم اختر طريقة الاستلام: في المحكمة، أو في الإدارة المركزية بالرباط، أو عبر البريد الآمن (25 درهمًا داخل المغرب، 40 درهمًا إلى الخارج)، أو عبر البريد الإلكتروني إذا كان هاتفك متوافقًا مع NFC مع البطاقة الوطنية البيومترية الجديدة.',
        },
      },
      {
        '@type': 'Question',
        name: 'ما الفرق بين casier judiciaire و الملف الأنثروبومتري؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'الcasier judiciaire (النشرة رقم 3) تصدرها وزارة العدل وتختص بالمغاربة والأجانب. أما الملف الأنثروبومتري فتصدره المديرية العامة للأمن الوطني (الشرطة) ويحصر على المواطنين المغاربة فقط.',
        },
      },
      {
        '@type': 'Question',
        name: 'كم يكلف استخراج casier judiciaire في المغرب؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'يُقدَّر تكلفته بحوالي 10 دراهم للcasier judicial (الضريبي المالي) و30 درهمًا للملف الأنثروبومتري، بالإضافة إلى مصاريف التوصيل إذا أُرسل عن طريق البريد. وثيقتا الصلاحية لمدة 3 أشهر.',
        },
      },
      {
        '@type': 'Question',
        name: 'هل يمكن لشخص آخر أن يطلب casier judicial نيابةً عني؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'نعم، ولكن فقط بوصاية خاصة موثقة ومرفقة ببطاقة هوية الوكيل.',
        },
      },
    ],
  }

  const steps = [
    {
      num: 1,
      label: 'الاتصال بالبوابة الرسمية',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4.03 6.28a.75.75 0 00-1.06-1.06L4.97 9.47a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06-1.06L6.81 10.5h6.44a.75.75 0 000-1.5H6.81l1.47-1.22z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 2,
      label: 'ملء استمارة الطلب',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 3,
      label: 'اختيار طريقة الاستلام',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M3 3.5A1.5 1.5 0 014.5 2h11A1.5 1.5 0 0117 3.5v13a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13zM4.5 3.5v13h11v-13h-11z" />
          <path fillRule="evenodd" d="M6.5 6.5a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 4,
      label: 'استلام الوثيقة',
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
      detail: 'طلب casier judiciaire عبر الإنترنت (النشرة رقم 3)',
      verifiedDate: '18 أغسطس 2026',
    },
    {
      name: 'demarchesmaroc.com',
      url: 'https://demarchesmaroc.com',
      detail: '"الcasier judicial: الطلب في المغرب والخارج"',
      verifiedDate: '18 أغسطس 2026',
    },
    {
      name: 'avocatrabat.com',
      url: 'https://avocatrabat.com',
      detail: '"الcasier judicial المغربي للأجانب"',
      verifiedDate: '18 أغسطس 2026',
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="استخراج casier judiciaire بالمغرب 2026 — كيف تحصل عليه | Kaghit"
        description="دليل شامل 2026 للحصول على casier judiciaire (النشرة رقم 3) أو الملف الأنثروبومتري بالمغرب: الإجراء عبر الإنترنت، التكلفة (10 درهم) والأوقات."
        canonicalUrl="https://kaghit.com/ar/guides/casier-judiciaire"
      />

      {/* ديناميكية البياناتfaq Schema */}
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
        <span className="text-neutral-900 font-medium">casier judiciaire</span>
      </nav>

      <PageHeading
        title="كيف تحصل على casier judiciaire بالمغرب (2026)"
        description="الإجراء步骤 خطوة بخطوة لطلب النشرة رقم 3 أو الملف الأنثروبومتري عبر الإنترنت أو في المكاتب."
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
        {/* ── المخطط الزمني المرئي للخطوات (4 خطوات) ── */}
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

        {/* ── محتوى المقالة الرئيسي (النص الدقيق، مُنسق بالعناوین الفرعية) ── */}
        <article className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-700 leading-relaxed">
          <p className="text-base text-neutral-800 font-medium leading-relaxed">
            يعود casier judiciaire بشكل متكرر في العديد من الإجراءات الإدارية المغربية — وظيفة جديدة، طلب تأشيرة، تسجيل جامعي، ملف زواج. والخبر السار: الخدمة تم رقمنتها بالكامل لسنوات الآن، والحصول عليها يستغرق بضع دقائق عبر الإنترنت بدلاً من صبحية كاملة في المحكمة.
          </p>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              تقديم الطلب عبر الإنترنت
            </h2>
            <p>
              قم بزيارة <a href="https://casierjudiciaire.justice.gov.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">casierjudiciaire.justice.gov.ma</a>، البوابة الرسمية لوزارة العدل. بعد قبول شروط الاستخدام وإدخال مكان الولادة (في المغرب أو بالخارج)، تملأ استمارة الطلب، تتحقق من المعلومات المدخلة، ثم تختار كيف تستلم وثيقتك: في المحكمة الابتدائية التي تختارها، أو في الإدارة المركزية للوزارة بالرباط، أو عبر البريد المؤمّن (25 درهمًا رسوم توصيل داخل المغرب، 40 درهمًا للخارج)، أو مباشرة عبر البريد الإلكتروني إذا كان هاتفك متوافقًا مع NFC وكنت تحمل البطاقة الوطنية البيومترية الجديدة. يوجد أيضًا تطبيق جوال لإجراء الطلب من هاتف ذكي.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              أي وثيقة تطلب: casier judiciaire أم الملف الأنثروبومتري؟
            </h2>
            <p>
              كلاهما يشهدان على وضعك القضائي، لكنهما لايصدران عن نفس الإدارة. casier judiciaire — والمعروف رسميًا باسم "النشرة رقم 3" — يصدره وزارة العدل ويتعلق بالمغاربة والأجانب. أما الملف الأنثروبومتري، فتصدره المديرية العامة للأمن الوطني (الشرطة) ويحصر على المغاربة فقط. في حالة الشك في whichever يطلبونك، من الأفضل الاتصال مباشرة بالجهة المعنية بدلًا من الخطأ في الوثيقة.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              التكلفة والصلاحية
            </h2>
            <p>
              تكلف حوالي 10 دراهم للcasier judicial (من خلال طابع مالي) و30 درهمًا للملف الأنثروبومتري، بالإضافة إلى مصاريف التوصيل إذا اخترت الاستلام عبر البريد. وثيقتا الصلاحية لمدة 3 أشهر فقط — لذا لا تطلبها مبكرًا جدًا относительно ملفك.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              إذا تم الطلب بواسطة طرف ثالث نيابةً عنك
            </h2>
            <p>
              هذا ممكن،但仅 مع توكيل خاص موثق، مصحوب ببطاقة هوية الوكيل. بدونه، سترفض الإدارة الطلب: النشرة رقم 3 في原则上 تُسلَّم يدويًا إلى المعني بالأمر.
            </p>
          </section>

          <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
            <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="text-primary">💡</span> مثال واقعي
            </h2>
            <p className="text-neutral-600 text-xs leading-relaxed">
              كريم حصل recientemente على وظيفة في شركة بالدار البيضاء. صاحب عمله المستقبلي طلب منه casier judicial يعود لشهرين قبل توقيع العقد. صباح يوم الاثنين، وذلك من خلال هاتفه، دخل إلى casierjudiciaire.justice.gov.ma، وملأ الاستمارة في بضع دقائق، واختار استلام الوثيقة من المحكمة الابتدائية الأقرب إلى سكنه عوض انتظار البريد. بعد يومين، حصل على الوثيقة في يده — 걸쳐ً largement في الموعد لتوقيع العقد يوم الجمعة.
            </p>
          </section>

          <p className="pt-2">
            بمجرد حصولك على الوثيقة، فكر في التحقق مما إذا كان نفس الملف يطلب أيضًا شهادة عمل — ف רבות من طلبات العمل أو الائتمان تتطلب الاثنين معًا.
          </p>
        </article>

        {/* ── تنويع مربع الربط مع أداة attestation de travail ── */}
        <div className="mt-8 rounded-xl bg-primary-50/60 border border-primary-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm select-none">
              K
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                هل تحتاج إلى شهادة عمل لنفس الملف؟
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">
                أنشئ شهادتك بصيغة PDF مجانًا وفوريًا.
              </p>
            </div>
          </div>

          <Button as="a" href="/ar/attestation-de-travail" variant="primary" className="shrink-0 text-xs">
            إنشاء مجانًا →
          </Button>
        </div>

        {/* ── قسم المصادر (منسق distinctly وخفيف مثل التذييل) ── */}
        <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
          <p className="font-semibold text-neutral-500 mb-2">المصادر الرسمية والReferences :</p>
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