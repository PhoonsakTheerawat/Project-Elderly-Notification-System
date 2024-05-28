import React, { useState, useRef, useEffect } from 'react'; // นำเข้า hooks และ React
import Navbar from './Navbar'; // นำเข้า Navbar จากไฟล์อื่น
import Navbarsound from './Navbarsound'; // นำเข้า Navbarsound จากไฟล์อื่น
//ปุ่มการคลิ็กและเริ่มอัดเสียง


const RecordingButton = ({ handleRecordingToggle, fileName }) => { // องค์ประกอบสำหรับปุ่มบันทึกเสียง
  const [isRecording, setIsRecording] = useState(false); // state สำหรับตรวจสอบว่ากำลังบันทึกเสียงหรือไม่
  const [mediaRecorder, setMediaRecorder] = useState(null); // state สำหรับเก็บ MediaRecorder object
  const [recordedChunks, setRecordedChunks] = useState([]); // state สำหรับเก็บข้อมูลเสียงที่บันทึกไว้

  const startRecording = async () => { // ฟังก์ชันสำหรับเริ่มการบันทึกเสียง
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // ขออนุญาตเข้าถึงไมโครโฟน
      const recorder = new MediaRecorder(stream); // สร้าง MediaRecorder object
      const newRecordedChunks = [];

      recorder.addEventListener('dataavailable', (event) => { // เมื่อมีข้อมูลเสียงพร้อมใช้งาน
        if (event.data.size > 0) {
          newRecordedChunks.push(event.data); // เก็บข้อมูลเสียงไว้ใน array
        }
      });

      recorder.addEventListener('stop', () => { // เมื่อการบันทึกหยุดลง
        handleRecordingToggle(newRecordedChunks, fileName); // ส่งข้อมูลเสียงและชื่อไฟล์ไปที่ handleRecordingToggle
        stream.getTracks().forEach((track) => track.stop()); // หยุดการเข้าถึงไมโครโฟน
      });

      recorder.start(); // เริ่มการบันทึกเสียง
      setMediaRecorder(recorder); // เก็บ MediaRecorder object ไว้ใน state
      setIsRecording(true); // ตั้งค่า state ให้กำลังบันทึกเสียง
      setRecordedChunks([]); // รีเซ็ตข้อมูลเสียงที่บันทึกไว้
    } catch (error) {
      console.error('Error accessing microphone:', error); // แสดงข้อผิดพลาดหากไม่สามารถเข้าถึงไมโครโฟนได้
    }
  };

  const stopRecording = () => { // ฟังก์ชันสำหรับหยุดการบันทึกเสียง
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop(); // หยุดการบันทึกเสียง
      setIsRecording(false); // ตั้งค่า state ให้ไม่กำลังบันทึกเสียง
    }
  };

  const handleToggleRecording = () => { // ฟังก์ชันสำหรับสลับสถานะการบันทึกเสียง
    if (isRecording) {
      stopRecording(); // หากกำลังบันทึกเสียงอยู่ ให้หยุดการบันทึก
    } else {
      startRecording(); // หากไม่กำลังบันทึกเสียง ให้เริ่มการบันทึก
    }
  };

  const lastButtonClickTimeRef = useRef(0); // ใช้เก็บเวลาคลิกครั้งสุดท้าย

  const handleButtonClick = () => { // ฟังก์ชันสำหรับจัดการการคลิกปุ่ม
    const currentTime = Date.now();
    const timeDifference = currentTime - lastButtonClickTimeRef.current;

    if (timeDifference < 500) {
      handleToggleRecording(); // หากคลิกในช่วงเวลาน้อยกว่า 500 มิลลิวินาที ให้สลับสถานะการบันทึกเสียง
    } else {
      handleToggleRecording(); // หากคลิกในช่วงเวลามากกว่า 500 มิลลิวินาที ให้สลับสถานะการบันทึกเสียงเช่นกัน
    }

    lastButtonClickTimeRef.current = currentTime; // อัปเดตเวลาคลิกครั้งสุดท้าย
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}>
      <button
        style={{
          borderRadius: '50%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle at center, #ffffff 30%, #aedcf5 50%, #aedcf5)',
          color: 'blue',
          fontSize: '25px',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleButtonClick}
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className="h-50 w-40 p-4">
          <img src={isRecording ? "images/micB.png" : "images/micB.png"} alt={isRecording ? "Stop" : "Record"} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', color: '#3498db', fontSize: '16px', fontWeight: 'bold' }}>{isRecording ? 'Stop Recording' : 'Start Recording'}</div>
        </div>
      </button>
    </div>
  );
};






//URL ของไฟล์อัดเสียง



const VoiceRecorder = ({ recordedChunks, fileName }) => {
  const [audioURL, setAudioURL] = useState(''); // state สำหรับเก็บ URL ของไฟล์เสียง
  const audioRef = useRef(null); // ref สำหรับ audio element

  useEffect(() => {
    if (recordedChunks.length > 0) { // เมื่อมีข้อมูลเสียงบันทึกไว้
      const blob = new Blob(recordedChunks, { type: 'audio/mp3' }); // สร้าง Blob จากข้อมูลเสียง
      const url = URL.createObjectURL(blob); // สร้าง URL สำหรับ Blob
      setAudioURL(url); // เก็บ URL ไว้ใน state

      // สร้างลิงก์ดาวน์โหลดไฟล์เสียง
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName || 'recording'}.mp3`;
      document.body.appendChild(link);
      //link.click(); // คลิกลิงก์เพื่อดาวน์โหลดไฟล์
      document.body.removeChild(link); // ลบลิงก์หลังจากคลิกแล้ว
    }
  }, [recordedChunks, fileName]);

  useEffect(() => {
    if (audioURL) {
      audioRef.current.play(); // เล่นเสียงเมื่อ URL เปลี่ยนแปลง
    }
  }, [audioURL]);
  return (
    <div style={{ position: 'fixed', top: '650px', left: '50%', transform: 'translateX(-50%)' }}>
      <div className="display"></div>
      <div className="controllers">
        {audioURL && (
          <div>
            <audio ref={audioRef} controls src={audioURL} /> {/* แสดง audio element สำหรับเล่นเสียง */}
            <button onClick={() => audioRef.current.play()}></button>
          </div>
        )}
      </div>
    </div>
  );
};




//ชื่อไฟล์เสียง



const FileSound = ({ setFileName }) => { // องค์ประกอบสำหรับกรอกชื่อไฟล์เสียง
  const [inputValue, setInputValue] = useState(''); // state สำหรับเก็บค่าที่กรอกใน input

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // อัปเดตค่า input เมื่อมีการกรอกข้อมูล
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFileName(inputValue); // ส่งค่าชื่อไฟล์ไปที่ setFileName
    setInputValue(''); // รีเซ็ตค่า input
  };


  return (
    <div className="mt-36">
      <div className="box-border h-40 w-96 max-w-screen-90 max-h-screen-90 border-blue-500 bg-blue-500 rounded-lg flex flex-col justify-center items-center relative">
        <div className='textshadow tran text-3xl text-white font-black font-sans mb-8' style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', zIndex: '10' }}>
          <h1>ชื่อไฟล์เสียง</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className='shadow-xl w-80 h-9 rounded-full text-center bg-white bg-opacity-90 text-black mb-4'
            type='text'
            placeholder='กรอกชื่อไฟล์เสียง'
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className='shadow-xl tran w-40 h-11 bg-white rounded-full text-lg text-sky-400 font-black font-sans'
            style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: '' }}
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const Sound = () => {
  const [recordedChunks, setRecordedChunks] = useState([]); // state สำหรับเก็บข้อมูลเสียงที่บันทึกไว้
  const [fileName, setFileName] = useState(''); // state สำหรับเก็บชื่อไฟล์

  const handleRecordingToggle = (chunks, fileName) => { // ฟังก์ชันสำหรับจัดการการเริ่ม/หยุดการบันทึกเสียง
    setRecordedChunks(chunks); // เก็บข้อมูลเสียงที่บันทึกไว้ใน state
    setFileName(fileName); // เก็บชื่อไฟล์ไว้ใน state
  };


  return (
    <div className='w-screen h-screen' style={{ backgroundImage: 'linear-gradient(to bottom, #003366, #00539e, #0077cc)' }}>
      <div className='flex flex-col max-w-5xl h-full my-0 mx-auto items-center rounded-t-3xl'>
        <Navbar /> {/* นำเข้า Navbar */}
        <RecordingButton handleRecordingToggle={handleRecordingToggle} fileName={fileName} /> {/* ปุ่มบันทึกเสียงและส่ง props */}
        <VoiceRecorder recordedChunks={recordedChunks} fileName={fileName} /> {/* องค์ประกอบเล่นเสียงและดาวน์โหลดไฟล์ */}
        <FileSound setFileName={setFileName} /> {/* กล่องข้อความสำหรับตั้งชื่อไฟล์ */}
        <Navbarsound /> {/*  Navbarsound */}
      </div>
    </div>
  );
};

export default Sound; 