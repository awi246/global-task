import { useState } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import OGTags from "../../components/OGTags"
import { fetchProductById } from "../../utils/api"
import Image from "next/image"
import Link from "next/link"
import { FaShoppingCart, FaHeart, FaArrowLeft } from "react-icons/fa"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { ToastContainer, toast, ToastOptions, ToastContent } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ReactElement } from "react"

interface Product {
  id: number
  name: string
  price: string
  image: string
  category: string
  description: string
  rating: number
}

const ProductDetail = ({ product }: { product: Product | null }) => {
  const [inCart, setInCart] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)

  const showToast = (
    message: string,
    icon: ReactElement,
    options?: ToastOptions
  ) => {
    const content: ToastContent = (
      <div className="flex items-center">
        {icon}
        <span className="ml-2">{message}</span>
      </div>
    )

    toast(content, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      ...options,
    })
  }

  const handleAddToCart = () => {
    if (inCart) {
      setInCart(false)
      showToast("Removed from cart!", <FaShoppingCart className="text-blue-600" />)
    } else {
      setInCart(true)
      showToast("Product added to cart!", <FaShoppingCart className="text-blue-600" />)
    }
  }

  const handleAddToWishlist = () => {
    if (inWishlist) {
      setInWishlist(false)
      showToast("Removed from wishlist!", <FaHeart className="text-red-600" />)
    } else {
      setInWishlist(true)
      showToast("Product added to wishlist!", <FaHeart className="text-red-600" />)
    }
  }

  if (!product) {
    return (
      <>
        <OGTags
          title="Product Not Found"
          description="The requested product does not exist."
          image="/assets/Global Square.jpeg"
        />
        <Navbar />
        <div className="flex flex-col justify-center items-center bg-gray-50 px-4">
          <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md w-full">
            <FaArrowLeft className="mx-auto text-5xl text-blue-600" />
            <h1 className="text-3xl font-extrabold text-gray-800 mt-4">
              Oops!
            </h1>
            <p className="text-gray-600 mt-4">
              The product you are looking for does not exist or has been removed.
            </p>
            <Link href="/">
              <a className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                <FaArrowLeft className="w-5 h-5 mr-2" />
                Go to Homepage
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <OGTags
        title={product.name}
        description={product.description}
        image={product.image}
      />
      <Navbar />
      <div className="bg-gray-100 px-4 py-12 flex justify-center">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <div className="relative w-full h-0 pb-[100%]">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6 flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-800">
                {product.name}
              </h1>
              <p className="mt-2 text-2xl text-green-600 font-semibold">
                ${product.price}
              </p>
              <div className="flex items-center mt-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) =>
                    i < Math.round(product.rating) ? (
                      <AiFillStar key={i} className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="h-5 w-5 text-gray-300"
                      />
                    )
                  )}
                <span className="ml-2 text-gray-600">({product.rating}/5)</span>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Category
                </h2>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <div className="mt-6 flex space-x-4">
                <button
                  aria-label={inCart ? "Remove from Cart" : "Add to Cart"}
                  onClick={handleAddToCart}
                  className={`flex items-center px-6 py-3 rounded-md transition duration-300 ${
                    inCart
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <FaShoppingCart className="w-5 h-5 mr-2" />
                  {inCart ? "Remove" : "Add to Cart"}
                </button>
                <button
                  aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  onClick={handleAddToWishlist}
                  className={`flex items-center px-6 py-3 rounded-md transition duration-300 ${
                    inWishlist
                      ? "bg-red-200 hover:bg-red-300 text-red-700"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  <FaHeart className="w-5 h-5 mr-2" />
                  {inWishlist ? "Remove" : "Add to Wishlist"}
                </button>
              </div>
              <p className="mt-6 text-gray-700 flex-grow">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer hideProgressBar />
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  const { id } = context.query
  try {
    const product = await fetchProductById(Number(id))
    return { props: { product: product || null } }
  } catch (error) {
    console.error(error)
    return { props: { product: null } }
  }
}

export default ProductDetail
