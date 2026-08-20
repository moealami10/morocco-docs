import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const STORAGE_KEY = 'kaghit:progress:constituer-dossier-embauche-ar'

interface QuestionnaireState {
  employmentType: '' | 'prive' | 'public' | 'autre';
  currentlyEmployed: '' | 'oui' | 'non';
}

function loadProgress(): QuestionnaireState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { employmentType: '', currentlyEmployed: '' }
  } catch {
    return { employmentType: '', currentlyEmployed: '' }
  }
}

const GoalConstituerDossierEmbauchePageAr: React.FC = () => {
  const [state, setState] = useState<QuestionnaireState>(() => loadProgress())

  // Determine required documents based on selections
  const requiredDocuments = []

  // Casier judiciaire - toujours souvent demandé
  if (state.employmentType) {
    requiredDocuments.push({
      id: 1,
      title: 'الحصول على سجلك العدلي',
      context: 'غالبًا ما يُطلب من أرباب العمل عند التوظيف لتعيين وضعك القضائي (النشرة رقم 3).',
      tag: 'Souvent demandé' as const,
      linkText: 'استشارة دليل السجل العدلي →',
      linkTo: '/ar/guides/casier-judiciaire',
      isExternal: false
    })
  }

  // Attestation de travail - seulement si actuellement en poste
  if (state.currentlyEmployed === 'oui') {
    requiredDocuments.push({
      id: 2,
      title: 'إنشاء attestation de travail الخاصة بك',
      context: 'إذا كنت Currently في وظيفة أو تحتاج إلى إثبات أقدميتك لدى صاحب عمل مستقبلي.',
      tag: 'Souvent demandé' as const,
      linkText: 'إنشاء attestation de travail →',
      linkTo: '/ar/attestation-de-travail',
      isExternal: false
    })
  }

  // Photo d'identité - recommandée dans tous les cas
  if (state.employmentType) {
    requiredDocuments.push({
      id: 3,
      title: 'تحضير صورة هويةce بالمعايير',
      context: 'بالتنسيق القياسي 35×45 мм لملء ملف الترشح أو شارة الشركة.',
      tag: 'Recommandé' as const,
      linkText: ' تنسيق صورتك للهوية →',
      linkTo: '/ar/photo-cin',
      isExternal: false
    })
  }

  // In this simplified flow, we don't track completion with checkboxes
  // Instead we consider the flow complete when user has made both selections

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="ملف التوظيف الخاص بالمغرب — دليل والوثائق المطلوبة | Kaghit"
        description="خطة إجراء مخصصة لملف التوظيف الخاص بالمغرب حسب وضعك: السجل العدلي، attestation de travail وصورة هويةce بالمعايير."
        canonicalUrl="https://kaghit.com/ar/objectifs/constituer-dossier-embauche"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="مسار التنقل">
        <Link to="/ar" className="hover:text-neutral-900 transition-colors">الصفحة الرئيسية</Link>
        <span>/</span>
        <Link to="/ar/objectifs" className="hover:text-neutral-900 transition-colors">الأهداف</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">إعداد ملف التوظيف الخاص بي</span>
      </nav>

      <PageHeading
        title="إعداد ملف التوظيف : دليل مخصص"
        description="أجب على بعض الأسئلة للحصول على القائمة الدقيقة للوثائق اللازمة حسب وضعك."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        }
      />

      {/* Questionnaire Section */}
      {state.employmentType === '' || state.currentlyEmployed === '' ? (
        <div className="space-y-6">
          {/* Employment Type Question */}
          {state.employmentType === '' && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                للبدء، ما نوع الوظيفة التي تستهدفها؟
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setState(prev => ({ ...prev, employmentType: 'prive' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  القطاع الخاص
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, employmentType: 'public' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  مسابقة / توظيف عمومي
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, employmentType: 'autre' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  آخر / لا أعلم
                </button>
              </div>
            </Card>
          )}

          {/* Currently Employed Question */}
          {state.employmentType !== '' && state.currentlyEmployed === '' && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                هل أنت Currently في وظيفة؟
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setState(prev => ({ ...prev, currentlyEmployed: 'oui' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  نعم
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, currentlyEmployed: 'non' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  لا
                </button>
              </div>
            </Card>
          )}
        </div>
      ) : (
        // Results Section when both questions answered
        <>
          <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
            <p className="text-sm text-neutral-700 leading-relaxed">
              هذه هي الوثائق التي يجب تحضيرها لملف التوظيف الخاص بك :
            </p>

            {/* Progress indicator */}
            <div className="mt-4 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-700">
                {requiredDocuments.length} وثيقة{requiredDocuments.length > 1 ? 's' : ''} للتحضير
              </span>
              <div className="w-32 bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${(requiredDocuments.length > 0 ? 100 : 0)}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Documents List */}
          {requiredDocuments.length > 0 ? (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                قائمة التحضير
              </p>

              <div className="space-y-4">
                {requiredDocuments.map((doc) => (
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
          ) : (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 leading-relaxed text-center">
                لا توجد وثائق محددة مطلوبة لوضعك الحالي.
              </p>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 mt-8">
            <Button
              variant="secondary"
              onClick={() => {
                setState({ employmentType: '', currentlyEmployed: '' })
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
              حول ملف التوظيف بالمغرب
            </h2>
            <p className="text-neutral-700">
              في المغرب، يطلب معظمubsounders وأقسام الموارد البشرية مجموعة من الوثائق القياسية أثناء إعداد ملف التوظيف أو الترشح. قد تختلف المتطلبات حسب :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>القطاع الخاص (الخاصة، العامة، شبه العامة)</li>
              <li>نوع العقد المستهدف (CDI، CDD، تدريب، مستقل)</li>
              <li>إذا كنت Currently في وظيفة أو تبحث عن عمل</li>
              <li>حجم وسياسات الشركة الداخلية</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              نصائح لتعزيز ترشيحك
            </h2>
            <p className="text-neutral-700">
              بالإضافة إلى الوثائق الإدارية، فكّر في إعداد :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>سيرة ذاتية محدثة وتطابق الوظيفة المستهدفة</li>
              <li>رسالة تحفيز مخصصة</li>
              <li>مراجع مهنية (إذا كانت متوفرة)</li>
              <li>ملف أو إنجازات ذات صلة (حسب مجالك)</li>
            </ul>
          </section>
        </article>
      </Card>

      {/* Sources section */}
      <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
        <p className="font-semibold text-neutral-500 mb-2">مصادر وReferences :</p>
        <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
          <li>
            <a
              href="https://www.emploi-public.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              بوابة empleo-public.ma
            </a>
            — موارد للمسابقات والتوظيف العمومي
          </li>
          <li>
            <a
              href="https://www.anarem.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              ANAREM - مكتب توظيف
            </a>
            — دليل القطاع الخاص
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

export default GoalConstituerDossierEmbauchePageAr