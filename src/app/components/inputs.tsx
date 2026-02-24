// src/app/components/inputs/inputs.tsx
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import Select from 'react-select'

type InputsProps = {
    inputs: Inputs
    form: UseFormReturn<any>  // ← Recibe el formulario del padre
    submitting?: boolean
}

export default function Inputs({ inputs, form, submitting }: InputsProps) {
    const { register, control, formState: { errors } } = form

    return (
        <div
            className='w-full max-w-xl'
            style={{
                display: 'grid',
                '--grid-cols': 1,
                gridTemplateColumns: `repeat(var(--grid-cols), minmax(0, 1fr))`
            } as React.CSSProperties}
        >
            {inputs.map((input, i) => (
                <div className='flex flex-col gap-2 mb-4' key={i}>
                    <label htmlFor={input.id}>{input.label}</label>

                    {input.list ? (
                        <Controller
                            control={control}
                            name={input.id}
                            rules={{ required: input.required }}
                            render={({ field }) => (
                                <Select
                                    placeholder='Seleccione'
                                    options={input.options}
                                    value={input.options?.find(c => c.value === field.value)}
                                    onChange={val => {
                                        if (val instanceof Array) {
                                            if (input?.set) {
                                                const setValue = input?.set
                                                setValue(val?.map(v => v.value))
                                            }
                                            field.onChange(val?.map(v => v.value))
                                        } else {
                                            if (input?.set) {
                                                const setValue = input?.set
                                                setValue(val?.value)
                                            }
                                            if (input.array) {
                                                field.onChange([val?.value])
                                            } else {
                                                field.onChange(val?.value)
                                            }
                                        }
                                    }}
                                    isSearchable={true}
                                />
                            )}
                        />
                    ) : (
                        <input
                            className='border border-gray-300 rounded-md p-2 w-full'
                            id={input.id}
                            type={input.type}
                            placeholder={input.placeholder}
                            {...register(input.id, { required: input.required })}
                            disabled={submitting}
                        />
                    )}

                    {errors[input.id]?.type === 'required' && (
                        <div style={{ color: 'red' }}>This field is required</div>
                    )}
                </div>
            ))}
        </div>
    )
}