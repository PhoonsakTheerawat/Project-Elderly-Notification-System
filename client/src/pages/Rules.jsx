import React from 'react'

function Rules() {
  return (
  <div className='w-screen h-screen bg-sky-400'>
    <div className='relative max-w-5xl h-full my-0 mx-auto text-center border-4 border-red-500'>
      <div className='tran top45 left-1/2 relative h-4/5 w-4/5 text-center rounded-lg bg-white shadow-xl'>
        <h1 className='flex flex-col pt-14 text-2xl font-black font-sans'>ข้อตกลงและเงื่อนไข</h1>
        
        <p className='indent-20 flex flex-col text-start mt-2 text-lg w-ful whitespace-nowrap font-medium font-sans pt-4'>1.ผู้ใช้ต้องยินยอมให้สิทธิการเข้าถึงข้อมูลและการแจ้งเตือนบนอุปกรณ์โทรศัพธ์</p>
        <p className='indent-20 flex flex-col text-start mt-2 text-lg w-ful whitespace-nowrap font-medium font-sans'>2.ผู้ใช้ต้องรับผิดชอบในการตรวจสอบและปรับปรุงข้อมูลส่วนตัวและข้อมูลการรักษาของผู้สูงอายุ</p>
        <p className='indent-20 flex flex-col text-start mt-2 text-lg w-ful whitespace-nowrap font-medium font-sans'>3.ผู้ใช้ต้องปฏิบัติตามการวินิจฉัยหรือคำแนะนำของแพทย์เพื่อให้ได้รับการรักษาด้วยยาที่ถูกต้อง</p>
        <p className='indent-20 flex flex-col text-start mt-2 text-lg w-ful whitespace-nowrap font-medium font-sans'>4.ผู้ใช้ต้องรายงานปัญหาหรือข้อผิดพลาดของ App เพื่อให้ทีมงานนำไปพัฒนาแก้ไข</p>
       
      
        
        </div>
    </div>
  </div>
  )
}

export default Rules