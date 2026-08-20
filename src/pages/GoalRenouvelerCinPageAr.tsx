import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const STORAGE_KEY = 'kaghit:progress:renouveler-ma-cin-ar'

interface CinRenewalState {
  reason: '' | 'expiration' | 'perte' | 'vol' | 'detioration' | 'adresse' | 'autre';
}

function loadProgress(): CinRenewalState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { reason: '' }
  } catch {
    return { reason: '' }
  }
}

const GoalRenouvelerCinPageAr: React.FC = () => {
  const [state, setState] = useState<CinRenewalState>(() => loadProgress())

  // Determine requirements based on selected reason
  const requirements = {
    actions: [] as Array<{
      id: number
      title: string
      context: string
      tag: 'Obligatoire légalement' | 'Souvent demandé' | 'Recommandé' | 'Dépend de la situation'
      linkText?: string
      linkTo?: string
      isExternal?: boolean
    }>,
    documents: [] as Array<{
      id: number
      title: string
      context: string
      tag: 'Obligatoire légalement' | 'Souvent demandé' | 'Recommandé' | 'Dépend de la situation'
      linkText?: string
      linkTo?: string
      isExternal?: boolean
    }>
  }

  // Logic based on renewal reason
  if (state.reason === 'expiration') {
    // Expiration - standard renewal
    requirements.documents.push({
      id: 1,
      title: 'البطاقة الوطنية القديمة',
      context: 'بطاقتك الوطنية llegó إلى تاريخ انتهاء الصلاحية.',
      tag: 'Obligatoire légalement'
    })

    requirements.actions.push({
      id: 1,
      title: 'أخذ موعد عبر البوابة الرسمية cnie.ma',
      context: 'الطلب المسبق وأخذ الموعد عبر الإنترنت على البوابة الرسمية للمديرية العامة للأمن الوطني (DGSN) هي بشكل عام مطلوبة منذ سبتمبر 2020 قبل أيتنقل.',
      tag: 'Obligatoire légalement',
      linkText: 'الوصول إلى البوابة الرسمية cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 2,
      title: 'صورة هويةce بالمعايير',
      context: 'تنسيق قياسي 35×45 ملم على خلفية فاتحة، الوجه في المركز دون ظلال أو انعكاسات.',
      tag: 'Obligatoire légalement',
      linkText: ' تنسيق صورتك للبطاقة الوطنية →',
      linkTo: '/ar/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 2,
      title: 'إيداع الملف ودفع الرسوم (75 درهم)',
      context: 'ادفع رسوم قدرها 75 درهم في الشباك واحتفظ بالإيصال المؤقت الصالح لمدة 3 أشهر.',
      tag: 'Obligatoire légalement'
    })
  } else if (state.reason === 'perte' || state.reason === 'vol') {
    // Perte ou vol - nécessite déclaration préalable
    requirements.actions.push({
      id: 1,
      title: `إجراء إعلان ${state.reason === 'perte' ? 'فقدان' : 'سرقة'}`,
      context: `توجه إلى nearest circle policial أو درك bubrigadeclosest proche pour faire une déclaration de ${state.reason === 'perte' ? 'فقدان' : 'سرقة'}. احتفظ بإيصال هذا الإعلان: سيتعين attachingه إلى ملف تجديد بطاقتك.`,
      tag: 'Obligatoire légalement'
    })

    requirements.documents.push({
      id: 2,
      title: `إثبات ${state.reason === 'perte' ? 'الفقدان' : 'السرقة'}`,
      context: `إيصال إعلان ${state.reason === 'perte' ? 'الفضاع' : 'السرقة'} المستلم من السلطات الشرطية أو الدرك.`,
      tag: 'Obligatoire légalement'
    })

    requirements.actions.push({
       id: 1,
       title: 'أخذ موعد عبر البوابة الرسمية cnie.ma',
       context: 'الطلب المسبق وأخذ الموعد عبر الإنترنت على البوابة الرسمية للمديرية العامة للأمن الوطني (DGSN) هي بشكل عام مطلوبة منذ سبتمبر 2020 قبل أيتنقل.',
       tag: 'Dépend de la situation',
       linkText: 'الوصول إلى البوابة الرسمية cnie.ma ↗',
       linkTo: 'https://www.cnie.ma',
       isExternal: true
     })

    requirements.documents.push({
      id: 3,
      title: 'صورة هويةce بالمعايير',
      context: 'تنسيق قياسي 35×45 ملم على خلفية فاتحة، الوجه في المركز دون ظلال أو انعكاسات.',
      tag: 'Obligatoire légalement',
      linkText: ' تنسيق صورتك للبطاقة الوطنية →',
      linkTo: '/ar/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 3,
      title: 'إيداع الملف الكامل ودفع الرسوم (75 درهم)',
      context: 'ادفع رسوم قدرها 75 درهم في الشباك واحتفظ بالإيصال المؤقت الصالح لمدة 3 أشهر.',
      tag: 'Obligatoire légalement'
    })
  } else if (state.reason === 'detioration') {
    // Détérioration - simile à expiration mais avec ancienne CIN détériorée
    requirements.documents.push({
      id: 1,
      title: 'البطاقة الوطنية التالفةice',
      context: 'بطاقتك الوطنية تالفة أو غير مقروءة.',
      tag: 'Obligatoire légalement'
    })

    requirements.actions.push({
      id: 1,
      title: 'أخذ موعد عبر البوابة الرسمية cnie.ma',
      context: 'الطلب المسبق وأخذ الموعد عبر الإنترنت على البوابة الرسمية للمديرية العامة للأمن الوطني (DGSN) هي بشكل عام مطلوبة منذ سبتمبر 2020 قبل أيتنقل.',
      tag: 'Obligatoire légalement',
      linkText: 'الوصول إلى البوابة الرسمية cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 2,
      title: 'صورة هويةce بالمعايير',
      context: 'تنسيق قياسي 35×45 ملم على خلفية فاتحة، الوجه في المركز دون ظلال أو انعكاسات.',
      tag: 'Obligatoire légalement',
      linkText: ' تنسيق صورتك للبطاقة الوطنية →',
      linkTo: '/ar/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 2,
      title: 'إيداع الملف ودفع الرسوم (75 درهم)',
      context: 'ادفع رسوم قدرها 75 درهم في الشباك واحتفظ بالإيصال المؤقت الصالح لمدة 3 أشهر.',
      tag: 'Obligatoire légalement'
    })
  } else if (state.reason === 'adresse') {
    // Changement d'adresse - nécessite justificatif de résidence
    requirements.documents.push({
      id: 1,
      title: 'البطاقة الوطنية الحالية',
      context: 'بطاقتك الوطنية الحالية.',
      tag: 'Obligatoire légalement'
    })

    requirements.documents.push({
      id: 2,
      title: 'Justificatif de nouvelle adresse',
      context: 'شهادة إقامة أو فاتورة حديثة (كهرباء، ماء، هاتف) باسمك الجديد وعنوانك الجديد.',
      tag: 'Obligatoire légalement'
    })

    requirements.actions.push({
      id: 1,
      title: 'أخذ موعد عبر البوابة الرسمية cnie.ma',
      context: 'الطلب المسبق وأخذ الموعد عبر الإنترنت على البوابة الرسمية للمديرية العامة للأمن الوطني (DGSN) هي بشكل عام مطلوبة منذ سبتمبر 2020 قبل أيتنقل.',
      tag: 'Obligatoire légalement',
      linkText: 'الوصول إلى البوابة الرسمية cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 3,
      title: 'صورة هويةce بالمعايير',
      context: 'تنسيق قياسي 35×45 ملم على خلفية فاتحة، الوجه في المركز دون ظلال أو انعكاسات.',
      tag: 'Obligatoire légalement',
      linkText: ' تنسيق صورتك للبطاقة الوطنية →',
      linkTo: '/ar/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 2,
      title: 'إيداع الملف الكامل ودفع الرسوم (75 درهم)',
      context: 'ادفع رسوم قدرها 75 درهم في الشباك واحتفظ بالإيصال المؤقت الصالح لمدة 3 أشهر.',
      tag: 'Obligatoire légalement'
    })
  } else if (state.reason === 'autre') {
    // Autres raisons - guidance générale
    requirements.actions.push({
      id: 1,
      title: 'التحقق من أهليتك للتجديد',
      context: 'استشر البوابة الرسمية cnie.ma أو توجه إلى الشباك للتحقق مما إذا كانت وضعك الخاص يبرر تجديد بطاقة وطنية.',
      tag: 'Recommandé'
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="تجديد بطاقتك الوطنية بالمغرب 2026 — السعر والإجراءات | Kaghit"
        description="دليل مخصص لتجديد البطاقة الوطنية الإلكترونية (CNIE) بالمغرب حسب وضعك: انتهاء الصلاحية، الفقدان، السرقة، التدهور أو تغيير العنوان."
        canonicalUrl="https://kaghit.com/ar/objectifs/renouveler-ma-cin"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="مسار التنقل">
        <Link to="/ar" className="hover:text-neutral-900 transition-colors">الصفحة الرئيسية</Link>
        <span>/</span>
        <Link to="/ar/objectifs" className="hover:text-neutral-900 transition-colors">الأهداف</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">تجديد أو تجديد بطاقتك الوطنية</span>
      </nav>

      <PageHeading
        title="تجديد أو تجديد بطاقتك الوطنية بالمغرب : دليل مخصص"
        description="حدد سبب طلبك للحصول على القائمة الدقيقة للوثائق والإجراءات اللازمة."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2.5" />
            <path d="M15 8h2" />
            <path d="M15 12h2" />
            <path d="M7 16c0-1.5 1.5-2.5 3.5-2.5s3.5 1 3.5 2.5" />
          </svg>
        }
      />

      {/* Questionnaire Section */}
      {state.reason === '' ? (
        <div className="space-y-6">
          <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
            <p className="text-sm text-neutral-700 leading-relaxed mb-4">
              لماذا تقوم بتجديد بطاقتك الوطنية؟
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'expiration' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                البطاقة منتهية الصلاحية
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'perte' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                فقدان البطاقة
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'vol' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                سرقة البطاقة
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'detioration' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                البطاقة تالفة
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'adresse' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                تغيير العنوان
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'autre' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                سبب آخر
              </button>
            </div>
          </Card>
        </div>
      ) : (
        // Results Section when reason is selected
        <>
          <div className="space-y-6">
            {/* Requirements Summary */}
            {(requirements.actions.length > 0 || requirements.documents.length > 0) && (
              <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  هذا هو ما تحتاجه لتجديد بطاقتك الوطنية :
                </p>

                {/* Progress indicator */}
                <div className="mt-4 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-700">
                    {requirements.actions.length + requirements.documents.length} عنصر{requirements.actions.length + requirements.documents.length > 1 ? 's' : ''} للتحضير
                  </span>
                  <div className="w-32 bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${(requirements.actions.length + requirements.documents.length > 0 ? 100 : 0)}%` }}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Actions Section */}
            {requirements.actions.length > 0 && (
              <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                  إجراءات يجب القيام بها
                </p>

                <div className="space-y-4">
                  {requirements.actions.map((action) => (
                    <div
                      key={action.id}
                      className="p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-100 shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-neutral-900">
                            {action.title}
                          </h3>
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getTagBadgeStyle(action.tag)}`}>
                            {action.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 cursor-pointer text-[11px] font-medium text-neutral-500 hover:text-neutral-900 select-none">
                          {/* In this simplified version, we don't have checkboxes for completion tracking */}
                          <span>-</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                        {action.context}
                      </p>

                      {action.linkTo && action.linkText && (
                        <div className="mt-2">
                          {action.isExternal ? (
                            <a
                              href={action.linkTo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-600 transition-colors"
                            >
                              {action.linkText}
                            </a>
                          ) : (
                            <Link
                              to={action.linkTo}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-600 transition-colors"
                            >
                              {action.linkText}
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Documents Section */}
            {requirements.documents.length > 0 && (
              <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                  وثائق يجب تحضيرها
                </p>

                <div className="space-y-4">
                  {requirements.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-100 shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-neutral-900">
                            {doc.title}
                          </h3>
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getTagBadgeStyle(doc.tag)}`}>
                            {doc.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 cursor-pointer text-[11px] font-medium text-neutral-500 hover:text-neutral-900 select-none">
                          {/* In this simplified version, we don't have checkboxes for completion tracking */}
                          <span>-</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                        {doc.context}
                      </p>

                      {doc.linkTo && doc.linkText && (
                        <div className="mt-2">
                          {doc.isExternal ? (
                            <a
                              href={doc.linkTo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-600 transition-colors"
                            >
                              {doc.linkText}
                            </a>
                          ) : (
                            <Link
                              to={doc.linkTo}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-600 transition-colors"
                            >
                              {doc.linkText}
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 mt-8">
            <Button
              variant="secondary"
              onClick={() => {
                setState({ reason: '' })
                sessionStorage.removeItem(STORAGE_KEY)
              }}
              className="w-full sm:w-auto"
            >
              إعادة البدء
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                // In a real implementation, we might save progress or navigate elsewhere
                alert('لحفظ تقدمك، استخدم خيار حفظ المتصفح أو دوّن القائمة أعلاه.')
              }}
              className="w-full sm:w-auto"
            >
              تنزيل القائمة
            </Button>
          </div>
        </>
      )}

      {/* Main Article Content - Contextual Information */}
      <Card className="p-6 sm:p-10 mb-8">
        <article className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              حول تجديد البطاقة الوطنية بالمغرب
            </h2>
            <p className="text-neutral-700">
              يتم تجديد البطاقة الوطنية électronique (CNIE) في عدة حالات: انتهاء الصلاحية (صالحة لمدة 10 سنوات)، الفقدان، السرقة، التدهور، أو تغيير العنوان. على الرغم من أن الإجراء العام مشابه، فإن كل حالة تتطلب وثائق وإجراءات محددة.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              السعر والمدة
            </h2>
            <p className="text-neutral-700">
              السعر الرسمي لتجديد البطاقة الوطنية هو 75 درهم، كما أكده البوابة الرسمية <a href="https://www.cnie.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">cnie.ma</a>. الإيصال المؤقت صالح لمدة أقصاها 3 أشهر.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              نصيحة مفيدة
            </h2>
            <p className="text-neutral-700">
              يُنصح ببدء التجديد قبل حوالي 3 أشهر من انتهاء صلاحية بطاقتك الحالية، لتجنب البقاء بدون هوية وطنية صالحة.
            </p>
          </section>

          {(state.reason === 'perte' || state.reason === 'vol') && (
            <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
              <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="text-primary">⚠️</span> في حالة الفقدان أو السرقة
              </h2>
              <p className="text-neutral-600 text-xs leading-relaxed">
                توجه أولًا إلى أقرب دائرة شرطة أو فرقة درك لعمل إعلان عن الفقدان (أو السرقة). احتفظ بإيصال هذا الإعلان: يجب أن يرفق بملف تجديد بطاقتك.
              </p>
            </section>
          )}

          {(state.reason === 'adresse') && (
            <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
              <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="text-primary">📍</span> في حالة تغيير العنوان
              </h2>
              <p className="text-neutral-600 text-xs leading-relaxed">
                يُطلب عادةً التجديد خلال 30 يومًا من تغيير العنوان، مع بطاقتك الوطنية القديمة، وشهادة إقامة للعنوان الجديد، وإثبات domicile.
              </p>
            </section>
          )}
        </article>
      </Card>

      {/* Sources section */}
      <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
        <p className="font-semibold text-neutral-500 mb-2">المصادر الرسمية والReferences :</p>
        <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
          <li>
            <a
              href="https://www.cnie.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              cnie.ma — البوابة الرسمية للمديرية العامة للأمن الوطني
            </a>
            — أخذ الموعد والطلب المسبق (السعر 75 درهم والموعد generalmente مطلوب منذ 2020)
          </li>
          <li>
            <a
              href="https://demarchesmaroc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              demarchesmaroc.com
            </a>
            — "البطاقة الوطنية (CIN)" و "كيفية الحصول على CNIE"
          </li>
          <li>
            <a
              href="https://guidedumaroc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              guidedumaroc.com
            </a>
            — أسئلة مكررة حول البطاقة الوطنية (CIN)
          </li>
          <li>
            <a
              href="https://chhiwat.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              chhiwat.ma
            </a>
            — "CIN المغرب: الموعد، الطلب وإجراءات التجديد"
          </li>
        </ul>
      </div>
    </div>
  )
}

// Import the getTagBadgeStyle function from our centralized types
import type { TagType } from '../types/objectif'

function getTagBadgeStyle(tag: TagType): string {
  switch (tag) {
    case 'Obligatoire légalement':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'Souvent demandé':
      return 'bg-blue-50 text-blue-800 border-amber-200';
    case 'Recommandé':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'Dépend de la situation':
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
}

export default GoalRenouvelerCinPageAr