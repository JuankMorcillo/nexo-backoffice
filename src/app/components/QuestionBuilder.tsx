import React from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

type QuestionBuilderProps = {
  form: UseFormReturn<any>
  fieldName?: string
  questionTypes: any[]
  setQuestionType: (id: any) => void
  questionTypeInfo?: any
}

export default function QuestionBuilder({
  form,
  fieldName = 'questions',
  questionTypes,
  setQuestionType,
  questionTypeInfo
}: QuestionBuilderProps) {

  const { control, watch, formState: { errors } } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  })

  const addQuestion = () => {
    append({
      name: '',
      description: '',
      questions_types_id: 0,
    })
  }

  return (
    <div className="p-4 w-full ">
      <div className="flex justify-between items-center mb-6 gap-2">
        <h2 className="text-lg font-bold">Preguntas</h2>
        <span className="text-sm text-gray-500">{fields.length} Preguntas Agregadas</span>
      </div>

      <div className="space-y-4">
        {fields.map((field, index: number) => {

          // Obtén el tipo de pregunta seleccionado para ESTA pregunta específica
          const currentQuestionTypeId = watch(`${fieldName}.${index}.questions_types_id`)
          const selectedType = questionTypes?.find(e => e.value === currentQuestionTypeId)

          // Verifica si es un tipo seleccionable
          const isSelectableType = selectedType?.label?.toLowerCase().includes('select')
            || selectedType?.label?.toLowerCase().includes('seleccionable')
            || selectedType?.label?.toLowerCase().includes('selector')

          return (
            <div key={field.id} className="flex flex-row border border-gray-300 rounded-lg p-4 bg-gray-50 gap-4">
              {/* Name */}
              <div className="mb-4 w-full max-w-xs">
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <Controller
                  control={control}
                  name={`${fieldName}.${index}.name`}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Nombre de la pregunta"
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  )}
                />
              </div>
              {/* Description */}
              <div className="mb-4 w-full max-w-xs">
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <Controller
                  control={control}
                  name={`${fieldName}.${index}.description`}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Descripción"
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  )}
                />
              </div>

              {/*Question Types*/}
              <div className="mb-4 w-full max-w-xs">
                <label className="block text-sm font-medium mb-2">Tipo de pregunta</label>
                <Controller
                  control={control}
                  name={`${fieldName}.${index}.questions_types_id`}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      options={questionTypes}
                      value={questionTypes?.find(e => e.value === field.value)}
                      onChange={(option) => {
                        field.onChange(option?.value)
                        setQuestionType({ option, index })
                      }}
                    />
                  )}
                />
              </div>

              {/*Creatable Select*/}
              {
                isSelectableType &&
                <div className="mb-4 w-full max-w-xs">
                  <label className="block text-sm font-medium mb-2">Respuestas</label>
                  <Controller
                    control={control}
                    name={`${fieldName}.${index}.responses`}
                    rules={{
                      validate: (value) => {
                        if (isSelectableType && (!value || value.length === 0)) {
                          return 'Las respuestas son requeridas'
                        }
                        return true
                      }
                    }}
                    render={({ field }) => (
                      <CreatableSelect
                        placeholder='Seleccione'
                        noOptionsMessage={() => 'Búsqueda no encontrada'}
                        formatCreateLabel={(inputValue) => `Agregar: ${inputValue}`}
                        onChange={(option) => field.onChange(option?.map(o => o?.value) || [])}
                        value={field.value?.map((v: string) => ({ label: v, value: v }))}
                        isMulti
                      />
                    )}
                  />
                </div>
              }

              {/* Required */}

              <div className="max-w-xs flex flex-col items-center justify-center">
                <label className="block text-sm font-medium mb-2">Requerida</label>
                <Controller
                  control={control}
                  name={`${fieldName}.${index}.required`}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  )}
                />
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                🗑️ Eliminar
              </button>
            </div>
          )
        }

        )}
      </div>

      <button
        type="button"
        onClick={addQuestion}
        className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-md"
      >
        + Agregar Pregunta
      </button>
    </div>
  )
}