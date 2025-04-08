'use client'

import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  className?: string
  variant?: 'default' | 'inline' | 'toast'
}

export default function ErrorMessage({
  title = 'Error',
  message,
  onRetry,
  className = '',
  variant = 'default'
}: ErrorMessageProps) {
  if (variant === 'inline') {
    return (
      <div className={`text-red-500 flex items-start ${className}`}>
        <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5 mr-1.5" aria-hidden="true" />
        <span className="text-sm">{message}</span>
      </div>
    )
  }
  
  if (variant === 'toast') {
    return (
      <div className={`p-4 bg-red-900/60 shadow-lg rounded-lg border border-red-600 ${className}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-300">{title}</p>
            <p className="mt-1 text-sm text-gray-300">{message}</p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="mt-2 text-sm font-medium text-red-300 hover:text-red-200"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  // Default variant
  return (
    <div className={`rounded-md bg-red-500/10 p-4 border border-red-500 ${className}`}>
      <div className="flex">
        <ExclamationCircleIcon className="h-5 w-5 text-red-400 mt-0.5 mr-3" aria-hidden="true" />
        <div>
          <h3 className="text-sm font-medium text-red-400">{title}</h3>
          <p className="mt-1 text-sm text-gray-300">{message}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 