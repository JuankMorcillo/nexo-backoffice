import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import Iconos from './ui/hooks/iconos'

export default function Forms({ styles, data, setInfo, inputs, submitting }: InputsProps) {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        setError,
        reset
    } = useForm({
        defaultValues: { ...data || {} }
    })

    const { loadingIcon } = Iconos({ classNames: 'size-6 animate-spin', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 0 })

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    const onSubmit = (data: JSON) => {
        setInfo((prev: any) => ({ ...prev, ...data }));
    };

    return (
        <>

            {
                inputs.length > 0 &&

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div
                        style={{
                            display: 'grid',
                            '--grid-cols': styles.cols || 1,
                            gridTemplateColumns: `repeat(var(--grid-cols), minmax(0, 1fr))`
                        } as React.CSSProperties}
                    >
                        {
                            inputs.map((input, i) => (
                                <div
                                    className='flex flex-col gap-2 mb-4'
                                    key={i}
                                >
                                    <label htmlFor={input.id} key={input.id + 'label'}>{input.label}</label>
                                    {
                                        input.list ? (
                                            <Controller
                                                key={input.id}
                                                control={control}
                                                name={input.id}
                                                rules={{
                                                    required: input.required,
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <Select
                                                            key={input.id + 'select'}
                                                            placeholder='Seleccione'
                                                            noOptionsMessage={() => 'Búsqueda no encontrada'}
                                                            styles={{
                                                                control: (basesStyles, state) => ({
                                                                    ...basesStyles,
                                                                    backgroundColor: 'transparent',
                                                                    color: '#000',
                                                                    maxWidth: 'auto',
                                                                }),
                                                                multiValue: (styles) => ({
                                                                    ...styles,
                                                                    backgroundColor: 'transparent',
                                                                }),
                                                                menu: (styles) => ({
                                                                    ...styles,
                                                                    backgroundColor: 'white',
                                                                    maxWidth: 'auto',
                                                                }),
                                                            }}

                                                            theme={(theme) => ({
                                                                ...theme,
                                                                colors: {
                                                                    ...theme.colors,
                                                                    neutral0: 'white',
                                                                    primary25: 'grey',
                                                                    primary: 'grey',
                                                                    neutral80: 'black',

                                                                },
                                                            })}
                                                            isMulti={input.multi}
                                                            ref={field.ref}
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            options={input.options}
                                                            isSearchable={true}
                                                            defaultValue={
                                                                input.multi ?

                                                                    field.value?.map((v: string | number) => {
                                                                        return input.options?.find(c => c.value === v)
                                                                    })

                                                                    :
                                                                    input.options?.find(c => {
                                                                        if (field.value instanceof Array) {
                                                                            return field.value.includes(c.value)
                                                                        } else {
                                                                            return c.value === field.value
                                                                        }
                                                                    })
                                                            }
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
                                                        />
                                                    </>
                                                )}
                                            />

                                        ) :
                                            (
                                                <div key={input.id + 'inputsContainer'}>
                                                    <input
                                                        className='border border-gray-300 rounded-md p-2 w-full min-w-70'
                                                        id={input.id + 'input'}
                                                        type={input.type}
                                                        placeholder={input.placeholder}
                                                        {...register(input.id, { required: input.required })}
                                                        disabled={submitting}
                                                    />
                                                </div>
                                            )
                                    }

                                    {
                                        errors[input.id]?.type == 'required'
                                            ?
                                            <div
                                                key={input.id + 'error'}
                                                style={{
                                                    color: 'red'
                                                }}>
                                                This field is required
                                            </div>
                                            :
                                            errors[input.id]?.type == 'validate'
                                                ?
                                                <div
                                                    key={input.id + 'errorValidate'}
                                                    style={{
                                                        color: 'red'
                                                    }}>
                                                    {input?.error?.message}
                                                </div>
                                                :
                                                <></>
                                    }
                                </div>
                            ))
                        }
                    </div>

                    <div
                        style={
                            {
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                padding: "0px 0px 30px 0px"
                            }
                        }
                    >
                        <button
                            className={`flex items-center justify-center gap-2 ${submitting ? 'cursor-not-allowed bg-gray-400' : 'cursor-pointer'}`}
                            style={
                                {
                                    border: "1px solid gray",
                                    padding: "10px 30px",
                                    borderRadius: "10px",
                                    background: "none",
                                    display: styles.buttonDisplay ? 'flex' : 'none',
                                }
                            }
                            type="submit" disabled={submitting}>
                            {styles.textButton || 'Submit'}
                            {submitting && loadingIcon}
                        </button>
                    </div>
                </form>


            }

        </>
    )
}