import MovilHeader from "../../components/ui/movil_header"

type Props = {
    children: React.ReactNode
}

export default function layout({ children }: Props) {
    return (
        <div className='min-h-screen w-full flex flex-col'>
            <MovilHeader />
            {children}
        </div>
    )
}