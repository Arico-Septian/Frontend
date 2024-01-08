export default function HomePage() {
  return (
    <main>
      <head>
        <title> Home </title>
      </head>

      <div className="bg-[url('../../public/a.jpg')] bg-cover w-full min-h-screen">
        <div className="w-full h-40">
          <div className="flex justify-between mx-auto px-4 flex-items-center">
            <h1 className="text-2xl uppercase font-bold my-10">
              Aplikasi Laundry
            </h1>
            <div className="flex flex-items-center my-9">
              <a href="/login" className="border-2 bg-yellow-400 text-white border-blue-300
              rounded-full px-12 py-2 mx-2 font-semibold hover:bg-blue-300  hover:text-white">
                Sign In
              </a>
              <a href="/register" className="border-2 bg-yellow-400 text-white border-blue-300
              rounded-full px-12 py-2 mx-2 font-semibold hover:bg-blue-300  hover:text-white">
                Sign Up
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-9 text-center">
          <div className="w-3/6">
            <h1 className="font-bold text-5xl my-8">Melayani Jasa Laundry Pakaian</h1>
            <p className="font-semibold text-lg">Mau Pakaian kalian bersih dari noda kotoran,
              Mari laundry ke tempat kami dijamin noda kotoran hilang dan pakaian
              menjadi halus dan bau pakaian kalian akan menjadi wangi.</p>
          </div>
        </div>
      </div>
    </main>
  )
}