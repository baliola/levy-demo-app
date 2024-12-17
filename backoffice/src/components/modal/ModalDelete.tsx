import type { ReactElement} from 'react';
import React, { useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import { VscLoading } from 'react-icons/vsc';
import Modal from './Modal';

interface IModalDeleteProps {
  id: string
  name: string
  context: string;
  submit: (id: string) => Promise<void>;
};

export const ModalDelete = ({ props }: { props: IModalDeleteProps}): ReactElement => {
  const { id, name, context, submit } = props;

  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleDeleteModal = (): void => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true)

    try {
      await submit(id)
      toggleDeleteModal()
    } catch (error) {} finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleDeleteModal}
        className="flex text-xs text-white font-medium rounded-full h-fit py-1.5 items-center justify-center gap-1 px-3 lg:px-4 border-[3px] bg-red-500"
      >
        <CiTrash className="w-4 h-4" />
        <span className="hidden lg:block text-left">Delete</span>
      </button>
      <Modal 
        props={{
          isOpen: showDeleteModal,
          toggle: toggleDeleteModal
        }}
      >
        <div className="flex flex-col gap-5 justify-center items-center rounded-2xl aspect-[7/5] h-full bg-white py-8">
          <div className="flex flex-col justify-center items-center gap-3 w-full">
            <FaRegTrashAlt className="text-red-500 w-8 h-8 aspect-square" />
            <h2 className="text-lg tracking-wide font-bold capitalize">Delete {context}</h2>
            <p className="text-center text-xs tracking-wide px-6 leading-5">You&apos;re going to delete<br></br>&quot;<span>{name}</span>&quot; <span className="capitalize">{context}</span>.<br></br>Are you sure?</p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-2/3 text-xs">
            <button 
              type="button"
              onClick={toggleDeleteModal}
              className="bg-gray-400 text-white rounded-lg py-2 px-6"
            >
              No
            </button>
            <button 
              type="button"
              onClick={handleSubmit}
              className="bg-red-500 text-white rounded-lg py-2 px-6"
            >
              {isLoading ? <VscLoading className="text-white m-auto h-4 w-4 font-bold animate-spin" /> : <span className="m-auto">Yes</span>}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
