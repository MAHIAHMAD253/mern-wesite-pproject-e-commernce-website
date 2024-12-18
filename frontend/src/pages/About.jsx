
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsleetterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center gap-6 pt-8   border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>


      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[470px]' src={assets.about_img} alt="" />

       < div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600  '>
          <p>“We see our customers as invited guests to a party, and we are the hosts. It’s our job every day to make every important aspect of the customer experience a little bit better.” – Jeff Bezos, Founder of Amazon</p>
          <p>I really like the way he thinks about the customer experience. We need to make our customers feel welcome and comfortable on our website.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>We never want anything to go wrong with our products or customer experience, but it’s a fact of life. Make sure you’re prepared to make things right when you need to.</p>
       </div>
     </div>


     <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'} />
     </div>
     
     <div className='flex flex-col mb-20 text-sm md:flex-row'>

      <div className='border px-10 md:px-16 py-8 sm:py-20n  flex flex-col gap-5'>
        <b>Quality Assurance</b>
        <p className='text-gray-600'>Nurturing customer relationships should always be a priority, especially with your subscribers. Make sure you have customer nurturing strategies in place.</p>
      </div>

      <div className='border px-10 md:px-16 py-8 sm:py-20n  flex flex-col gap-5'>
        <b>Convenience</b>
        <p className='text-gray-600'>Nurturing customer relationships should always be a priority, especially with your subscribers. Make sure you have customer nurturing strategies in place.</p>
      </div>

      <div className='border px-10 md:px-16 py-8 sm:py-20n  flex flex-col gap-5'>
        <b>Execeptional Custom Service</b>
        <p className='text-gray-600'>Nurturing customer relationships should always be a priority, especially with your subscribers. Make sure you have customer nurturing strategies in place.</p>
      </div>
     </div>

     {/* -----------------------NewLetter Page------------------------ */}

     <NewsleetterBox/>
    
    </div>
  )
}

export default About
