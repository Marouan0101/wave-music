import React from 'react';

const ProfileSection = ({ items, title }) => {
  return (
    <div className='space-y-2'>
      <div className='text-lg font-semibold'>{title}</div>
      <div className='grid grid-cols-6'>
        {/* Track */}
        {items?.map((item, i) => {
          return (
            <div
              key={i}
              className='col-span-1 items-center rounded-lg bg-background-light p-3 pb-0'
            >
              <img src={item.image} className='w-full rounded-md' />
              <div className='py-2 text-center'>{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSection;
