import React from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import Select from 'react-select'

type TaskBuilderProps = {
  form: UseFormReturn<any>
  fieldName?: string
  equipments: any[]
  technicians: any[]
}

export default function TaskBuilder({
  form,
  fieldName = 'tasks',
  equipments,
  technicians
}: TaskBuilderProps) {

  const { control, formState: { errors } } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  })

  const addTask = () => {
    append({
      description: '',
      equipments_id: null,
      users_id: null,
    })
  }

  return (
    <div className="border border-gray-300 rounded-lg p-6 mt-6 w-full ">
      <div className="flex justify-between items-center mb-6 gap-2">
        <h2 className="text-lg font-bold">Task Builder</h2>
        <span className="text-sm text-gray-500">{fields.length} Tasks Added</span>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row border border-gray-200 rounded-lg p-4 bg-gray-50 gap-4">
            {/* Description */}
            <div className="mb-4 w-full max-w-xs">
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <Controller
                control={control}
                name={`${fieldName}.${index}.description`}
                rules={{ required: 'Required' }}
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

            {/* Equipment */}
            <div className="mb-4 w-full max-w-xs">
              <label className="block text-sm font-medium mb-2">Equipo</label>
              <Controller
                control={control}
                name={`${fieldName}.${index}.equipments_id`}
                rules={{ required: 'Required' }}
                render={({ field }) => (
                  <Select
                    options={equipments}
                    value={equipments?.find(e => e.value === field.value)}
                    onChange={(option) => field.onChange(option?.value)}
                  />
                )}
              />
            </div>

            {/* Technician */}
            <div className="mb-4 w-full max-w-xs">
              <label className="block text-sm font-medium mb-2">Técnico</label>
              <Controller
                control={control}
                name={`${fieldName}.${index}.users_id`}
                rules={{ required: 'Required' }}
                render={({ field }) => (
                  <Select
                    options={technicians}
                    value={technicians?.find(t => t.value === field.value)}
                    onChange={(option) => field.onChange(option?.value)}
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
        ))}
      </div>

      <button
        type="button"
        onClick={addTask}
        className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-md"
      >
        + Add Task
      </button>
    </div>
  )
}