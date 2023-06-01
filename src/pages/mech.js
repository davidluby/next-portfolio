import Head from 'next/head'
import Link from 'next/link'

export default function fluids() {

    return (
        <div className="flex flex-col items-center mb-20">
            <Head>
                <title>Mechatronics</title>
            </Head>
            <div className="flex flex-wrap justify-evenly w-[97%] res:w-5/6 -mt-5">
                <iframe className="tile w-[300px] h-[500px] mt-5" src="https://www.youtube.com/embed/8P3UF1Z6qRs" title="v1" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <iframe className="tile w-[300px] h-[500px] mt-5" src="https://www.youtube.com/embed/--vCE5AsHIY" title="v2" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <iframe className="tile w-[300px] h-[500px] mt-5" src="https://www.youtube.com/embed/XdCFYtW8jBc" title="v3" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <div className="tile flex flex-col items-center res:flex-row justify-center w-[97%] res:w-5/6 mt-20 space-x-0 res:space-x-10">
                <div className="flex flex-col">
                    <h1>
                        <b>Project Overview - </b><Link href="https://github.com/davidluby/Color-Sorting-Conveyor" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">GitHub</Link>
                    </h1>
                    <p>
                        I am a co-author of this project, and my partner is owed as much credit as I am for the way this project came together.
                    </p>
                    <p className="mt-5">
                        This project is characterized by a conveyor belt that automatically sorts colored blocks. When unsorted colored blocks are input, the system will output sorted colored blocks. The videos above provide a clear illustration of the system&apos;s function. The remainder of this page is populated with fragments related to the engineering that went into this project.
                    </p>
                    
                </div>
                <img src="mech/full-picture.jpg" className="w-full res:w-1/3"></img>
            </div>
            <div className="tile flex flex-col items-center res:flex-row justify-center w-[97%] res:w-5/6 my-20 space-x-0 res:space-x-10">
                <div className="flex flex-col">
                    <h1>
                        <b>Arduino Overview</b>
                    </h1>
                    <p>
                        A high-level description of an Arduino board can be reduced to a microcontroller (MCU) and a printed circuit board (PCB), emphasizing the MCU as the essential tool and the PCB as its interfacing environment. The&nbsp;
                        <Link href="https://www.microchip.com/en-us/product/ATmega328P" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">ATmel ATmega 328P</Link>&nbsp;(328P) MCU plus an Arduino PCB submit the Arduino Uno to this description. Interaction with the 328P is facilitated by the PCB it sits on, however, plenty of users elect to interface with these chips using a&nbsp;
                        <Link href="https://www.youtube.com/watch?v=nRrva24zqXY&ab_channel=BeingEngineers" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">Custom PCB</Link>&nbsp;or even just a&nbsp;
                        <Link href="https://www.youtube.com/watch?v=YXtj6nh_8dA&ab_channel=0033mer" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">breadboard</Link>.
                    </p>
                    <p className="my-5">
                        MCU instructions are typically programmed in C or C++ using an Integrated Development Environment (IDE), like&nbsp;
                        <Link href="https://www.microchip.com/en-us/tools-resources/develop/microchip-studio" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">Atmel&apos;s Microchip Studio</Link>. Other languages and IDE&apos;s like Assembly or Python and Visual Studio or Arduino IDE can be used. The applications presented here are written mostly in C using Microchip Studio.
                    </p>
                    <p>
                        These instruction files (scripts) are compiled, or translated, into files an MCU can understand, called hex (hexadecimal) files, and uploaded to the MCU from a computer. Instructions given to an MCU often map a system of inputs to program logic which maps a system of outputs back through the PCB for some function, like controlling an LED.
                    </p>
                </div>
                <img src="mech/arduino.jpg" className="w-full res:w-1/3"></img>
            </div>
            <div className="tile flex flex-col w-[97%] res:w-5/6">
                    <h1>
                        <b>Essentials</b>
                    </h1>
                    <p>
                        There are a number of fundamental concepts and components essential for interaction with Arduino boards. The following is a very brief description of those most universal to the successful marriage of software and hardware.
                    </p>
                    <ul className="list-disc my-5 ml-10 space-y-2">
                        <li>
                            Binary (logic) signals: a digital signal that can either be high or low, corresponding to a 1 or 0 in logic terms and 5 or 0 volts (usually) in physical terms.
                        </li>
                        <li>
                            Pins and ports: a pin is an electrical lead on the MCU that is connected to the PCB, also called a bit. They are organized in bunches, called ports, and can send or receive signals to or from a given system, respectively.
                        </li>
                        <li>
                            Registers: a register occupies a space in memory that data can be read from or written to. Data read from registers often represent system inputs, while data written to them represent outputs. A port is a type of register.
                        </li>
                        <li>
                            Special function registers (SFR): SFR&apos;s are similar to a traditional register, except they have special bits called control and flag bits. Writing to a control bit toggles native MCU functions, while reading from a flag bit typically indicates some status regarding a triggering condition in the MCU. These register functions ship with the chip as opposed to plain registers which inherit functionality from instruction logic.
                        </li>
                    </ul>
                    <p>
                        A real synthesis of these basic elements can be illustrated by an Arduino and a mechanical push button used to light up an LED. Pressing the button completes a circuit that sends a 5 volt (high) signal to a pin connected to one end. The unpressed case sends the same 5 volt signal to ground and a low signal to the pin. Software instructs the MCU to read the signal from the memory address register (MAR) corresponding to the input pin and submit the binary signal to program logic. The logic maps the input to an output, responding through a different pin using its unique MAR. The output pin sends a 5 or 0 volt signal to the LED circuit, either turning it on or off depending on the MCU&apos;s instructions.
                    </p>
                </div>
            <div className="tile flex flex-col items-center res:flex-row justify-center w-[97%] res:w-5/6 mt-20 space-x-0 res:space-x-10">
                <div className="flex flex-col">
                    <h1>
                        <b>Configuration</b>
                    </h1>
                    <p className="mb-5">
                        The&nbsp;
                        <Link href="https://store.arduino.cc/products/arduino-mega-2560-rev3" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">Arduino Mega 2560</Link>&nbsp;is comprised of an&nbsp;
                        <Link href="https://www.microchip.com/en-us/product/ATMEGA2560" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">Atmel ATmega 2560</Link>&nbsp;(2560) microprocessor and Arduino board. The&nbsp;
                        <Link href="https://ww1.microchip.com/downloads/aemDocuments/documents/OTH/ProductDocuments/DataSheets/ATmega640-1280-1281-2560-2561-Datasheet-DS40002211A.pdf" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">microprocessor&apos;s datasheet</Link>&nbsp;and&nbsp;
                        <Link href="https://www.electronicshub.org/wp-content/uploads/2021/01/Arduino-Mega-Pinout.jpg" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">Arduino board pinout</Link>&nbsp;are used for the marriage of software and hardware. Remaining site content is confined to applications using this microcontroller and board but can be replicated in others following the same principles.
                    </p>
                    <img src="mech/diagram.png"></img>
                </div>
                <img src="mech/block.jpg" className="mt-5 res:mt-0 w-full res:w-1/2"></img>
            </div>
        </div>
      )
  }