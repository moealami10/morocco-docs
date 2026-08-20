import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const STORAGE_KEY = 'kaghit:progress:renouveler-ma-cin-ar'

interface CinRenewalState {
  reason: '' | 'expiration' | 'perte' | 'vol' | 'detioration' | 'adresse' | 'autre'
}

function loadProgress(): CinRenewalState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { reason: '' }
  } catch {
    return { reason: '' }
  }
}

type TagTypeAr = 'إجباري قانوناً' | 'مطلوب غالباً' | 'موصى به' | 'حسب الحالة'

function getTagBadgeStyle(tag: string): string {
  switch (tag) {
    case 'إجباري قانوناً':
    case 'Obligatoire légalement':
      return 'bg-amber-50 text-amber-800 border-amber-200'
    case 'مطلوب غالباً':
    case 'Souvent demandé':
      return 'bg-blue-50 text-blue-800 border-blue-200'
    case 'موصى به':
    case 'Recommandé':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200'
    case 'حسب الحالة':
    case 'Dépend de la situation':
    default:
      return 'bg-neutral-100 text-neutral-700 border-neutral-200'
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
      tag: TagTypeAr
      linkText?: string
      linkTo?: string
      isExternal?: boolean
    }>,
    documents: [] as Array<{
      id: number
      title: string
      context: string
      tag: TagTypeAr
      linkText?: string
      linkTo?: string
      isExternal?: boolean
    }>
  }

  // Logic based on renewal reason
  if (state.reason === 'expiration') {
    requirements.documents.push({
      id: 1,
      title: 'البطاقة الوطنية القديمة',
      context: 'بطاقتك الوطنية المنتهية الصلاحية.',
      tag: 'إجباري قانوناً'
    })

    requirements.actions.push({
      id: 1,
      title: 'أخذ موعد عبر البوابة الرسمية cnie.ma',
      context: 'التسجيل المسبق وحجز موعد عبر الإنترنت على البوابة الرسمية للمديرية العامة للأمن الوطني (DGSN) إجباري قبل أي تنقل.',
      tag: 'إجباري قانوناً',
      linkText: 'الوصول إلى البوابة الرسمية cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 2,
      title: 'صورة هوية بالمواصفات الرسمية',
      context: 'تنسيق قياسي 35×45 مم على خلفية فاتحة، الوجه في المركز دون ظلال أو انعكاسات.',
      tag: 'إجباري قانوناً',
      linkText: 'تنسيق صورتك للبطاقة الوطنية ←',
      linkTo: '/ar/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 2,
      title: 'إيداع الملف ودفع الرسوم (75 درهم)',
      context: 'أداء واجبت التجديد المحدد في 75 درهماً لدى الشباك واحتفظ بالإيصال المؤقت الصالح لمدة 3 أشهر.',
      tag: 'إجباري قانوناً'
    })
  } else if (state.reason === 'perte' || state.reason === 'vol') {
    requirements.actions.push({
      id: 1,
      title: `إجراء تصريح بـ${state.reason === 'perte' ? 'الضياع / الفقدان' : 'السرقة'}`,
      context: `توجه إلى أقرب دائرة شرطة أو مركز درك ملكي لتقديم تصريح بـ${state.reason === 'perte' ? 'فقدان' : 'سرقة'} بطاقتك واحتفظ بالإيصال المسلم لك لإرفاقه بملف التجديد.`,
      tag: 'إجباري قانوناً'
    })

    requirements.documents.push({
      id: 2,
      title: `شهادة التصريح بـ${state.reason === 'perte' ? 'الضياع' : 'السرقة'}`,
      context: `إيصال التصريح بـ${state.reason === 'perte' ? 'الفقدان' : 'السرقة'} المستلم من مصالح الشرطة أو الدرك الملكي.`,
      tag: 'إجباري قانوناً'
    })

    requirements.actions.push({
      id: 2,
      title: 'أخذ موعد عبر البوابة الرسمية cnie.ma',
      context: 'حجز الموعد عبر الإنترنت على البوابة الرسمية cnie.ma إجباري قبل إيداع الملف.',
      tag: 'إجباري قانوناً',
      linkText: 'الوصول إلى البوابة الرسمية cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 3,
      title: 'صورة هوية بالمواصفات الرسمية',
      context: 'تنسيق قياسي 35×45 مم على خلفية فاتحة.',
      tag: 'إجباري قانوناً',
      linkText: 'تنسيق صورتك للبطاقة الوطنية ←',
      linkTo: '/ar/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 3,
      title: 'إيداع الملف الكامل ودفع الرسوم (75 درهم)',
      context: 'أداء 75 درهماً في الشباك واستلام الإيصال المؤقت الصالح لمدة 3 أشهر.',
      tag: 'إجباري قانوناً'
    })
  } else if (state.reason === 'detioration') {
    requirements.documents.push({
      id: 1,
      title: 'البطاقة الوطنية التالفة',
      context: 'إحضار بطاقتك الوطنية التالفة أو غير المقروءة.',
      tag: 'إجباري قانوناً'
    })

    requirements.actions.push({
      id: 1,
      title: 'أخذ موعد عبر البوابة الرسمية cnie.ma',
      context: 'حجز موعد عبر البوابة الرسمية cnie.ma إجباري قبل أي تنقل.',
      tag: 'إجباري قانوناً',
      linkText: 'الوصول إلى البوابة الرسمية cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 2,
      title: 'صورة هوية بالمواصفات الرسمية',
      context: 'تنسيق قياسي 35×45 مم على خلفية فاتحة.',
      tag: 'إجباري قانوناً',
      linkText: 'تنسيق صورتك للبطاقة الوطنية ←',
      linkTo: '/ar/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 2,
      title: 'إيداع الملف ودفع الرسوم (75 درهم)',
      context: 'أداء واجبت 75 درهم واستلام الإيصال المؤقت الصالح لمدة 3 أشهر.',
      tag: 'إجباري قانوناً'
    })
  } else if (state.reason === 'adresse') {
    requirements.documents.push({
      id: 1,
      title: 'البطاقة الوطنية الحالية',
      context: 'بطاقتك الوطنية الحالية.',
      tag: 'إجباري قانوناً'
    })

    requirements.documents.push({
      id: 2,
      title: 'إثبات السكن بالعنوان الجديد',
      context: 'شهادة السكنى أو فاتورة حديثة (كهرباء، ماء) باسمك وعنوانك الجديد.',
      tag: 'إجباري قانوناً'
    })

    requirements.actions.push({
      id: 1,
      title: 'أخذ موعد عبر البوابة الرسمية cnie.ma',
      context: 'حجز موعد عبر البوابة الرسمية cnie.ma إجباري قبل أي تنقل.',
      tag: 'إجباري قانوناً',
      linkText: 'الوصول إلى البوابة الرسمية cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 3,
      title: 'صورة هوية بالمواصفات الرسمية',
      context: 'تنسيق قياسي 35×45 مم على خلفية فاتحة.',
      tag: 'إجباري قانوناً',
      linkText: 'تنسيق صورتك للبطاقة الوطنية ←',
      linkTo: '/ar/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 2,
      title: 'إيداع الملف ودفع الرسوم (75 درهم)',
      context: 'أداء 75 درهماً لدى الشباك واستلام الإيصال المؤقت.',
      tag: 'إجباري قانوناً'
    })
  } else if (state.reason === 'autre') {
    requirements.actions.push({
      id: 1,
      title: 'التحقق من شروط التجديد',
      context: 'استشر البوابة الرسمية cnie.ma أو مصلحة بطاقات التعريف الوطنية للتحقق من الشروط الخاصة بحالتك.',
      tag: 'موصى به'
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="تجديد البطاقة الوطنية بالمغرب 2026 — السعر والإجراءات | Kaghit"
        description="دليل مخصص لتجديد البطاقة الوطنية الإلكترونية (CNIE) بالمغرب حسب وضعيتك: انتهاء الصلاحية، الفقدان، السرقة، التلف أو تغيير العنوان."
        canonicalUrl="https://kaghit.com/ar/objectifs/renouveler-ma-cin"
        lang="ar"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="مسار التنقل">
        <RouterLink to="/ar" className="hover:text-neutral-900 transition-colors">الصفحة الرئيسية</RouterLink>
        <span>/</span>
        <RouterLink to="/ar/objectifs" className="hover:text-neutral-900 transition-colors">الأهداف</RouterLink>
        <span>/</span>
        <span className="text-neutral-900 font-medium">تجديد البطاقة الوطنية</span>
      </nav>

      <PageHeading
        title="تجديد أو استبدال البطاقة الوطنية بالمغرب : دليل مخصص"
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
            <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-4">
              ما هو سبب تجديد بطاقتك الوطنية؟
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setState(prev => ({ ...prev, reason: 'expiration' }))}
                className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
              >
                البطاقة منتهية الصلاحية
              </button>
              <button
                type="button"
                onClick={() => setState(prev => ({ ...prev, reason: 'perte' }))}
                className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
              >
                فقدان البطاقة
              </button>
              <button
                type="button"
                onClick={() => setState(prev => ({ ...prev, reason: 'vol' }))}
                className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
              >
                سرقة البطاقة
              </button>
              <button
                type="button"
                onClick={() => setState(prev => ({ ...prev, reason: 'detioration' }))}
                className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
              >
                البطاقة تالفة أو غير مقروءة
              </button>
              <button
                type="button"
                onClick={() => setState(prev => ({ ...prev, reason: 'adresse' }))}
                className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
              >
                تغيير عنوان السكن
              </button>
              <button
                type="button"
                onClick={() => setState(prev => ({ ...prev, reason: 'autre' }))}
                className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
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
                <p className="text-sm text-neutral-700 font-medium leading-relaxed">
                  إليك الوثائق والإجراءات المطلوبة لتجديد بطاقتك الوطنية:
                </p>

                {/* Progress indicator */}
                <div className="mt-4 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-700">
                    مجموع العناصر: {requirements.actions.length + requirements.documents.length}
                  </span>
                  <div className="w-32 bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: '100%' }}
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
                      </div>

                      <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                        {action.context}
                      </p>

                      {action.linkTo && action.linkText && (
                        <div className="mt-3">
                          {action.isExternal ? (
                            <a
                              href={action.linkTo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-600 transition-colors"
                            >
                              {action.linkText}
                            </a>
                          ) : (
                            <RouterLink
                              to={action.linkTo}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-600 transition-colors"
                            >
                              {action.linkText}
                            </RouterLink>
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
                      </div>

                      <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                        {doc.context}
                      </p>

                      {doc.linkTo && doc.linkText && (
                        <div className="mt-3">
                          {doc.isExternal ? (
                            <a
                              href={doc.linkTo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-600 transition-colors"
                            >
                              {doc.linkText}
                            </a>
                          ) : (
                            <RouterLink
                              to={doc.linkTo}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-600 transition-colors"
                            >
                              {doc.linkText}
                            </RouterLink>
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
              تغيير الاختيارات / إعادة البدء
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
              يتم تجديد البطاقة الوطنية الإلكترونية (CNIE) في عدة حالات: انتهاء الصلاحية (صالحة لمدة 10 سنوات)، الفقدان، السرقة، التلف، أو تغيير عنوان السكن. وعلى الرغم من أن الإجراءات العامة متشابهة، فإن كل حالة تتطلب وثائق خاصة بها.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              الواجبات والتأخير
            </h2>
            <p className="text-neutral-700">
              واجبات التجديد الرسمية هي 75 درهماً، كما هو مؤكد عبر البوابة الرسمية <a href="https://www.cnie.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">cnie.ma</a>. الإيصال المؤقت المسلم عند الإيداع يدوم مفعوله 3 أشهر كحد أقصى.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              نصيحة هامة
            </h2>
            <p className="text-neutral-700">
              يُنصح ببدء إجراءات التجديد قبل حوالي 3 أشهر من تاريخ انتهاء صلاحية بطاقتك الحالية، لتفادي البقاء بدون وثيقة تعريفية صالحة.
            </p>
          </section>

          {(state.reason === 'perte' || state.reason === 'vol') && (
            <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
              <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="text-primary">⚠️</span> في حالة الفقدان أو السرقة
              </h2>
              <p className="text-neutral-600 text-xs leading-relaxed">
                توجه أولًا إلى أقرب دائرة شرطة أو مركز درك ملكي لتقديم تصريح بـالفقدان أو السرقة. احتفظ بالإيصال المسلم لك، حيث يجب إرفاقه بملف التجديد.
              </p>
            </section>
          )}

          {(state.reason === 'adresse') && (
            <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
              <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="text-primary">📍</span> في حالة تغيير العنوان
              </h2>
              <p className="text-neutral-600 text-xs leading-relaxed">
                التجديد واجب خلال 30 يومًا من تغيير محل الإقامة، مع إحضار البطاقة القديمة وشهادة السكنى للعنوان الجديد.
              </p>
            </section>
          )}
        </article>
      </Card>

      {/* Sources section */}
      <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
        <p className="font-semibold text-neutral-500 mb-2">المصادر الرسمية والمراجع:</p>
        <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
          <li>
            <a
              href="https://www.cnie.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              cnie.ma — البوابة الرسمية للمديرية العامة للأمن الوطني
            </a>{' '}
            — حجز الموعد والطلب المسبق (رسوم 75 درهم) · <span className="italic text-neutral-400">تم التحقق: 18 أغسطس 2026</span>
          </li>
          <li>
            <a
              href="https://demarchesmaroc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              demarchesmaroc.com
            </a>{' '}
            — "البطاقة الوطنية (CIN)" وإجراءات الحصول عليها · <span className="italic text-neutral-400">تم التحقق: 18 أغسطس 2026</span>
          </li>
          <li>
            <a
              href="https://guidedumaroc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              guidedumaroc.com
            </a>{' '}
            — الأسئلة الشائعة حول البطاقة الوطنية · <span className="italic text-neutral-400">تم التحقق: 18 أغسطس 2026</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default GoalRenouvelerCinPageAr