import { BsFillInfoCircleFill } from 'react-icons/bs'
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#1b263b',
  border: '2px solid #000',
  boxShadow: 24,
}

function Upcoming() {
  const [url, setUrl] = useState('')
  const [heading, setHeading] = useState('')
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <section id="upcoming-movies" className=" px-8 pt-10">
      <div className="py-6 pl-8 text-3xl font-semibold text-[#e1f2fe]">
        <p>Upcoming</p>
      </div>
      <div className="trending-cards flex flex-wrap items-center">
        <div className="card-container   w-full p-6 lg:w-3/12">
          <div className="rounded-2xl bg-[#1b263b] p-3  text-[#e1f2fe]">
            <div className="card flex justify-center">
              <img
                className="card-img rounded-3xl py-3"
                src="/assets/hero2.jpg"
              />
            </div>
            <div className="flex items-center  justify-between px-5">
              <div className="text-sm 2xl:text-xl ">
                <p>Ratings-NA</p>
                <p className="card-text card-text pr-3 font-semibold">
                  Heropanti 2
                </p>
              </div>
              <div className="2xl:text-2xl">
                <button
                  onClick={() => {
                    handleOpen();
                    setText(
                      'Heropanti 2 is about a guy who helps people at night. Whether that be saving someone from a robbery or kidnapping this guy is always there. The Indian government finds out about this and sends him to Russia where he has the mission of killing Russian troops at night. But somehow something goes wrong and the whole world thinks this is the leader of the Russian troops. Watch how he uses the darkness to beat the enemies and prove everyone wrong.'
                    );
                  }}
                >
                  <BsFillInfoCircleFill />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container   w-full lg:w-3/12 p-6">
          <div className="bg-[#1b263b] text-[#e1f2fe] p-3  rounded-2xl">
            <div className="card flex justify-center">
              <img
                className="card-img rounded-3xl py-3"
                src="assets/runway.jpg"
              />
            </div>
            <div className="flex items-center  justify-between px-5">
              <div className="text-sm 2xl:text-xl ">
                <p>Ratings-NA</p>
                <p className="pr-3 font-semibold card-text">
                  Runway 34
                </p>
              </div>
              <div className="2xl:text-2xl" >
              <button onClick={
                  ()=>{
                  handleOpen();
                  setHeading("Runway")
                  setText("")
                  }}> <BsFillInfoCircleFill /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container  w-full lg:w-3/12 p-6">
          <div className="bg-[#1b263b] text-[#e1f2fe] p-3  rounded-2xl">
            <div className="card flex justify-center">
              <img
                className="card-img rounded-3xl py-3"
                src="assets/bramhastra.jpg"
              />
            </div>
            <div className="flex items-center  justify-between px-5">
              <div className="text-sm 2xl:text-xl ">
                <p>Ratings-NA</p>
                <p className="pr-3 font-semibold card-text">
                  Bramhastra
                </p>
              </div>
              <div className="2xl:text-2xl" >
              <button onClick={
                  ()=>{
                  handleOpen();
                  setHeading("Bramhastra")
                  setText("")
                  }}><BsFillInfoCircleFill /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container  w-full lg:w-3/12 p-6">
          <div className="bg-[#1b263b] text-[#e1f2fe] p-3  rounded-2xl">
            <div className="card flex justify-center">
              <img
                className="card-img rounded-3xl py-3"
                src="assets/achrya.jpg"
              />
            </div>
            <div className="flex items-center  justify-between px-5">
              <div className="text-sm 2xl:text-xl ">
                <p>Ratings-NA</p>
                <p className="pr-3 font-semibold card-text">
                 Acharya
                </p>
              </div>
              <div className="2xl:text-2xl" >
              <button onClick={
                  ()=>{
                  handleOpen();
                  setHeading("Acharya")
                  setText("")
                  }}> <BsFillInfoCircleFill /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-[#1b263b] p-6 text-xl text-[#e1f2fe]" sx={style}>
          <h5 className="bg-[#1b263b] py-3 text-4xl font-bold uppercase text-[#e1f2fe]">
            {heading}
          </h5>
          <hr />
          <p className="bg-[#1b263b]  py-3 text-sm text-[#e1f2fe]">
            {text}
            <a
              className="text-[#ff2a2a]"
              href="https://www.imdb.com/title/tt11873440/plotsummary?ref_=tt_ov_pl"
            >
              View more
            </a>
          </p>
        </Box>
      </Modal>
    </section>
  )
}
export default Upcoming
