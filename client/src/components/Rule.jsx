import React from 'react';

const Rule = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  return (
    <>
      <div
        id='wrapper'
        className='fixed inset-0 bg-neutral-50 bg-opacity-25 backdrop-blur-sm flex justify-center items-center '
        onClick={handleClose}
      >
        <div className='w-[800px] flex flex-col '>
          <button
            className='text-slate-50 text-2xl place-self-end'
            onClick={onClose}
          >
            X
          </button>
          <div className='bg-slate-50 p-2 rounded'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Rule;
