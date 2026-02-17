export type ToastProps = {
    id: string | null
    message?: string
    position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
    icon?: React.ReactNode | string
    duration?: number
}