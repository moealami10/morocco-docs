import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const STORAGE_KEY = 'kaghit:progress:voyager-avec-mon-enfant-ar'

interface VoyageState {
  travelCompanion: '' | 'both-parents' | 'one-parent' | 'another-adult' | 'alone'
  destination: string
  passportValid: '' | 'oui' | 'non'
  destinationConfirmed: boolean
}

function loadProgress(): VoyageState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : { travelCompanion: '', destination: '', passportValid: '' }
    // Ensure destinationConfirmed exists for backward compatibility
    return {
      ...parsed,
      destinationConfirmed: parsed.destinationConfirmed ?? false
    }
  } catch {
    return { travelCompanion: '', destination: '', passportValid: '', destinationConfirmed: false }
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

const GoalVoyagerEnfantPageAr: React.FC = () => {
  const [state, setState] = useState<VoyageState>(() => loadProgress())

  const resetForm = () => {
    setState({ travelCompanion: '', destination: '', passportValid: '', destinationConfirmed: false })
    sessionStorage.removeItem(STORAGE_KEY)
  }

  // Determine requirements based on selections
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

  // Logic based on travel companion
  if (state.travelCompanion === 'both-parents') {
    // Both parents traveling with child - usually no authorization needed
    requirements.documents.push({
      id: 1,
      title: 'جواز سفر صالح للطفل',
      context: 'يكتفى بجواز سفر صالح للطفل فقط عندما يسافر الوالدان معًا مع الطفل.',
      tag: 'إجباري قانوناً'
    })

    // Actions
    requirements.actions.push({
      id: 1,
      title: 'التحقق من متطلبات الوجهة وشركة الطيران',
      context: 'حسب الوجهة وشركة الطيران، يرجى التأكد دائماً من الشروط الخاصة حتى عند مرافق الوالدين للطفل.',
      tag: 'مطلوب غالباً'
    })
  } else if (state.travelCompanion === 'one-parent' ||
             state.travelCompanion === 'another-adult' ||
             state.travelCompanion === 'alone') {
    // One parent, another adult, or child alone - authorization needed
    requirements.documents.push({
      id: 1,
      title: 'إذن الوالدين',
      context: 'ضروري إذا كان الطفل يسافر بمفرده، أو برفقة أحد الوالدين فقط، أو برفقة شخص آخر.',
      tag: 'إجباري قانوناً',
      linkText: 'إنشاء إذن الوالدين ←',
      linkTo: '/ar/autorisation-parentale',
      isExternal: false
    })

    requirements.actions.push({
      id: 2,
      title: 'المصادقة على التوقيع',
      context: 'المصادقة على التوقيع لدى الجماعة أو المقاطعة التابعة لمسكنك مصحوباً ببطاقة التعريف الوطنية لإعطاء الإذن صبغة قانونية وشرعية.',
      tag: 'إجباري قانوناً'
    })

    requirements.documents.push({
      id: 2,
      title: 'جواز سفر صالح للطفل',
      context: 'جواز سفر بيومتري ساري المفعول للطفل أمر لا بد منه.',
      tag: 'إجباري قانوناً'
    })

    // Photo d'identité seulement si le passeport doit être renouvelé
    if (state.passportValid === 'non') {
      requirements.documents.push({
        id: 3,
        title: 'صورة هوية بالمواصفات الرسمية',
        context: 'بالتنسيق القياسي 35×45 مم لطلب أو تجديد جواز السفر البيومتري للقاصر.',
        tag: 'حسب الحالة',
        linkText: 'تنسيق صورة جواز السفر ←',
        linkTo: '/ar/photo-cin',
        isExternal: false
      })
    }
  }

  // Add destination-specific advice if destination is provided
  if (state.destination.trim() !== '') {
    requirements.actions.push({
      id: 3,
      title: `التحقق من المتطلبات المحددة لـ ${state.destination}`,
      context: 'قد تكون هناك متطلبات إضافية لبعض الوجهات (تأشيرات، تلقيحات، تراخيص خاصة). يُرجى مراجعة الموقع الرسمي للسفارة أو القنصلية الخاصة بوجهتك.',
      tag: 'موصى به'
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="سفر قاصر بالمغرب — إذن وإجراءات | Kaghit"
        description="دليل خطوة بخطوة مخصص للسفر مع طفل قاصر بالمغرب: إذن الوالدين، التصديق وصورة جواز السفر حسب وضعية السفر."
        canonicalUrl="https://kaghit.com/ar/objectifs/voyager-avec-mon-enfant"
        lang="ar"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="مسار التنقل">
        <Link to="/ar" className="hover:text-neutral-900 transition-colors">الصفحة الرئيسية</Link>
        <span>/</span>
        <Link to="/ar/objectifs" className="hover:text-neutral-900 transition-colors">الأهداف</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">السفر مع طفلي</span>
      </nav>

      <PageHeading
        title="السفر مع طفلي : دليل مخصص"
        description="أجب على بعض الأسئلة للحصول على القائمة الدقيقة للوثائق والإجراءات اللازمة حسب وضعية السفر."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
      />

      {/* Questionnaire Section */}
      {state.travelCompanion === '' || state.destination === '' || state.passportValid === '' ? (
        <div className="space-y-6">
          {/* Travel Companion Question */}
          {!state.travelCompanion && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-4">
                مع من يسافر الطفل؟
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, travelCompanion: 'both-parents' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  الوالدان معًا
                </button>
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, travelCompanion: 'one-parent' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  أحد الوالدين فقط
                </button>
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, travelCompanion: 'another-adult' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  بالغ آخر (قريب أو مرافق)
                </button>
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, travelCompanion: 'alone' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  الطفل بمفرده
                </button>
              </div>
            </Card>
          )}

          {/* Destination Question */}
          {state.travelCompanion && !state.destinationConfirmed && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-4">
                ما هي وجهة السفر؟
              </p>
              <div>
                <input
                  type="text"
                  placeholder="مثال: فرنسا، إسبانيا، تركيا..."
                  value={state.destination}
                  onChange={(e) => setState(prev => ({ ...prev, destination: e.target.value.trim() }))}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-150 text-sm"
                />
                {state.destination ? (
                  <>
                    <p className="mt-2 text-xs text-neutral-500">
                      الوجهة المدخلة: "{state.destination}"
                    </p>
                    <button
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, destinationConfirmed: true }))}
                      className="mt-3 w-full px-4 py-2 rounded-lg border border-primary-100 bg-primary-50 text-primary font-medium hover:bg-primary-100 transition-colors duration-150"
                    >
                      متابعة
                    </button>
                  </>
                ) : (
                  <p className="mt-2 text-xs text-neutral-500 text-italic">
                    يرجى إدخال وجهة السفر
                  </p>
                )}
              </div>
            </Card>
          )}

          {/* Passport Validity Question */}
          {state.travelCompanion !== '' && state.destinationConfirmed && state.passportValid === '' && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-4">
                هل جواز سفر الطفل لا يزال صالحًا؟
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, passportValid: 'oui' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  نعم، صالح
                </button>
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, passportValid: 'non' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  لا، يحتاج للتجديد أو الإصدار
                </button>
              </div>
            </Card>
          )}
        </div>
      ) : (
        // Results Section when all questions answered
        <>
          <div className="space-y-6">
            {/* Requirements Summary */}
            {(requirements.actions.length > 0 || requirements.documents.length > 0) && (
              <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
                <p className="text-sm text-neutral-700 font-medium leading-relaxed">
                  إليك القائمة الكاملة للوثائق والإجراءات المطلوبة لسفر طفلك:
                </p>

                {/* Progress indicator */}
                <div className="mt-4 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-700">
                    مجموع الوثائق والإجراءات: {requirements.actions.length + requirements.documents.length}
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
                            <Link
                              to={action.linkTo}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-600 transition-colors"
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
                            <Link
                              to={doc.linkTo}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-600 transition-colors"
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
              onClick={resetForm}
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
              حول سفر القاصرين بالمغرب
            </h2>
            <p className="text-neutral-700">
              تختلف متطلبات السفر مع طفل قاصر بشكل كبير حسب من يرافق الطفل، والوجهة، وصلاحية وثائق السفر. هذه الدقة ضرورية لتجنب رفض الصعود إلى الطائرة أو التعقيدات لدى شرطة الحدود.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              نصائح هامة قبل السفر
            </h2>
            <p className="text-neutral-700">
              يرجى دائماً التحقق من المتطلبات الخاصة لدى:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs text-neutral-600">
              <li>شركة الطيران أو الناقل البحري/البري</li>
              <li>بلد الوجهة (والبلدان الترانزيت إن وجدت)</li>
              <li>شرطة الحدود المغربية في حالة مغادرة التراب الوطني</li>
            </ul>
            <p className="text-neutral-700 mt-2">
              احتفظ دائمًا بنسخ ورقية وإلكترونية لجميع الوثائق الرسمية والدفتر العائلي.
            </p>
          </section>
        </article>
      </Card>

      {/* Sources section */}
      <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
        <p className="font-semibold text-neutral-500 mb-2">المصادر الرسمية والمراجع:</p>
        <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
          <li>
            <a
              href="https://www.watiqa.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              Watiqa.ma — البوابة الوطنية للوثائق الإدارية
            </a>{' '}
            — دليل المساطر والإجراءات الخاصة بإذن السفر · <span className="italic text-neutral-400">تم التحقق: 18 أغسطس 2026</span>
          </li>
          <li>
            <a
              href="https://www.mjcc.gov.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              وزارة العدل — المساطر القضائية والإدارية
            </a>{' '}
            — نماذج وشروط المصادقة على التوقيعات · <span className="italic text-neutral-400">تم التحقق: 18 أغسطس 2026</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default GoalVoyagerEnfantPageAr