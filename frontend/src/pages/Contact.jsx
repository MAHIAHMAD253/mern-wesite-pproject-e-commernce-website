import { assets } from "../assets/frontend_assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="mt-10 flex flex-col justify-center md:flex-row gap-6 mb-28">
        <img className="w-full md:max-w-[470px]" src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-center gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-600">123 willion station<br/>E comm serive</p>
          <p className="text-gray-600">Tell: 12334455 <br/>ahmad@gmail.com</p>
          <p className="text-gray-600 font-semibold text-xl">Careers forever</p>
          <p className="text-gray-600">Learn more than our team in please jpin the company</p>
          <button className="border border-black py-4 px-8 hover:bg-black  text-sm hover:text-white transition-all duration-500">Explore Job</button>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
