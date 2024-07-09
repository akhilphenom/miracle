import { create } from 'zustand'

const defaultValues = {
    _id: '',
    title: '',
}

interface IRenameModal {
    isOpen: boolean;
    initialValues: typeof defaultValues;
    onOpen: (_id: string, title: string) => void;
    onClose: () => void;
}

export const useRenameModal = create<IRenameModal>(
    (set) => ({
        isOpen: false,
        onOpen: (_id, title) => set({
            isOpen: true,
            initialValues: { _id, title }
        }),
        onClose: () => set({
            isOpen: false,
            initialValues: defaultValues,
        }),
        initialValues: defaultValues
    })
)