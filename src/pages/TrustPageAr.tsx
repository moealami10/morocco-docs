import React from 'react'
import { PageHeading, Card } from '../components/ui'
import { Seo } from '../components/Seo'

const TrustPageAr: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="الخصوصية والأمان — تبقى بياناتك خاصة | Kaghit"
        description="اكتشف كيف تحمي Kaghit خصوصيتك بفضل تصميمها الذي يعمل بالكامل في متصفحك، بدون خادم ولا قاعدة بيانات. بياناتك لا تغادر متصفحك أبداً."
        canonicalUrl="https://kaghit.com/ar/confidentialite"
      />

      <PageHeading
        title="تبقى بياناتك خاصة"
        description="افهم كيف تضمن Kaghit سرية وسلامة معلوماتك الشخصية من خلال تصميمها الذي يعمل بالكامل في متصفحك."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3zm5 9v-3a1 1 0 00-1-1H4a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1z"/>
            <path d="M12 9a4 4 0 100 8 4 4 0 000-8z"/>
          </svg>
        }
      />

      {/* Architecture Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          لا خوادم، معالجة محلية بالكامل
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-4">
          تعمل Kaghit بالكامل في متصفحك. لا يتم إرسال أي بيانات إلى خادم، ولا تخزينها في قاعدة بيانات، ولا معالجتها بواسطة طرف ثالث.
        </p>

        <div className="space-y-3 text-sm text-neutral-800 font-medium">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
            لا يتطلب التسجيل
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
            لا يتم جمع أي بيانات شخصية
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
            المعالجة 100% المحلية في متصفحك
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
            لا يتم نقل معلوماتك إلى خوادم خارجية
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
            تبقى بياناتك فقط على جهازك
          </div>
        </div>
      </Card>

      {/* Data Handling Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          كيف تتم معالجة بياناتك
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-4">
          عندما تملأ نموذجًا على Kaghit، يتم تخزين معلوماتك مؤقتًا في ذاكرة متصفحك فقط للسماح لك بمعاينة وإنشاء مستندك.
        </p>

        <div className="space-y-3 text-sm text-neutral-800 font-medium">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
            التخزين المؤقت في sessionStorage (يُمسح عند إغلاق العلامة التبويب أو المتصفح)
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
            البيانات متاحة فقط أثناء جلسة التصفح الحالية
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
            لا يتم حفظ أي سجل بعد إغلاق العلامة
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
            يعمل مولد PDF بالكامل في متصفحك بفضل pdf-lib
          </div>
        </div>

        <p className="mt-4 text-xs text-neutral-500 leading-relaxed bg-neutral-50 px-3 py-2 rounded">
          <strong>ملاحظة:</strong> نستخدم @vercel/analytics لجمع بيانات مجهولة ومجمعة حول الاستخدام العام للصفحة (الصفحات المشاهدة، معدل الارتداد، إلخ). لا يتم جمع أي بيانات شخصية أو معلومات أدخلتها في النماذج أو نقلها.
        </p>
      </Card>

      {/* Security Guarantees Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          ضمانات الأمان الخاصة بنا
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                1
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">لا خادم، لا قاعدة بيانات</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                ليس لدى Kaghit أي خادم خلفي ولا قاعدة بيانات. هذه الهندسة تلغي تمامًا مخاطر تسرب البيانات أو الاختراق المتعلقة بالتخزين المركزي للمعلومات الحساسة.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                2
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">معالجة محلية بالكامل</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                تتم جميع الحسابات، وتوليد المعاينة، وإنشاء PDF مباشرة في متصفحك. لا يغادر شيء جهازك أثناء استخدامك للأداة.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">مسح تلقائي للبيانات</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                يتم تخزين بياناتك في sessionStorage، مما يعني أنها تُمسح تلقائيًا عند إغلاق العلامة التبويب أو المتصفح، دون ترك أي بقايا مستمرة على جهازك.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                4
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">الشفافية التامة</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                كود مصدر Kaghit متاح للجميع على GitHub، مما يسمح لأي شخص بالتحقق من تصريحاتنا حول السرية.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* What We Don't Do Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          ما لا نقوم به
        </h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">✕</span>
            <span className="flex-1 text-neutral-600">بيع أو مشاركة بياناتك الشخصية مع أطراف ثالثة</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">✕</span>
            <span className="flex-1 text-neutral-600">احتفاظ بمعلوماتك بعد إغلاق العلامة</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">✕</span>
            <span className="flex-1 text-neutral-600">استخدام ملفات تعريف الارتباط للتتبع أو للأغراض الإعلانية</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">✕</span>
            <span className="flex-1 text-neutral-600">الطلب إنشاء حساب أو الاتصال بخدمة</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">✕</span>
            <span className="flex-1 text-neutral-600">إرسال بياناتك إلى خوادم للمعالجة أو التخزين</span>
          </div>
        </div>
      </Card>

      {/* Verification Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          كيف يمكنكم التحقق من التزامنا بحماية البيانات
        </h2>

        <p className="text-neutral-600 leading-relaxed mb-4">
          يمكنكم التأكد بأن Kaghit تحترم التزاماتها بالسرية عبر الخطوات التالية :
        </p>

        <div className="space-y-3 text-sm text-neutral-800">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              افتح أدوات التطوير في متصفحك (اضغط F12 أو انقر بزر الفأر الأيمن واختر "فحص العنصر")، ثم انتقل إلى علامة التبويب "التطبيق" ثم "التخزين" ثم "تخزين الجلسة" لرؤية البيانات المؤقتة المخزنة أثناء استخدامك للأداة.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              افتح أدوات التطوير في متصفحك، ثم انتقل إلى علامة التبويب "الشبكة" وتحقق من عدم إرسال أي طلبات إلى نطاقات خارجية عند ملء النموذج وإنشاء المستند (باستثناء الطلبات إلى kaghit.com وشبكات CDN لتحميل موارد الموقع).
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              استعرض كود مصدر Kaghit على GitHub للتأكد من عدم وجود أي أكواد ترسل البيانات إلى خوادم خارجية.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              عند إنشاء ملف PDF، ينتج المولد الملف مباشرة في متصفحك ليكون جاهزًا للتنزيل دون الحاجة لاستدعاء أي خدمة خارجية.
            </span>
          </div>
        </div>
      </Card>

      {/* Limitations Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          القيود والمسؤوليات
        </h2>

        <p className="text-neutral-600 leading-relaxed mb-4">
          على الرغم من أن Kaghit تبذل كل الجهد لحماية خصوصيتك، من المهم فهم بعض القيود :
        </p>

        <div className="space-y-3 text-sm text-neutral-600">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              تولد Kaghit نماذج مستندات للاستخدام العملي. لكي يحصل المستند على قيمة قانونية رسمية، يجب طباعته وتوقيعه من الأطراف المعنية، وفي بعض الحالات، استكماله بختم رسمي أو إتمام إجراءات التقنين وفقًا لمتطلبات الإدارة المغربية.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              لا نقدم استشارات قانونية أو ضريبية. المعلومات المقدمة على الموقع هي لأغراض إعلامية فقط ولا تحل محل استشارة متخصص مؤهل للأسئلة الخاصة بحالتك.
            </span>
          </div>
        </div>
      </Card>

      {/* Trust Badge Section */}
      <div className="text-center pt-8 border-t border-neutral-200">
        <p className="text-xs text-neutral-500">
            الثقة عبر الشفافية الكاملة والاحترام المطلق للخصوصية
        </p>
      </div>
    </div>
  )
}

export default TrustPageAr