'use client';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Card from 'components/card';
import {
  useDisclosure,
} from '@chakra-ui/react'
import { config } from "../../../core/config";
import { useEffect, useState } from "react";
import { search_token_by_id } from "core/utils";
const Dashboard = () => {
  const { open, onOpen, onClose } = useDisclosure()

  const [from, setFrom] = useState("SOL");

  const [to, setTo] = useState("TON");

  const [select, setSelect] = useState(true) // True : from /  False : false

  useEffect(() => {

  }, []);

  return (
    <div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 justify-items-center">

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray" style={{
        display : open?"block":"none",
        backgroundColor:"transparent"
      }}>
        <div className="bg-gray-300/70 p-6 rounded-xl shadow-lg h-full" onClick={onClose}>
            <Card extra="rounded-[20px] p-3"  onClick={(e:any) => e.stopPropagation()}>
            <section className="flex items-center py-2">
                    <p className="grow text-center font-bold">Select Asserts</p>
                  </section>
                  <section className="flex flex-col gap-2">
                    <div className="search-items flex flex-wrap gap-2">
                      {config.chains.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center border border-gray-300 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-100 transition"
                          onClick={
                            ()=>
                            {
                              if(select)
                              {
                                //From
                                setFrom(item.id)
                              }else{
                                //To
                                setTo(item.id)
                              }
                            }
                          }
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                      ))}
                    </div>

                  </section>
                  
            </Card>
          </div>
      </div>


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
                    <p>From</p>
                  </div> 
                  <div className="card_body flex justify-between items-center text-white">

                      {
                        search_token_by_id(from) ? 
                        <button
                        className="flex items-center gap-2 rounded-xl p-2 cursor-pointer bg-[#e6ddc0] hover:bg-black"
                        style={{ minWidth: "15%" }}
                        onClick={
                          ()=>
                          {
                            setSelect(true);
                            onOpen()
                          }
                        }
                      >
  
                        <img src={(search_token_by_id(from) as any).img} style={{
                          width:"30px"
                        }}></img>
                        <span className="text-medium ">{(search_token_by_id(from) as any).name}</span>
                        <RiArrowDropDownLine size={24} />
                      </button>
                      :
                      null
                      }


                    <input
                      className=" text-3xl "
                      style={{
                        width: "70%",
                        textAlign: "right",
                        backgroundColor: "transparent",
                        color: "black",
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
                      <FaArrowDown color="[#e6ddc0]" />
                    </div>
                  </div>  
                  <div className="card_head flex justify-between">
                    <p>To</p>
                  </div>
                  <div className="card_body flex justify-between items-center text-white">
                    {
                      search_token_by_id(to)?
                      <button
                        className="flex items-center gap-2 rounded-xl p-2 cursor-pointer bg-[#e6ddc0] hover:bg-black"
                        style={{ minWidth: "15%" }}
                        onClick={
                          ()=>
                          {
                            setSelect(false);
                            onOpen()
                          }
                        }
                      >
                        <img src={(search_token_by_id(to) as any).img} style={{
                          width:"30px"
                        }}></img>
                        <span className="text-medium ">
                          {(search_token_by_id(to) as any).name}
                        </span>
                        <RiArrowDropDownLine size={24} />
                      </button>
                      :
                      null
                    }
                    <p className="text-3xl" style={{color:"black"}}>
                      {/* {Number((leverageOutAmount / 1e6).toFixed(3))} */}
                      {389201}
                    </p>
                  </div>
                  <div className="card_foot flex justify-between  text-xs">
                    {/* <p>{selectedTokenInfo.info.name}</p> */}
                    <p></p>
                    <p>
                      <span className="text-xl" style={{ color: "gray" }}>
                        ~${231}{" "}
                      </span>
                    </p>
                  </div>

                  <div className="text-center text-gray-500 text-xs">
                    Bridge Fee : 0.5%
                  </div>
                  <div className="bottom-14 right-0 w-full p-4">


                  <div className="card_head flex justify-between">
                    <p>Reciver Address</p>
                  </div>
                  <div className="card_body flex justify-between items-center text-white">


                    <input
                      className=" text-xl "
                      style={{
                        width: (to=="TON")?"70%":"100%",
                        textAlign: "left",
                        backgroundColor: "transparent",
                        color: "black",
                       
                      }}
                      placeholder="Input a valid address"
                      onChange={(e: any) => {
                      
                      }}
                    
                      key="addressinput"
                      type="text"
                    ></input>

                      <div
                          className="flex items-center gap-2 rounded-xl p-2 cursor-pointer bg-[#e6ddc0] hover:bg-black"
                          style={{ minWidth: "15%" ,display: (to=="TON")?"flex":"none"}}
                        >
                          <span className="text-medium ">connect</span>
                  
                      </div>
                  </div>

                  <br></br>
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
