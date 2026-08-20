import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const STORAGE_KEY = 'kaghit:progress:constituer-dossier-embauche-ar'

interface QuestionnaireState {
  employmentType: '' | 'prive' | 'public' | 'autre'
  currentlyEmployed: '' | 'oui' | 'non'
}

function loadProgress(): QuestionnaireState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { employmentType: '', currentlyEmployed: '' }
  } catch {
    return { employmentType: '', currentlyEmployed: '' }
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

const GoalConstituerDossierEmbauchePageAr: React.FC = () => {
  const [state, setState] = useState<QuestionnaireState>(() => loadProgress())

  // Determine required documents based on selections
  const requiredDocuments = [] as Array<{
    id: number
    title: string
    context: string
    tag: TagTypeAr
    linkText?: string
    linkTo?: string
    isExternal?: boolean
  }>

  // Casier judiciaire - toujours souvent demandé
  if (state.employmentType) {
    requiredDocuments.push({
      id: 1,
      title: 'طلب نسخة من السجل العدلي (النشرة رقم 3)',
      context: 'غالبًا ما يُطلب من طرف أرباب العمل عند التوظيف للتحقق من السوابق القضائية.',
      tag: 'مطلوب غالباً',
      linkText: 'استشارة دليل السجل العدلي ←',
      linkTo: '/ar/guides/casier-judiciaire',
      isExternal: false
    })
  }

  // Attestation de travail - seulement si actuellement en poste
  if (state.currentlyEmployed === 'oui') {
    requiredDocuments.push({
      id: 2,
      title: 'إنشاء شهادة العمل الخاصة بك',
      context: 'إذا كنت تفاوض على عمل جديد وتحتاج لإثبات خبرتك وأقدميتك لدى مشغلك الحسابي.',
      tag: 'مطلوب غالباً',
      linkText: 'إنشاء شهادة عمل ←',
      linkTo: '/ar/attestation-de-travail',
      isExternal: false
    })
  }

  // Photo d'identité - recommandée dans tous les cas
  if (state.employmentType) {
    requiredDocuments.push({
      id: 3,
      title: 'تحضير صورة هوية بالمواصفات الرسمية',
      context: 'بالتنسيق القياسي 35×45 مم لإكمال ملف الترشيح أو بطاقة المهنية للشركة.',
      tag: 'موصى به',
      linkText: 'تنسيق صورتك للهوية ←',
      linkTo: '/ar/photo-cin',
      isExternal: false
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="ملف التوظيف بالمغرب — دليل والوثائق المطلوبة | Kaghit"
        description="خطة عمل مخصصة لملف التوظيف بالمغرب حسب وضعيتك: السجل العدلي، شهادة العمل وصورة الهوية بالمواصفات الرسمية."
        canonicalUrl="https://kaghit.com/ar/objectifs/constituer-dossier-embauche"
        lang="ar"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="مسار التنقل">
        <Link to="/ar" className="hover:text-neutral-900 transition-colors">الصفحة الرئيسية</Link>
        <span>/</span>
        <Link to="/ar/objectifs" className="hover:text-neutral-900 transition-colors">الأهداف</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">إعداد ملف التوظيف</span>
      </nav>

      <PageHeading
        title="إعداد ملف التوظيف : دليل مخصص"
        description="أجب على بعض الأسئلة للحصول على القائمة الدقيقة للوثائق اللازمة حسب وضعيتك."
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
              <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-4">
                للبدء، ما نوع القطاع الذي تستهدفه؟
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, employmentType: 'prive' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  القطاع الخاص
                </button>
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, employmentType: 'public' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  الوظيفة العمومية / المباريات
                </button>
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, employmentType: 'autre' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  قطاع آخر / لا أعلم بعد
                </button>
              </div>
            </Card>
          )}

          {/* Currently Employed Question */}
          {state.employmentType !== '' && state.currentlyEmployed === '' && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-4">
                هل تعمل حاليًا في وظيفة؟
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, currentlyEmployed: 'oui' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  نعم، أشغل عملًا حاليًا
                </button>
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, currentlyEmployed: 'non' }))}
                  className="w-full text-right p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50 hover:border-primary/50 text-sm font-medium"
                >
                  لا، أبحث عن عمل
                </button>
              </div>
            </Card>
          )}
        </div>
      ) : (
        // Results Section when both questions answered
        <>
          <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
            <p className="text-sm text-neutral-700 font-medium leading-relaxed">
              هذه هي الوثائق التي يُوصى بتحضيرها لملف التوظيف الخاص بك:
            </p>

            {/* Progress indicator */}
            <div className="mt-4 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-700">
                مجموع الوثائق الموصى بها: {requiredDocuments.length}
              </span>
              <div className="w-32 bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: '100%' }}
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
              حول ملف التوظيف بالمغرب
            </h2>
            <p className="text-neutral-700">
              في المغرب، تطلب أقسام الموارد البشرية وإدارات التوظيف مجموعة من الوثائق الأساسية عند فتح ملف التوظيف. وقد تختلف هذه الوثائق حسب:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs text-neutral-600">
              <li>طبيعة القطاع (القطاع الخاص، الوظيفة العمومية، المؤسسات العمومية)</li>
              <li>نوع العقد (عقد غير محدد المدة CDI، عقد محدد المدة CDD، عقد إدماج/تدريب ANAPEC)</li>
              <li>سواء كنت تشغل عملاً حالياً أو تبحث عن فرصة جديدة</li>
              <li>سياسة التوظيف الداخلية للشركة</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              نصائح لتعزيز ملف ترشيحك
            </h2>
            <p className="text-neutral-700">
              بالإضافة إلى الوثائق الإدارية، يُنصح بتجهيز العناصر التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs text-neutral-600">
              <li>سيرة ذاتية (CV) حديثة ومنظمة بدقة</li>
              <li>رسالة تحفيزية مخصصة للمنصب المطلوب</li>
              <li>شهادات العمل ودبلومات المكتسبة مصادق عليها عند الاقتضاء</li>
              <li>توصيات مهنية من المشغلين السابقين (إن وجدت)</li>
            </ul>
          </section>
        </article>
      </Card>

      {/* Sources section */}
      <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
        <p className="font-semibold text-neutral-500 mb-2">المصادر الرسمية والمراجع:</p>
        <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
          <li>
            <a
              href="https://www.emploi-public.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              emploi-public.ma — بوابة التشغيل العمومي بالمغرب
            </a>{' '}
            — المساطر ومستندات الترشيح للمباريات العمومية · <span className="italic text-neutral-400">تم التحقق: 18 أغسطس 2026</span>
          </li>
          <li>
            <a
              href="https://www.anapec.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              ANAPEC — الوكالة الوطنية لإنعاش التشغيل والكفاءات
            </a>{' '}
            — المساطر والتأطير في القطاع الخاص · <span className="italic text-neutral-400">تم التحقق: 18 أغسطس 2026</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default GoalConstituerDossierEmbauchePageAr