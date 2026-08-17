import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button, Card } from './ui'

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <Card className="p-8 sm:p-12 border-primary-100">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary">
              <svg className="w-7 h-7" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-neutral-900 mb-2">
              Une erreur inattendue est survenue
            </h2>
            <p className="text-sm text-neutral-500 mb-6 leading-relaxed max-w-md mx-auto">
              Un problème est survenu lors de l'affichage de ce composant. Vous pouvez réessayer ou retourner à la page d'accueil.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={this.handleReset} variant="secondary">
                Réessayer
              </Button>
              <Button as="a" href="/" variant="primary">
                Retour à l'accueil
              </Button>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
