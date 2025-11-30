'use client';
import { TextField } from '@radix-ui/themes';
import React from 'react'

const NewIssuePage = () => {
  console.log("TextField =", TextField);

  return (
    <div className='max-w-xl'>
    <TextField.Root>
      <TextField.Slot>
        <input
          placeholder="Title"
          className="w-full px-3 py-2 border rounded text-left"
        />
      </TextField.Slot>
    </TextField.Root>
    </div>
  )
}

export default NewIssuePage
