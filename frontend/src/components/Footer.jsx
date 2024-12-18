import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-gray-500">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            nostrum veritatis totam non ipsum sequi dignissimos excepturi fugiat
            nulla deleniti quae inventore soluta, distinctio impedit doloremque
            officiis aut dicta culpa?
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Prevacy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-222-653</li>
            <li>contact2@ahmad.com</li>
          </ul>
        </div>
      </div>
      <div>
            <hr/>
            <p className="py-5 text-sm text-center">Copyright 2024@ ahmad.com - all Right Reserved</p>
        </div>
    </div>
  );
};

export default Footer;
