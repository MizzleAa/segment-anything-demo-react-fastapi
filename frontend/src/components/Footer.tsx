import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
const Footer = () => {
    return (
        <div className="border-t bg-gray-50">
            <div className="flex flex-row-reverse items-baseline justify-between mx-8 my-2 xl:my-4">
                <div>
                    <Link  className="flex mx-4 text-gray-300 justify-center items-center space-x-4" to={"https://github.com/MizzleAa/segment-anything-demo"} target="_blank">
                        <p>Sampling by @ MizzleAa</p> <AiFillGithub className="text-gray-700 h-5 w-5"/>
                    </Link >
                </div>
            </div>
        </div>

    );
};

export default Footer;
