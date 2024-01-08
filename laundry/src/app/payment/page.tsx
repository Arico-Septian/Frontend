import { FaPlus } from "react-icons/fa"

export default function PaymentPage() {
  return (
    <main>
      <head>
        <title> Payment </title>
      </head>

      <div className='bg-gradient-to-r from-blue-300 from-10% via-yellow-400 via-40% to-blue-300 to-100% bg-cover w-full min-h-screen'>
        <nav className=" flex justify-center h-[100px]">
          <div className="w-[1240px] flex items-center justify-between">
            <div className="flex items-center w-[577px] justify-between">
              <div className="flex w-[340px] justify-between">
                <a href='#' className='font-semibold'>Home</a>
              </div>
            </div>
            <div className="w-[320px] flex justify-between">
              <button className="bg-purple-200 px-[28px] py-[10px] rounded-[47px] inline-flex">
                <FaPlus className="text-purple-700 pt-1" />
                <span className="text-purple-700 pl-1">Add Order</span>
              </button>
              <button className="bg-purple-600 px-[36px] py-[10px] rounded-[47px]">
                <p className="text-white">Logout</p>
              </button>
            </div>
          </div>
        </nav>
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

          <form>
            <label htmlFor="cardName" className="block mb-2">Card Name:</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              className="w-full p-2 border rounded"
            />

            <label htmlFor="cardNumber" className="block mb-2">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="w-full p-2 border rounded"
            />

            <div className="flex mb-2">
              <div className="w-1/2 mr-2">
                <label htmlFor="expiryDate" className="block mb-2">Expiry Date:</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  className="w-full p-2 border rounded"

                />
              </div>

              <div className="w-1/2 ml-2">
                <label htmlFor="cvv" className="block mb-2">CVV:</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="w-full p-2 border rounded"

                />
              </div>
            </div>

            <button
              type="button"

              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit Payment
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}