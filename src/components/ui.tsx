import React from 'react'

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  /** Renders as an anchor tag when provided */
  as?: 'button' | 'a'
  href?: string
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  as: Tag = 'button',
  href,
  children,
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-primary shadow-sm',
    secondary:
      'bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50 hover:ring-neutral-300 active:bg-neutral-100 focus-visible:outline-primary',
  }

  const classes = [base, variants[variant], className].join(' ')

  if (Tag === 'a' && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------
export interface CardProps {
  children: React.ReactNode
  className?: string
  /** Makes the whole card a clickable link */
  as?: 'div' | 'article'
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  as: Tag = 'div',
}) => {
  return (
    <Tag
      className={[
        'bg-white rounded-xl shadow-card border border-neutral-100 p-6',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  )
}

// ---------------------------------------------------------------------------
// FormField
// ---------------------------------------------------------------------------
export interface FormFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  hint,
  required,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-neutral-700 select-none"
      >
        {label}
        {required && (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Clone child to inject common input classes */}
      <div>{children}</div>

      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-neutral-500">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-primary flex items-center gap-1"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Standard text/email/date input styled to match the design system.
 * Use inside <FormField>.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  return (
    <input
      className={[
        'w-full rounded-lg border px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
        error
          ? 'border-primary bg-primary-50'
          : 'border-neutral-200 bg-white hover:border-neutral-300',
        className,
      ].join(' ')}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// PageHeading
// ---------------------------------------------------------------------------
export interface PageHeadingProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <header className="mb-8">
      {icon && (
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
          {icon}
        </div>
      )}
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-base text-neutral-500 max-w-2xl">{description}</p>
      )}
      <div className="mt-4 h-0.5 w-12 rounded-full bg-primary" aria-hidden="true" />
    </header>
  )
}
