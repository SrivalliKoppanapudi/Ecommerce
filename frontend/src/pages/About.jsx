import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewLetterBox from "../components/NewLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2x1 text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md: w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            dolorum possimus soluta corporis cum pariatur sunt reiciendis quos
            ad! Amet. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dolore et reprehenderit impedit dolor quia rem temporibus? Quod iste
            sint distinctio?{" "}
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
            dignissimos quasi accusamus minima maiores ad. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Dolor sapiente magni sit
            suscipit saepe excepturi quasi iste recusandae nesciunt
            reprehenderit.{" "}
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            hic fugit, sed soluta eligendi debitis officia itaque ratione cum
            neque voluptate libero, nobis nemo ab?
          </p>
        </div>

      </div>

      <div className="text-x1 py-4">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <div className="flex flex-col md:flex-row text-sm mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance:</b>
            <p className="text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, qui!
              Quisquam magnam ullam necessitatibus modi.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convinience:</b>
            <p className="text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, qui!
              Quisquam magnam ullam necessitatibus modi.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service:</b>
            <p className="text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, qui!
              Quisquam magnam ullam necessitatibus modi.
            </p>
          </div>
        </div>
        <NewLetterBox/>
    </div>
  );
};

export default About;
