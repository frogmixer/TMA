'use client';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Card from 'components/card';
const Dashboard = () => {
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 justify-items-center">
        <Card extra="rounded-[20px] p-3">
        <div className="flex gap-2.5 justify-center">
                  <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
                    <span className="text-default-900 text-xl font-semibold">
                      Bridge
                    </span>
                  </div>
                </div>

                <div  style={{ justifyItems:"center", width: "100%" }}>

                <div className="flex flex-col gap-6" style={{ width: "100%" }}>
        <div className="flex flex-col justify-center gap-1 relative">
          <div className="card_head flex justify-between">
            <p>Deposite</p>
          </div>

          <div className="card_body flex justify-between items-center text-white">
            <div
              className="flex items-center gap-2 rounded-xl p-2 cursor-pointer bg-[#e6ddc0] hover:bg-black"
              style={{ minWidth: "15%" }}
            >
              <img src='/img/chains/sol.png' style={{
                width:"30px"
              }}></img>
              <span className="text-medium ">SOL</span>
              <RiArrowDropDownLine size={24} />
            </div>

            <input
              className=" text-3xl "
              style={{
                width: "70%",
                textAlign: "right",
                backgroundColor: "transparent",
                color: "white",
              }}
            
              min={"0"}
         
              step="0.1"
              onChange={(e: any) => {
               
              }}
             
              key="payinput"
              type="number"
            ></input>
          </div>
          <div className="card_foot flex justify-between">
            <p></p>
            <p>
              <span className="text-xl" style={{ color: "gray" }}>
                ~${" "}
              </span>
            </p>
          </div>
          <div className="trans-icon rounded-full h-6 w-full flex justify-center">
            <div className="w-6 h-6 flex justify-center bg-white items-center rounded-full shadow-md">
              <FaArrowDown color="blue" />
            </div>
          </div>

          <div className="card_head flex justify-between">
            <p>Leverage</p>
          </div>
          <div className="card_body flex justify-between items-center text-white">
            <button
              className="flex items-center gap-2 rounded-xl p-2 cursor-pointer bg-[#e6ddc0] hover:bg-black"
              style={{ minWidth: "15%" }}
              
            >
              <img src='/img/chains/ton.png' style={{
                width:"30px"
              }}></img>
              <span className="text-medium ">
                TON
              </span>
              <RiArrowDropDownLine size={24} />
            </button>

            <p className=" text-3xl">
              {/* {Number((leverageOutAmount / 1e6).toFixed(3))} */}
            </p>
          </div>
          <div className="card_foot flex justify-between  text-xs">
            {/* <p>{selectedTokenInfo.info.name}</p> */}
            <p></p>
            <p>
              <span className="text-xl" style={{ color: "gray" }}>
                ~${" "}
              </span>
            </p>
          </div>

          <div className="text-center text-gray-500 text-xs">
            Borrow Hourly Percentage Rate : 0.0416 %
          </div>
          <div className="bottom-14 right-0 w-full p-4">
            {/* <button
              className="w-full colorfulbuttons"
              style={{backgroundColor:"gray"}}
            >
             
              Bridge Now
            </button> */}
        <button
          className="w-full min-h-[50px] rounded-xl bg-[#e6ddc0] text-white text-lg font-semibold hover:bg-[#614c38] transition duration-200 shadow-md"
        >
          Bridge Now
        </button>
          </div>
        </div>
      </div>

                </div>
      </Card>
      </div>
    </div>
  );
};

export default Dashboard;
