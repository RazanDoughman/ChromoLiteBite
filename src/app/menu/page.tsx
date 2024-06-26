import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

const getData = async ()=>{
  const timestamp = new Date().getTime(); // Generate a unique timestamp
  const res = await fetch(process.env.API_BASE_URL+"/api/categories"+`?timestamp=${timestamp}`,{
    next: { revalidate: 0 },
    cache:"no-store"
  })

  if(!res.ok){
    throw new Error("Failed!");
    
  }

  return res.json()
}

const MenuPage = async () => {

  const menu:MenuType = await getData()
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.map((category) => {
        return (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="h-[200px] w-[90%] md:h-[400px] md:w-[290px] bg-contain p-8"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-1/2`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8">{category.desc}</p>
            <button className={`hidden 2xl:block bg-${category.color} text-${category.color === "black" ? "white" : "red-500"} py-2 px-4 rounded-md`}>Explore</button>
          </div>
        </Link>
      )})}
    </div>
  );
};

export default MenuPage;
