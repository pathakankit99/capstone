import { BsFillPlayCircleFill } from 'react-icons/bs'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
 
};

function Trending() {
    const[url,setUrl]= useState("")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <section className="  lg:h-60vh px-8 pt-10">
      <div className="py-6 pl-8 text-3xl font-semibold text-[#e1f2fe]">
        <p>Trending Now</p>
      </div>
      <div className="trending-cards flex flex-wrap items-center">
        <div className="card-container   w-full lg:w-3/12 p-6">
          <div className="bg-[#1b263b] text-[#e1f2fe] p-3  rounded-2xl">
            <div className="card flex justify-center">
              <img
                className="card-img rounded-3xl py-3"
                src="assets/attack.jpg"
              />
            </div>
            <div className="flex items-center  justify-between px-5">
              <div className="text-sm 2xl:text-xl ">
                <p>Ratings-8.5</p>
                <p className="pr-3 card-text font-semibold card-text">
                 Attack
                </p>
              </div>
              <div className="2xl:text-2xl" >
              <button onClick={
                  ()=>{
                  handleOpen();
                  setUrl("https://www.youtube.com/embed/KnC-XvFGflM")
                  }}> <BsFillPlayCircleFill /></button>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box className='box' sx={style}>
                    <iframe
        src={url}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
        className='youtube'
      />
                    </Box>
                    </Modal>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container   w-full lg:w-3/12 p-6">
          <div className="bg-[#1b263b] text-[#e1f2fe] p-3  rounded-2xl">
            <div className="card flex justify-center">
              <img
                className="card-img rounded-3xl py-3"
                src="assets/kgf2.jpg"
              />
            </div>
            <div className="flex items-center  justify-between px-5">
              <div className="text-sm 2xl:text-xl ">
                <p>Ratings-8.9</p>
                <p className="pr-3 font-semibold card-text">
                  K.G.F Chapter 2
                </p>
              </div>
              <div className="2xl:text-2xl" >
              <button onClick={
                  ()=>{
                  handleOpen();
                  setUrl("https://www.youtube.com/embed/JKa05nyUmuQ")
                  }}> <BsFillPlayCircleFill /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container  w-full lg:w-3/12 p-6">
          <div className="bg-[#1b263b] text-[#e1f2fe] p-3  rounded-2xl">
            <div className="card flex justify-center">
              <img
                className="card-img rounded-3xl py-3"
                src="assets/rrr.jpg"
              />
            </div>
            <div className="flex items-center  justify-between px-5">
              <div className="text-sm 2xl:text-xl ">
                <p>Ratings-7.2</p>
                <p className="pr-3 font-semibold card-text">
                  RRR
                </p>
              </div>
              <div className="2xl:text-2xl" >
              <button onClick={
                  ()=>{
                  handleOpen();
                  setUrl("https://www.youtube.com/embed/GY4BgdUSpbE")
                  }}> <BsFillPlayCircleFill /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container  w-full lg:w-3/12 p-6">
          <div className="bg-[#1b263b] text-[#e1f2fe] p-3  rounded-2xl">
            <div className="card flex justify-center">
              <img
                className="card-img rounded-3xl py-3"
                src="assets/kashmir.jpg"
              />
            </div>
            <div className="flex items-center  justify-between px-5">
              <div className="text-sm 2xl:text-xl ">
                <p>Ratings-7.9</p>
                <p className="pr-3 font-semibold card-text">
                 The Kashmir files
                </p>
              </div>
              <div className="2xl:text-2xl" >
              <button onClick={
                  ()=>{
                  handleOpen();
                  setUrl("https://www.youtube.com/embed/A179apttY58")
                  }}> <BsFillPlayCircleFill /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Trending
