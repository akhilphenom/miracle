"use client";

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'
import { useAxios } from '@/lib/hooks/axios.hook';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface InfoProps {
  boardId: string
}

function InfoComponent({
  boardId
}: InfoProps) {
  const [board, setBoard] = useState(null)
  const { fetchData: fetchBoardData, loading, response } = useAxios();
  const getBoards = async () => {
    await fetchBoardData({
        url: 'miracle-organization/board',
        method: 'GET',
        params: { _id: boardId }
    })
  }

  useEffect(() => {
    response && setBoard(response.data)
    console.log(response)
  }, [response])

  useEffect(() => {
    getBoards();
  }, [boardId])
  
  return (
    <div className='shadow-md bg-[#2979FF] absolute top-3 p-1 left-3 text-sm rounded-md'>
      <Button variant={'board'}>
        <Image src={'/logo-transparent-white.png'} height={40} width={40} alt='Miracle Logo'/>
      </Button>
    </div>
  )
}
export const InfoSkeleton = () => (
  <div className='shadow-md bg-white absolute top-3 left-3 text-sm rounded-md w-[80px] h-[48px]'>
    <Skeleton className='h-full w-full bg-muted-foreground'/>
  </div>
)
export default InfoComponent
