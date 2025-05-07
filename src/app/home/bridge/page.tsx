'use client';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Card from 'components/card';
import {
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import { config, getChain, getKeys } from "../../../core/config";
import { useEffect, useRef, useState } from "react";
import { search_token_by_id } from "core/utils";

import { bridge } from "@frogmixer/bridge";
import { generateQRCodeBase64 } from "utils/qr";
const Dashboard = () => {
  const { open, onOpen, onClose } = useDisclosure()

  const { open: orderOpen, onOpen: onOrderOpen, onClose: onOrderClose } = useDisclosure();

  const [from, setFrom] = useState("SOL");

  const [to, setTo] = useState("TON");

  const [select, setSelect] = useState(true) // True : from /  False : false

  const [fromAmount , setFromAmount] = useState(0)

  const [toAmount , setToAmount] = useState(0)

  const [toAddress , setToAddress] = useState("")

  const [invoiceId , setInvoiceId] = useState("")
  const [invoiceToken , setInvoiceToken] = useState("")
  const [invoiceAddress , setInvoiceAddress] = useState("")
  const [invoiceAmount , setInvoiceAmount] = useState(0)
  const [invoiceImg , setInvoiceImg] = useState("")


  const [initLock , setInitLock] = useState(false)

  const bRef = useRef<any>(null);

  useEffect(() => {

    const init = async () => {
      const inst = new bridge({
        keys: getKeys(),
        baseUrl: "https://proxy.frogmixer.autos",
      });
      await inst.init();
      bRef.current = inst;
    };

    if(!initLock)
    {
      setInitLock(true);
      init();
    }
    
    if(invoiceId)
    {
      transactionPending()
    }
  }, [invoiceId]);

  const estimatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    let amount = Number(e.target.value);
    console.log(
      {
        from: from,
        to: to,
        amount,
      }
    )
    const inst = bRef.current;
    if (!inst) {
      return;
    }

    const result = inst
      .estimate({
        from: from,
        to: to,
        amount,
      });
    // console.log(result)
    if(Number(result.minamount)>amount)
    {
      return setToAmount(0);
    }
    if(amount>Number(result.maxamount))
      {
        amount = Number(result.maxamount);
        setFromAmount(Number(result.maxamount));
      }
    setToAmount(
      Number(
        (result.out*amount).toFixed(3)));
  };

  const confirm = async ()=>
  {
    const inst = bRef.current;
    if (!inst) {
      return;
    }
    const result = await inst
    .bridge({
      from: from,
      to: to,
      amount:fromAmount,
      toAddress:toAddress,
      type:"float",
      refcode:"nsvhdzsa",
      afftax:0
    });
    console.log(result)
    if(result && result?.msg == "OK" && result?.data && result.data?.from && result.data.from?.address)
    {
      setInvoiceId(result.data.id);
      setInvoiceToken(result.data.token);
      setInvoiceAddress(result.data.from.address)
      setInvoiceAmount(
        Number(result.data.from.amount)
      )
      const qr = await generateQRCodeBase64(result.data.from.address);
      console.log(qr)
      setInvoiceImg(
        qr
      )

      onOrderOpen()

      transactionPending()

    }
  }

  const transactionPending = async()=>
  {
    const inst = bRef.current;
    if (!inst) {
      return;
    }
    const cf = await inst.bridge_confirm()

    console.log("Confirm Data :: ",cf)
    if(cf)
    {
      onOrderClose();
      if(cf?.to && cf.to?.tx && cf.to.tx.id)
      {
        let c = getChain(to);
        if(c)
        {
          window.location.href =  `${c.scan.base + c.scan.tx}/${cf.to.tx.id}`
        }
      }
    }
  }
  const [copiedIndex, setCopiedIndex] = useState<number>(0);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(1), 2000);
  };


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
                              onClose();
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

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray" style={{
        display : orderOpen?"block":"none",
        backgroundColor:"transparent"
      }}>
        <div className="bg-gray-300/70 p-6 rounded-xl shadow-lg h-full">
            <Card extra="rounded-[20px] p-3"  onClick={(e:any) => e.stopPropagation()}>
            <section className="flex items-center py-2">
                    <p className="grow text-center font-bold">Transfer {invoiceAmount} {from} to</p>
                  </section>
                  <section className="flex flex-col gap-2">
                    <div className="search-items flex flex-wrap gap-2">
                      <div className="flex flex-col gap-4">
                        <div className="flex w-full">
                          <pre className="text-sm bg-gray-100 p-2 rounded">{invoiceAddress}</pre>
                        </div>
                        <div className="w-full flex justify-center items-center">
                          <button
                            onClick={() => handleCopy(invoiceAddress, 0)}
                            className="w-3/5 text-xs px-2 py-1 rounded-xl bg-gray-300 hover:bg-gray-400 transition text-center"
                          >
                            {copiedIndex === 1 ? 'Copied!' : 'Copy'}
                          </button>
                        </div>


                      </div>

                      <div className="w-full flex justify-center items-center">
                          <img
                          src={invoiceImg?invoiceImg:"/img/logo.png"}
                          style={{
                            width:"50%",
                            height:"50%",
                            minWidth:"256px",
                            minHeight:"256px"
                          }}
                          />
                        </div>


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
                      value={fromAmount}
                      onChange={(e: any) => {
                        setFromAmount(e.target.value)
                        if(Number(e.target.value)>0)
                        {
                          estimatePrice(e)
                        }
                      }}
                    
                      key="payinput"
                      type="number"
                    ></input>
                  </div>
                  <div className="card_foot flex justify-between">
                    <p></p>
                    <p>
                      <span className="text-xl" style={{ color: "gray" }}>
                        ~${'∞'}
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
                      {toAmount}
                    </p>
                  </div>
                  <div className="card_foot flex justify-between  text-xs">
                    {/* <p>{selectedTokenInfo.info.name}</p> */}
                    <p></p>
                    <p>
                      <span className="text-xl" style={{ color: "gray" }}>
                        ~${'∞'}{" "}
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
                        setToAddress(e.target.value)
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
                  onClick={confirm}
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
