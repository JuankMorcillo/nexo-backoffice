'use client';

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { useSession } from 'next-auth/react'
import Iconos from '../../components/ui/hooks/iconos';
import { fetchQuestionTypes } from '../../store/slices/questionTypesSlice';
import { Actions, TopActions } from '../../types/table';
import MyTable from '../../components/table';
import Modal from '../../components/modal';
import { question_types_columns } from './questionTypeColumns';
import CreateQuestionType from './create/page';
import EditQuestionType from './edit/page';

export default function QuestionTypes() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    const [question_type_id, setQuestionTypeId] = useState(0)

    const { pencilIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

    const handleFetchQuestionTypes = async (params: Params) => {
        if (session?.user.access_token) {
            const result = await dispatch(
                fetchQuestionTypes({ token: session.user.access_token, params: params })
            )
            return {
                meta: result.payload?.meta || { total: 0 },
                data: result.payload?.data || [],
            }
        }
        return { meta: { total: 0 }, data: [] }
    }

    const actions: Actions[] = [
        {
            name: 'Editar',
            icon: pencilIcon,
            action: (row) => {
                setQuestionTypeId(row.id)
                setModalEdit(true)
            }
        }
    ]

    const topActions: TopActions[] = [
        {
            name: 'Crear Tipo de pregunta',
            action: () => setModalCreate(true)
        }
    ]

    return (
        <>

            <MyTable
                columns={question_types_columns}
                getInfo={handleFetchQuestionTypes}
                options={{ bd: true }}
                topActions={topActions}
                actions={actions}
            />

            <Modal
                open={modalCreate}
                setOpen={setModalCreate}
                title="Crear Tipo de orden"
                children={
                    <CreateQuestionType />
                }
                x_icon={true}
            />

            <Modal
                open={modalEdit}
                setOpen={setModalEdit}
                title="Editar Tipo de orden"
                children={
                    <EditQuestionType id={question_type_id} />
                }
                x_icon={true}
            />


        </>
    )
}