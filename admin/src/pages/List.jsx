import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";




const List = ({token}) => {




  const [list, setList] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {

    try {
      const resp = await axios.get(backendUrl + "/api/product/list");
      
      if (resp.data.success) {
        setList(resp.data.products); // Assuming product is an array
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop the loading state once fetching is complete
    }
  };

  // ---------------remove Product API -------------------


const removeProduct = async (id) =>{
  try {
    const resp = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}})
    await fetchList();

    if(resp.data.success){
      toast.success(resp.data.message)
    } else {
    toast.error(resp.data.message)
    }

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}



  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 font-semibold">All products list</p>
      
      {/* Show a loading message or spinner while data is being fetched */}

      {loading && <p>Loading...</p>}

      <div className="flex flex-col gap-2">

        {/* ----------------List table Title------------ */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-2 bg-gray-100 border text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ---------------------product list------------------- */}

        {list && list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-2 border">
              <img src={item.image[0]} alt={item.name} className="w-16 h-16 object-cover" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>  removeProduct(item._id)} className="text-center cursor-pointer">X</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
};

export default List;
