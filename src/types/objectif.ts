export type TagType =
  | 'Obligatoire légalement'
  | 'Souvent demandé'
  | 'Recommandé'
  | 'Dépend de la situation';

export function getTagBadgeStyle(tag: TagType): string {
  switch (tag) {
    case 'Obligatoire légalement':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'Souvent demandé':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'Recommandé':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'Dépend de la situation':
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
}