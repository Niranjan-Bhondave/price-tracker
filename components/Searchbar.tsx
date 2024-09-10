"use client"

import { scrapeAndStoreProduct } from "@/lib/actions/Index";
import { log } from "console";
import { FormEvent, useState } from "react"
const isValidAmazonLink = (link : string) => {
  try {
    const parsedUrl = new URL(link);
    const hostname = parsedUrl.hostname;

    if(hostname.includes("amazon.com") || hostname.includes("amazon.in")){
      return true;
    }
  }

  catch (error){
    return false;
  }
  
  
}
const Searchbar = () => {
  const [searchPrompt,setSearchPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e : FormEvent<HTMLFormElement>) =>{
      e.preventDefault();

      const isValidLink =  isValidAmazonLink(searchPrompt);
      if(!isValidLink){
        alert("Please Enter a Valid Amazon Link");
        return;
      }
      try {
        setIsLoading(true);
        const product = await scrapeAndStoreProduct(searchPrompt);
      }
      catch(error){
        console.log(error);
      }

      finally{
        setIsLoading(false);
      }
    }
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Product Link" value={searchPrompt} onChange={(e)=>setSearchPrompt(e.target.value)} className="searchbar-input"/>
        <button type="submit" className="searchbar-btn" disabled= {searchPrompt === ''}>
          {isLoading ? "Loading..." : "Search"}
        </button>
    </form>
  )
}

export default Searchbar
