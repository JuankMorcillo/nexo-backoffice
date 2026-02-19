declare global {

    type Inputs = Array<{
        label: string,
        id: string,
        type: string,
        placeholder?: string,
        required: boolean
        list?: boolean,
        multi?: boolean,
        array?: boolean,
        set?: (value: any) => void,
        options?: Array<{
            label: string,
            value: string | number
        }>
        error?: {
            message: string
        }
    }>

    type InputsProps = {
        styles: any
        data?: any
        inputs: Inputs
        submitting: boolean
        setInfo: (value: any) => void
    }
}

export { }